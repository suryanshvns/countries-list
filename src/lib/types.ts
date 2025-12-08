// Country types for API responses

export interface CountryBase {
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

export interface CountryDetail extends CountryBase {
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
  subregion?: string;
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
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  timezones: string[];
  continents: string[];
  latlng?: [number, number];
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

