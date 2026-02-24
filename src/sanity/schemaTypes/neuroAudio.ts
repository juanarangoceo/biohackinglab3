import { defineField, defineType } from "sanity"
import { Headphones } from "lucide-react"
import { GenerateNeuroAudioInput } from "../components/GenerateNeuroAudioInput"

export default defineType({
  name: "neuroAudio",
  title: "NeuroAudio",
  type: "document",
  icon: Headphones as any,
  fields: [
    defineField({
      name: 'generator',
      title: 'Generador Automático con IA',
      type: 'string',
      description: 'Usa esta herramienta para generar todo el contenido a partir de la URL de YouTube.',
      components: {
        input: GenerateNeuroAudioInput,
      },
    }),
    defineField({
      name: "title",
      title: "Título del Audio",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Ejemplo: Ondas Gamma 40Hz para Enfoque Profundo",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Activación y enfoque profundo", value: "activacion-enfoque" },
          { title: "Reducción de Estrés y Creatividad (Down-regulation)", value: "reduccion-estres" },
          { title: "Sueño Profundo y Recuperación (Sleep Hacking)", value: "sueno-recuperacion" },
          { title: "Bienestar y Recuperación Holística (Solfeggio)", value: "bienestar-holistico" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "URL de YouTube",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
      description: "El enlace al video de YouTube (ej. https://www.youtube.com/watch?v=...)",
    }),
    defineField({
      name: "excerpt",
      title: "Extracto Breve",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
      description: "Una descripción corta para las tarjetas y SEO.",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de Portada (Opcional)",
      type: "image",
      description: "Si no se provee, se intentará usar la miniatura de YouTube.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Contenido (Explicación Científica / Biohacking)",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
      description: "Texto generado por IA explicando los beneficios y la ciencia detrás de este audio.",
    }),
    defineField({
      name: "tags",
      title: "Etiquetas Rápidas (Opcional)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      description: "Ejemplo: 40Hz, Gamma, TDAH"
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, category, media } = selection
      const categoryTitles: Record<string, string> = {
        "activacion-enfoque": "Activación y enfoque",
        "reduccion-estres": "Reducción de Estrés",
        "sueno-recuperacion": "Sueño Profundo",
        "bienestar-holistico": "Bienestar Holístico",
      }
      return {
        title,
        subtitle: category ? categoryTitles[category] : "Sin categoría",
        media,
      }
    },
  },
})
