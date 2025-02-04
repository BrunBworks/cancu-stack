import AmericanFlag  from '@/public/img/american-flag.png';
import ItalianFlag from '@/public/img/italian-flag.png';
import { Country } from '@/types/commerce';

export const Routes = {
  Articles: 'articles',
  Article: 'article',
  TopNav: 'topnav',
};

export const FormStatusMap = {
  INITIALIZED: 'INITIALIZED',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const Validation = {
  NAME: {
    empty: "Name can't be empty",
  },
  EMAIL: {
    empty: "Email can't be empty",
    re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    invalid: 'Please provide valid Email',
  },
  COMPANY: {
    empty: "Company can't be empty",
  },
  MESSAGE: {
    empty: "Message can't be empty",
  },
};

export const PROXY_REQUEST_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const NoImageSrc = '/img/no-image.jpg';

export const corsConfig = {
  // Options
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: [
    'http://localhost:3000',
    'https://cancu-stack.vercel.app',
    /.+--cancu-stack\.vercel\.app$/,
    /.+--vercel\.app$/,
    /.+--3000\.local\.webcontainer\.io$/
    
  ],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const countryLangConfig = new Map<string, string[]>();
countryLangConfig.set('us', ['en']);
//countryLangConfig.set('ca', ['en-ca', 'fr-ca']);
countryLangConfig.set('it', ['it']);

export const countries = [
  {
    code: "en", 
    name: "English",
    defaultLocale: "en",
    image: {
      file: {
        url: AmericanFlag.src,
        alt: "American Flag"
      },
      url: AmericanFlag.src
    },
    domain: "en",
    catalog: {
      id: "camisa-azul"
    }
  },
  {
    code: "it",
    name: "Italian",
    defaultLocale: "it",
    image: {
      file: {
        url: ItalianFlag.src,
        alt: "Italian Flag"
      },
      url: ItalianFlag.src
    },
    domain: "it",
    catalog: {
      id: "camisa-azul"
    }
  }
] as Country[];
export const buildLanguages = ['en', 'it'];