import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  category?: string
  baseRoute?: string
}

export function BlogPagination({ currentPage, totalPages, category, baseRoute = '/blog' }: BlogPaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (category && category !== 'all' && baseRoute === '/blog') {
      params.set('category', category)
    }
    return `${baseRoute}?${params.toString()}`
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" className="gap-1" disabled>
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)

          if (!showPage) {
            // Show ellipsis
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2 text-muted-foreground">
                  ...
                </span>
              )
            }
            return null
          }

          return (
            <Link key={page} href={buildUrl(page)}>
              <Button
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                className="min-w-[40px]"
              >
                {page}
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" className="gap-1" disabled>
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
