'use server'

import { generateContent } from '@/lib/ai/gemini'
import { SINGLE_SHOT_TAG_PROMPT } from '@/lib/ai/prompts-v2'

// Helper to generate a random key
function generateKey() {
  return Math.random().toString(36).substring(2, 9)
}

function markdownToPortableText(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentBlock: any = null
  let listType: 'bullet' | 'number' | null = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || ''
    const trimmedLine = line.trim() 
    
    if (trimmedLine === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      listType = null
      continue
    }
    
    if (line.startsWith('# ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('# ', '').trim() }],
      })
      continue
    }

    if (line.startsWith('## ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('## ', '').trim() }],
      })
      continue
    }
    
    if (line.startsWith('### ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('### ', '').trim() }],
      })
      continue
    }

    if (line.startsWith('> ')) {
      if (currentBlock && currentBlock.style !== 'blockquote') { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      
      const text = line.replace('> ', '').trim()
      
      if (currentBlock && currentBlock.style === 'blockquote') {
         currentBlock.children[0].text += ' ' + text
      } else {
        currentBlock = {
          _key: generateKey(),
          _type: 'block',
          style: 'blockquote',
          children: [{ _key: generateKey(), _type: 'span', text: text }],
        }
      }
      continue
    }

    if (line.match(/^(\*|-)\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      
      const text = line.replace(/^(\*|-)\s/, '').trim()
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        listItem: 'bullet',
        level: 1,
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: text }],
      })
      continue
    }

    if (line.match(/^\d+\.\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      
      const text = line.replace(/^\d+\.\s/, '').trim()
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        listItem: 'number',
        level: 1,
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: text }],
      })
      continue
    }
    
    if (line.trim().startsWith('|')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null

      const rows: any[] = []
      let tableIndex = i;
      while (tableIndex < lines.length) {
        const lineStr = lines[tableIndex];
        if (!lineStr || !lineStr.trim().startsWith('|')) break;
        
        const tableLine = lineStr.trim();
        if (!tableLine.match(/^\|\s*:?-+:?\s*\|/)) {
          const cells = tableLine
            .split('|')
            .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map(cell => cell.trim());
          
          rows.push({
            _key: generateKey(),
            _type: 'tableRow',
            cells: cells
          });
        }
        tableIndex++;
      }
      
      if (rows.length > 0) {
        blocks.push({
          _key: generateKey(),
          _type: 'table',
          rows: rows
        })
      }
      
      i = tableIndex - 1;
      continue;
    }
    
    const parts = line.split(/(\*\*.*?\*\*)/g)
    const children: any[] = []
    
    parts.forEach(part => {
       if (part.startsWith('**') && part.endsWith('**')) {
          children.push({ 
             _key: generateKey(), 
             _type: 'span', 
             marks: ['strong'], 
             text: part.slice(2, -2) 
          })
       } else {
          const subParts = part.split(/(\*.*?\*)/g)
          subParts.forEach(subPart => {
             if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
                 children.push({ 
                   _key: generateKey(), 
                   _type: 'span', 
                   marks: ['em'], 
                   text: subPart.slice(1, -1) 
                 })
             } else {
                 if (subPart) {
                    children.push({ 
                       _key: generateKey(), 
                       _type: 'span', 
                       text: subPart 
                    })
                 }
             }
          })
       }
    })

    if (children.length === 0) continue

    if (!currentBlock) {
      currentBlock = {
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: children,
      }
    } else {
      if (currentBlock && currentBlock.children) {
         currentBlock.children.push({ _key: generateKey(), _type: 'span', text: ' ' })
         children.forEach(child => currentBlock.children.push(child))
      }
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  
  return blocks
}

export async function generateTagFromTopic(
  topic: string,
  additionalPrompt?: string
): Promise<{ success: boolean; error?: string; generatedContent?: any }> {
  try {
    const result = await generateContent(
      'Eres un sistema experto de generación de contenido JSON.',
      SINGLE_SHOT_TAG_PROMPT(topic, additionalPrompt)
    )

    if (!result.content) {
      throw new Error('Failed to generate tag content')
    }

    // Parse JSON response
    let generatedData;
    try {
        generatedData = JSON.parse(result.content);
    } catch (e) {
        const cleanJson = result.content.replace(/```json\n|\n```/g, '');
        generatedData = JSON.parse(cleanJson);
    }

    const { content } = generatedData;

    if (!content) {
        throw new Error('Incomplete JSON response for Tag');
    }

    const portableTextContent = markdownToPortableText(content)

    return {
      success: true,
      generatedContent: {
        content: portableTextContent,
        aiGenerated: true,
      }
    }
  } catch (error) {
    console.error('Generate tag error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
