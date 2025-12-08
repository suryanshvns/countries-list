"use client";

import { useMemo, useState } from "react";
import { useCountries } from "@/hooks/use-countries";
import CountryCard from "./country-card";
import type { CountryBase } from "@/lib/types";

// Scroll to top helper function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ITEMS_PER_PAGE = 20;

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <section aria-label="Loading countries">
      <div className="mb-8 backdrop-blur-xl bg-white/5 rounded-xl px-6 py-4 border border-white/10">
        <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-white/10 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded animate-pulse" />
                <div className="h-4 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Error component
function ErrorDisplay({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <section aria-label="Error">
      <div className="text-center py-12 backdrop-blur-xl bg-red-500/10 rounded-2xl border border-red-500/20">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-red-200 mb-6">{error.message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}

export default function CountriesList() {
  const { data: countries, isLoading, isError, error, refetch } = useCountries();
  const [currentPage, setCurrentPage] = useState(1);

  // Sort countries once
  const sortedCountries = useMemo(
    () =>
      countries
        ? [...countries].sort((a: CountryBase, b: CountryBase) =>
            a.name.common.localeCompare(b.name.common)
          )
        : [],
    [countries]
  );

  // Calculate pagination
  const totalPages = Math.ceil(sortedCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCountries = sortedCountries.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(1, prev - 1);
      if (newPage !== prev) {
        scrollToTop();
      }
      return newPage;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(totalPages, prev + 1);
      if (newPage !== prev) {
        scrollToTop();
      }
      return newPage;
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorDisplay error={error as Error} onRetry={() => refetch()} />;
  }

  if (!countries || countries.length === 0) {
    return (
      <section aria-label="Countries list">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No countries found. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Countries list">
      <div className="mb-8 flex items-center justify-between backdrop-blur-xl bg-white/5 rounded-xl px-6 py-4 border border-white/10">
        <p className="text-purple-200 font-medium">
          Showing{" "}
          <span className="text-white font-bold">
            {Math.min(endIndex, sortedCountries.length)}
          </span>{" "}
          of{" "}
          <span className="text-white font-bold">{sortedCountries.length}</span>{" "}
          countries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCountries.map((country: CountryBase) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-purple-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-white/10 disabled:hover:border-white/20"
          >
            ← Previous
          </button>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3">
            <span className="text-white font-bold">
              Page <span className="text-purple-300">{currentPage}</span> of{" "}
              <span className="text-purple-300">{totalPages}</span>
            </span>
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-purple-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-white/10 disabled:hover:border-white/20"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
