import { defineType, defineField } from 'sanity'
import { ShoppingCart } from 'lucide-react'

export default defineType({
  name: 'affiliateAd',
  title: 'Affiliate Ad (Publicidad)',
  type: 'document',
  // @ts-ignore - Lucide icons work fine but types might complain
  icon: ShoppingCart,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre Interno',
      type: 'string',
      description: 'Nombre para reconocerlo en el Studio (ej. "Filtro Casa Post X"). No se mostrará al público.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post de Blog Asignado',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Selecciona en qué post de blog quieres que aparezca este anuncio.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Cuadrada',
      type: 'image',
      options: {
        hotspot: true, // Permite recortar
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Texto alternativo para SEO (ej. "Comprar Filtro de Agua")',
        },
      ],
    }),
    defineField({
      name: 'url',
      title: 'Enlace de Afiliado',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'post.title',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle ? `Aparece en: ${subtitle}` : 'No asignado',
        media: media,
      }
    },
  },
})
