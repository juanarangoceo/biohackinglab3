import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'youtubeVideo',
  title: 'Video de YouTube',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
      description: 'Nombre interno para identificar el video (ej: "Video sobre Ayuno para el Post X")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL de YouTube',
      type: 'url',
      description: 'Copia y pega la URL del video de YouTube (ej: https://www.youtube.com/watch?v=...)',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'description',
      title: 'Breve Descripción',
      type: 'text',
      rows: 3,
      description: 'Un breve resumen de lo que trata el video que se mostrará justo debajo.',
    }),
    defineField({
      name: 'post',
      title: 'Post Asociado',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Selecciona en qué artículo del blog debe mostrarse este video.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'post.title',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `En: ${subtitle}` : 'Sin post asignado',
      }
    },
  },
})
