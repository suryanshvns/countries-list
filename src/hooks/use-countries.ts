"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCountries,
  fetchCountryByName,
  searchCountries,
  fetchCountriesByRegion,
} from "@/lib/api";

// Query keys for cache management
export const countryKeys = {
  all: ["countries"] as const,
  lists: () => [...countryKeys.all, "list"] as const,
  list: (filters: string) => [...countryKeys.lists(), { filters }] as const,
  details: () => [...countryKeys.all, "detail"] as const,
  detail: (name: string) => [...countryKeys.details(), name] as const,
  search: (query: string) => [...countryKeys.all, "search", query] as const,
  region: (region: string) => [...countryKeys.all, "region", region] as const,
};

/**
 * Hook to fetch all countries
 */
export function useCountries() {
  return useQuery({
    queryKey: countryKeys.lists(),
    queryFn: fetchAllCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch a single country by name
 */
export function useCountry(name: string) {
  return useQuery({
    queryKey: countryKeys.detail(name),
    queryFn: () => fetchCountryByName(name),
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to search countries by name
 */
export function useSearchCountries(query: string) {
  return useQuery({
    queryKey: countryKeys.search(query),
    queryFn: () => searchCountries(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch countries by region
 */
export function useCountriesByRegion(region: string) {
  return useQuery({
    queryKey: countryKeys.region(region),
    queryFn: () => fetchCountriesByRegion(region),
    enabled: !!region,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

