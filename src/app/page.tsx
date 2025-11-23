import type { Metadata } from "next";
import { Suspense } from "react";
import CountriesList from "./components/countries-list";

export const metadata: Metadata = {
  title: "Countries of the World - Complete List with Flags and Information",
  description:
    "Browse a complete list of all countries in the world with detailed information including flags, capitals, populations, regions, currencies, and languages. Explore 195+ countries with comprehensive data.",
  keywords: [
    "countries list",
    "all countries",
    "world countries",
    "country flags",
    "country information",
    "countries with flags",
    "list of countries",
    "countries of the world",
  ],
  openGraph: {
    title: "Countries of the World - Complete List with Flags and Information",
    description:
      "Browse a complete list of all countries in the world with detailed information including flags, capitals, populations, regions, currencies, and languages.",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Countries Explorer",
    description:
      "Explore comprehensive information about all countries of the world",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") +
          "/countries/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Header */}
          <header className="text-center mb-16">
            <div className="inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4 tracking-tight">
                World Explorer
              </h1>
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-purple-200 font-light max-w-2xl mx-auto">
              Discover every corner of our planet. Explore {195}+ countries with
              stunning visuals and comprehensive data.
            </p>
          </header>

          <Suspense
            fallback={
              <section aria-label="Loading countries">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            }
          >
            <CountriesList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
