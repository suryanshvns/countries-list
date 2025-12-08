// API functions for fetching country data
import { CountryBase, CountryDetail } from "./types";

const BASE_URL = "https://restcountries.com/v3.1";

// Fields for list view (minimal data)
const LIST_FIELDS = ["name", "cca2", "cca3", "capital", "region", "population", "flags"].join(",");

// Fields for detail view (full data)
const DETAIL_FIELDS = [
  "name",
  "cca2",
  "cca3",
  "capital",
  "region",
  "subregion",
  "population",
  "area",
  "currencies",
  "languages",
  "borders",
  "flags",
  "coatOfArms",
  "timezones",
  "continents",
  "latlng",
  "independent",
  "unMember",
  "landlocked",
  "demonyms",
  "fifa",
  "car",
  "idd",
  "tld",
  "startOfWeek",
  "gini",
  "status",
  "capitalInfo",
].join(",");

/**
 * Fetch all countries for the list view
 */
export async function fetchAllCountries(): Promise<CountryBase[]> {
  const response = await fetch(`${BASE_URL}/all?fields=${LIST_FIELDS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid response format from API");
  }

  return data;
}

/**
 * Fetch a single country by name
 */
export async function fetchCountryByName(name: string): Promise<CountryDetail | null> {
  const response = await fetch(
    `${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true&fields=${DETAIL_FIELDS}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data[0];
}

/**
 * Search countries by name (partial match)
 */
export async function searchCountries(query: string): Promise<CountryBase[]> {
  if (!query.trim()) {
    return fetchAllCountries();
  }

  const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(query)}?fields=${LIST_FIELDS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(`Failed to search countries: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

/**
 * Fetch countries by region
 */
export async function fetchCountriesByRegion(region: string): Promise<CountryBase[]> {
  const response = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}?fields=${LIST_FIELDS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch countries by region: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid response format from API");
  }

  return data;
}

