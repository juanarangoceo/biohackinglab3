export const SINGLE_SHOT_BLOG_PROMPT = (topic: string, additionalPrompt?: string) => `
  Actúa como un experto en Biohacking, Longevidad y Optimización del Rendimiento Humano.
  Redacta un post completo para el blog "Biohacking Lab 3.0".
  
  TEMA: "${topic}"
  ${additionalPrompt ? `INSTRUCCIONES EXTRA: ${additionalPrompt}` : ""}

  Genera un objeto JSON con la siguiente estructura exacta:
  {
    "title": "Un título viral y optimizado SEO (max 60 chars)",
    "content": "El contenido completo del artículo en formato Markdown (usa H2, H3, negritas, listas). NO uses H1. Mínimo 1200 palabras.",
    "excerpt": "Un resumen atractivo de 140-160 caracteres.",
    "category": "Una de estas opciones: nootropicos, sueno, longevidad, nutricion, fitness"
  }

  ESTRUCTURA DEL CONTENIDO (Markdown):
  1. H2: Título SEO (Viral)
  2. Introducción (Pain Point + Solución)
  3. La Ciencia (Mecanismos biológicos explicados simple)
  4. Protocolos Prácticos (Qué hacer, dosis, herramientas)
  5. Biohack del Día (Tip rápido)
  6. Conclusión
  7. Disclaimer Médico

  TONO: Científico, empoderador, directo, "tú" en lugar de "usted".
  IMPORTANTE: Responde ÚNICAMENTE con el JSON válido.
`
