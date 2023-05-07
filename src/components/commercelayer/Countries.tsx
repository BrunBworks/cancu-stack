import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isEmpty, first } from 'lodash';
import { Country } from '@/types/commerce';
import { countries as hardCodedCountries }  from '@/constants';
type Item = Omit<Country, 'image'> & {
  image: { title: string; url: string };
};

type Props = {
  items: Item[];
  searchBy?: string;
};

const Countries: FunctionComponent<Props> = ({ items, searchBy }) => {
  const countries = items.map(({ image, defaultLocale, code }, key) => {
    const lang = first(defaultLocale.toLowerCase().split(','));
    const countryCode = code.toLowerCase();
    const href = !isEmpty(searchBy)
      ? {
          pathname: `/[lang]`,
          query: {
            countryCode,
            lang,
          },
        }
      : {
          pathname: `/[lang]`,
          query: {
            countryCode,
            lang,
          },
        };
    return (
      <Link key={key} href={href}>
        <div className="cursor-pointer">
          <Image title={countryCode} className="w-full border rounded hover:opacity-75" src={image.url} alt={countryCode} width={102} height={61} />
        </div>
      </Link>
    );
  });
  return (
    <div className="max-w-screen-sm p-10 mx-auto bg-white rounded shadow-md">
      <h1 className="mb-8 text-xl md:text-2xl">Choose your country</h1>
      <div className="grid grid-cols-2 gap-y-14 gap-x-16 md:grid-cols-4 md:gap-y-8 md:gap-x-12">{countries}</div>
    </div>
  );
};

export default Countries;
