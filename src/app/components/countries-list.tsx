import CountriesListClient from "./countries-list-client";

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

async function getCountries(): Promise<Country[]> {
  // API requires fields parameter - specify the fields we need
  const fields = [
    "name",
    "cca2",
    "cca3",
    "capital",
    "region",
    "population",
    "flags",
  ].join(",");

  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=${fields}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    console.error(`API Error: ${res.status} ${res.statusText}`, errorText);
    throw new Error(
      `Failed to fetch countries: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  // Validate that we got an array
  if (!Array.isArray(data)) {
    throw new Error("Invalid response format from API");
  }

  return data;
}

export default async function CountriesList() {
  const countries = await getCountries();

  if (countries.length === 0) {
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

  // Fix: Use the correct component 'CountriesListClient' to pass countries prop
  return <CountriesListClient countries={countries} />;
}
