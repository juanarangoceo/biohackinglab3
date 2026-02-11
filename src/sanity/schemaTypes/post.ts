import { defineType, defineField } from 'sanity'
import { GeneratePostInput } from '../components/GeneratePostInput'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'topic',
      title: 'AI Topic Generator',
      type: 'string',
      description: 'Ingresa el tema aquí y usa el botón para generar el blog completo automáticamente.',
      components: {
        input: GeneratePostInput,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.max(100),
      description: 'Se genera automáticamente. Puedes editarlo después.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Se genera automáticamente. Puedes editarlo después.',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      description: 'Autor del artículo (requerido para E-E-A-T)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      description: 'Se genera automáticamente. Puedes editarlo después.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: 'Se genera automáticamente. Puedes editarlo después.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Nootrópicos', value: 'nootropicos' },
          { title: 'Sueño', value: 'sueno' },
          { title: 'Longevidad', value: 'longevidad' },
          { title: 'Nutrición', value: 'nutricion' },
          { title: 'Fitness', value: 'fitness' },
          { title: 'Terapia de Luz', value: 'terapia-de-luz' },
          { title: 'Terapia de Frío', value: 'terapia-de-frio' },
          { title: 'Suplementación', value: 'suplementacion' },
          { title: 'Variabilidad Cardíaca', value: 'hrv' },
          { title: 'Ayuno Intermitente', value: 'ayuno' },
        ],
      },
      description: 'Se genera automáticamente. Puedes editarlo después.',
    }),
    defineField({
      name: 'aiGenerated',
      title: 'AI Generated',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (Preguntas Frecuentes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Pregunta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Respuesta',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
      description: 'Se genera automáticamente por IA. Puedes editar o agregar más preguntas.',
    }),
    defineField({
      name: 'references',
      title: 'Referencias Científicas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título del Estudio',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'authors',
              title: 'Autores',
              type: 'string',
            },
            {
              name: 'journal',
              title: 'Revista/Publicación',
              type: 'string',
            },
            {
              name: 'year',
              title: 'Año',
              type: 'number',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'doi',
              title: 'DOI',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'journal',
            },
          },
        },
      ],
      description: 'Referencias científicas que respaldan el contenido del artículo',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Se establece automáticamente al publicar.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin título (genera con IA)',
        subtitle: subtitle ? subtitle.toUpperCase() : 'No category',
        media,
      }
    },
  },
})
