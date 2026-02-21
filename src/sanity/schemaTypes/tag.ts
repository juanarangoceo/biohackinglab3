import { defineType, defineField } from 'sanity'
import { TagIcon } from 'lucide-react'
import { GenerateTagInput } from '../components/GenerateTagInput'

export default defineType({
  name: 'tag',
  title: 'Tag (Etiqueta SEO)',
  type: 'document',
  // @ts-ignore
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'El nombre de la etiqueta (ej. "Terapia de Frío").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'AI Generator Input',
      type: 'text',
      description: 'Escribe instrucciones o simplemente haz clic en "Generar Hub" para que la IA cree un ensayo/hub sobre esta etiqueta basándose en el título.',
      rows: 3,
      components: {
        input: GenerateTagInput,
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenido SGO Dedicado',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Este es el ensayo o contenido tipo "Wikipedia" que se mostrará en la página de la etiqueta.',
    }),
    defineField({
      name: 'aiGenerated',
      title: 'AI Generated',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
