import { Card, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse" />

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
