import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Fetch all countries for dynamic routes
  let countries: Array<{ name: { common: string } }> = [];

  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name",
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        countries = data;
      }
    }
  } catch (error) {
    console.error("Error fetching countries for sitemap:", error);
  }

  // Generate country pages
  const countryPages = countries.map((country) => ({
    url: `${baseUrl}/countries/${encodeURIComponent(country.name.common)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...countryPages,
  ];
}
