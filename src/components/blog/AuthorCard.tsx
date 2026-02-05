"use client"

import Image from "next/image"
import Link from "next/link"
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from "@/lib/sanity/client"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Instagram, Globe, Mail } from "lucide-react"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source: any) {
  return builder.image(source)
}

export interface Author {
  name: string
  slug: { current: string }
  image?: any
  bio?: string
  credentials?: string[]
  specializations?: string[]
  yearsOfExperience?: number
  email?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    instagram?: string
    website?: string
  }
}

interface AuthorCardProps {
  author: Author
  variant?: "compact" | "full"
}

export function AuthorCard({ author, variant = "compact" }: AuthorCardProps) {
  const imageUrl = author.image ? urlFor(author.image).width(200).height(200).url() : null

  if (variant === "compact") {
    return (
      <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-card/30 p-4">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Link 
              href={`/author/${author.slug.current}`}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {author.name}
            </Link>
            {author.credentials && author.credentials.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {author.credentials[0]}
              </Badge>
            )}
          </div>
          {author.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">{author.bio}</p>
          )}
          {author.socialLinks && (
            <div className="mt-2 flex gap-2">
              {author.socialLinks.twitter && (
                <Link 
                  href={author.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              )}
              {author.socialLinks.linkedin && (
                <Link 
                  href={author.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              )}
              {author.socialLinks.instagram && (
                <Link 
                  href={author.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              )}
              {author.socialLinks.website && (
                <Link 
                  href={author.socialLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Full variant for author pages
  return (
    <div className="rounded-lg border border-border/50 bg-card/30 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={author.name}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{author.name}</h2>
          
          {author.credentials && author.credentials.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {author.credentials.map((credential, index) => (
                <Badge key={index} variant="secondary">
                  {credential}
                </Badge>
              ))}
            </div>
          )}

          {author.bio && (
            <p className="text-muted-foreground mb-4">{author.bio}</p>
          )}

          {author.specializations && author.specializations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Especialidades:</h3>
              <div className="flex flex-wrap gap-2">
                {author.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {author.yearsOfExperience && (
            <p className="text-sm text-muted-foreground mb-4">
              {author.yearsOfExperience}+ años de experiencia
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {author.email && (
              <Link 
                href={`mailto:${author.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contacto
              </Link>
            )}
            {author.socialLinks?.twitter && (
              <Link 
                href={author.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            )}
            {author.socialLinks?.linkedin && (
              <Link 
                href={author.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            )}
            {author.socialLinks?.instagram && (
              <Link 
                href={author.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </Link>
            )}
            {author.socialLinks?.website && (
              <Link 
                href={author.socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                Website
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
