import Image from "next/image";
import CountryMap from "./country-map";

interface CountryDetail {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  timezones: string[];
  continents: string[];
  latlng?: [number, number]; // [latitude, longitude]
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  demonyms?: {
    [key: string]: {
      f: string;
      m: string;
    };
  };
  fifa?: string;
  car?: {
    signs?: string[];
    side: string;
  };
  idd?: {
    root: string;
    suffixes: string[];
  };
  tld?: string[];
  startOfWeek?: string;
  gini?: {
    [key: string]: number;
  };
  status?: string;
  capitalInfo?: {
    latlng?: [number, number];
  };
}

async function getCountryByName(name: string): Promise<CountryDetail | null> {
  // API requires fields parameter - specify all fields we need for detail page
  const fields = [
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

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(
      name
    )}?fullText=true&fields=${fields}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    return null;
  }

  const data = await res.json();

  // Validate response
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data[0] || null;
}

interface CountryDetailProps {
  name: string;
}

// Icons as components to avoid external dependencies
const Icons = {
  Map: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  ),
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Globe: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Building: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" x2="9.01" y1="10" y2="10" />
      <line x1="15" x2="15.01" y1="10" y2="10" />
      <line x1="9" x2="9.01" y1="14" y2="14" />
      <line x1="15" x2="15.01" y1="14" y2="14" />
      <line x1="9" x2="9.01" y1="18" y2="18" />
      <line x1="15" x2="15.01" y1="18" y2="18" />
    </svg>
  ),
  Languages: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  ),
  Coins: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  ),
  Car: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  Phone: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Info: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
};

export default async function CountryDetail({ name }: CountryDetailProps) {
  const country = await getCountryByName(name);

  if (!country) {
    return null;
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common || country.name.common
    : country.name.common;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden rounded-3xl mb-8 group">
        {/* Background Blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src={country.flags.png}
            alt="Background"
            fill
            className="object-cover opacity-30 blur-3xl scale-110 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8">
          {/* Flag Card */}
          <div className="relative w-full max-w-[280px] aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image
              src={country.flags.png}
              alt={country.flags.alt || `${country.name.common} flag`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Quick Stats */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
              {country.name.common}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-lg text-purple-200 mb-6">
              <span className="font-medium">{country.name.official}</span>
              {nativeName !== country.name.common && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                  <span className="italic opacity-80">{nativeName}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Icons.Building />
                <span className="text-white font-medium">
                  {country.capital?.[0] || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Icons.Globe />
                <span className="text-white font-medium">{country.region}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Icons.Users />
                <span className="text-white font-medium">
                  {country.population.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Coat of Arms */}
          {country.coatOfArms?.png && (
            <div className="hidden lg:block w-32 h-32 relative opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src={country.coatOfArms.png}
                alt="Coat of Arms"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Geography Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Icons.Map />
            </div>
            <h2 className="text-xl font-bold text-white">Geography</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Subregion</p>
                <p className="text-lg font-medium text-white">
                  {country.subregion || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Area</p>
                <p className="text-lg font-medium text-white">
                  {country.area.toLocaleString()} km²
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Continents</p>
                <p className="text-lg font-medium text-white">
                  {country.continents.join(", ")}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-slate-400 mb-3">Bordering Countries</p>
              {country.borders && country.borders.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((border) => (
                    <span
                      key={border}
                      className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-200 rounded-lg text-sm transition-colors cursor-default"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No land borders</p>
              )}

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Latitude</p>
                    <p className="text-white font-mono">
                      {country.latlng?.[0].toFixed(2)}°
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Longitude</p>
                    <p className="text-white font-mono">
                      {country.latlng?.[1].toFixed(2)}°
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Culture Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Icons.Languages />
            </div>
            <h2 className="text-xl font-bold text-white">Culture</h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {country.languages ? (
                  Object.values(country.languages).map((lang) => (
                    <span
                      key={lang}
                      className="text-white bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">N/A</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Currencies</p>
              <div className="space-y-2">
                {country.currencies ? (
                  Object.entries(country.currencies).map(([code, curr]) => (
                    <div
                      key={code}
                      className="flex items-center justify-between bg-white/5 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-sm">
                          {curr.symbol}
                        </div>
                        <span className="text-white">{curr.name}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {code}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Codes & Info Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Icons.Info />
            </div>
            <h2 className="text-xl font-bold text-white">Codes & Status</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 mb-1">CCA2</p>
              <p className="text-2xl font-bold text-white">{country.cca2}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 mb-1">CCA3</p>
              <p className="text-2xl font-bold text-white">{country.cca3}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 mb-1">FIFA</p>
              <p className="text-xl font-bold text-white">
                {country.fifa || "-"}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 mb-1">TLD</p>
              <p className="text-xl font-bold text-white">
                {country.tld?.[0] || "-"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-slate-400">Independent</span>
              <span
                className={
                  country.independent ? "text-emerald-400" : "text-red-400"
                }
              >
                {country.independent ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-slate-400">UN Member</span>
              <span
                className={
                  country.unMember ? "text-emerald-400" : "text-red-400"
                }
              >
                {country.unMember ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Fun Facts / Extra Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              <Icons.Car />
            </div>
            <h2 className="text-xl font-bold text-white">
              Travel & Communication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Icons.Car />
              </div>
              <div>
                <p className="text-sm text-slate-400">Driving Side</p>
                <p className="text-xl font-medium text-white capitalize">
                  {country.car?.side || "Right"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Icons.Phone />
              </div>
              <div>
                <p className="text-sm text-slate-400">Calling Code</p>
                <p className="text-xl font-medium text-white">
                  {country.idd?.root}
                  {country.idd?.suffixes?.[0]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Icons.Coins />
              </div>
              <div>
                <p className="text-sm text-slate-400">Gini Index</p>
                <p className="text-xl font-medium text-white">
                  {country.gini ? Object.values(country.gini)[0] : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2">
        <div className="rounded-2xl overflow-hidden">
          <CountryMap
            countryName={country.name.common}
            coordinates={country.latlng}
            capital={country.capital?.[0]}
          />
        </div>
      </section>
    </>
  );
}
