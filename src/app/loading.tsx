export default function Loading() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="h-16 bg-white/10 rounded-2xl w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-white/10 rounded-xl w-64 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-white/10 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
