import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { first } from 'lodash';
import { Transition } from '@headlessui/react';
import { Country } from '@/types/commerce';
import translations from '@/translations/index';
import { countries as optionComponents} from '@/constants';

type Props = {
  options: Country[];
};

const CountrySelector: FunctionComponent<Props> = ({ options }) => {
  const [show, setShow] = useState(false); 
  const {
    push,
    query: { country, lang, slug },
  } = useRouter();
  console.log('slug', slug)


  const selectedOption = first(optionComponents?.filter(({ code }) => code === lang));
  const handleChange = (code: string, defaultLocale: string) => {
    if(slug !== undefined && slug !== null && slug !== '') {
      push({
        pathname: '/[lang]/[[...slug]]',
        query: { lang: code, slug: slug },
      });
    } else {
      push({
        pathname: '/[lang]',
        query: { lang: code },
      });
    }
    setShow(!show);
  };
  return (
    <div>
      <div className="relative mt-1">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setShow(!show)}
          className="relative w-full py-2 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="flex items-center">
            <Image src={selectedOption?.image.url || '/public/img/american-flag.png'} alt={selectedOption?.image?.file?.alt || 'flag 2'} className="block ml-3 mt-0.5 w-6" width={24} height={14}/>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <Transition show={show} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div
            className={`absolute mt-1 w-full rounded-md bg-white shadow-lg ${show ? 'z-10' : ''}`}
            onMouseLeave={() => setShow(false)}
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {optionComponents?.map(({ code, name, image, defaultLocale }, k) => {
                const selected = code === selectedOption?.code;
                return (
                  <li
                    key={k}
                    role="option"
                    className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:text-gray-50 hover:bg-blue-500 ${
                      selected ? '' : 'text-gray-900'
                    }`}
                    onClick={() => handleChange(code, defaultLocale)}
                  >
                    <div className="flex items-center">
                      <Image src={image.url} alt={image.file?.alt || 'flag 2'} className="flex-shrink-0 w-6" width={24} height={14}/>
                    </div>
                    {/* Highlighted: "text-white", Not Highlighted: "text-indigo-600" */}
                    <span
                      className={`${
                        selected ? 'text-gray-900' : 'hidden'
                      } absolute inset-y-0 right-0 flex items-center pr-4 hover:bg-blue-500`}
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default CountrySelector;
