"use client";

import { useMemo, useState } from "react";
import CountryCard from "./country-card";

// Scroll to top helper function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

interface CountriesListClientProps {
  countries: Country[];
}

const ITEMS_PER_PAGE = 20;

export default function CountriesListClient({
  countries,
}: CountriesListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort countries once
  const sortedCountries = useMemo(
    () =>
      [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)),
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
        {currentCountries.map((country) => (
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

