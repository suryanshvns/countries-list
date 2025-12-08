import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BackButton from "../../components/back-button";
import CountryDetail from "../../components/country-detail";
import ScrollToTop from "../../components/scroll-to-top";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

async function getCountryMetadata(name: string) {
  try {
    const fields = ["name", "capital", "region", "flags"].join(",");
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        name
      )}?fullText=true&fields=${fields}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const country = await getCountryMetadata(name);

  if (!country) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }

  const countryName = country.name.common;
  const capital = country.capital?.[0] || "N/A";
  const region = country.region || "Unknown";
  const flagUrl = country.flags?.png || "";

  return {
    title: `${countryName} - Country Information, Flag, Capital, and Facts`,
    description: `Discover comprehensive information about ${countryName}. Learn about its capital city (${capital}), region (${region}), population, currency, languages, timezones, and more. View the ${countryName} flag and explore detailed country facts.`,
    keywords: [
      countryName,
      `${countryName} country`,
      `${countryName} flag`,
      `${countryName} capital`,
      `${countryName} information`,
      `${countryName} facts`,
      `${countryName} population`,
      `${countryName} currency`,
      capital,
      region,
      "country information",
      "country facts",
    ],
    openGraph: {
      title: `${countryName} - Complete Country Information`,
      description: `Explore detailed information about ${countryName} including capital (${capital}), region (${region}), population, currency, languages, and more.`,
      url: `/countries/${encodeURIComponent(countryName)}`,
      type: "article",
      images: flagUrl
        ? [
            {
              url: flagUrl,
              width: 1200,
              height: 630,
              alt: `${countryName} flag`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${countryName} - Complete Country Information`,
      description: `Explore detailed information about ${countryName} including capital, region, population, currency, and more.`,
      images: flagUrl ? [flagUrl] : [],
    },
    alternates: {
      canonical: `/countries/${encodeURIComponent(countryName)}`,
    },
  };
}

async function CountryDetailWrapper({ name }: { name: string }) {
  const countryComponent = await CountryDetail({ name });

  if (!countryComponent) {
    notFound();
  }

  return countryComponent;
}

export default async function CountryDetailPage({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Get country data for structured data
  const country = await getCountryMetadata(decodedName);

  const structuredData = country
    ? {
        "@context": "https://schema.org",
        "@type": "Country",
        name: country.name.common,
        alternateName: country.name.official,
        capital: country.capital?.[0],
        containedInPlace: {
          "@type": "Place",
          name: country.region,
        },
        image: country.flags?.png,
      }
    : null;

  return (
    <>
      <ScrollToTop />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <nav aria-label="Breadcrumb navigation" className="mb-8">
            <BackButton />
          </nav>

          <Suspense
            fallback={
              <div className="space-y-8">
                {/* Hero Skeleton */}
                <div className="w-full h-[400px] bg-white/5 rounded-3xl animate-pulse" />
                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-white/5 rounded-3xl animate-pulse"
                    />
                  ))}
                </div>
              </div>
            }
          >
            <CountryDetailWrapper name={decodedName} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
