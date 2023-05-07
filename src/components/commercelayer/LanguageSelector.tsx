import React, { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { first } from 'lodash';
import { Transition } from '@headlessui/react';
import { Country } from '@/types/commerce';
import translations from '@/translations/index';

type Props = {
  options: Country[];
};

const LanguageSelector: FunctionComponent<Props> = ({ options }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    push,
    query: { lang, country, slug },
  } = router;

  const optionComponents = options?.map(({ code, name, image, defaultLocale }) => {
    return {
      value: defaultLocale?.toLowerCase(),
      name,
      image,
      code: code?.toLowerCase(),
    };
  });
  const selectedOption = first(optionComponents?.filter(({ value }) => value === lang));
  const handleChange = (lang: string) => {
    if(slug !== undefined && slug !== null && slug !== '') {
      push({
        pathname: '/[lang]/[[...slug]]',
        query: { lang: lang, slug: slug ?? '' },
      });
    } else {
      push({
        pathname: '/[lang]',
        query: { lang: lang },
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
          className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="flex items-center">
            <span className="flex-shrink-0 text-gray-700 capitalize truncate">{lang}</span>
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
          <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg" onMouseLeave={() => setShow(false)}>
            <ul
              title="Languages"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {optionComponents?.map(({ value, name, image }, k) => {
                const selected = value === selectedOption?.value;
                return (
                  <li
                    key={k}
                    role="option"
                    className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:text-gray-50 hover:bg-blue-500 ${
                      selected ? '' : 'text-gray-900'
                    }`}
                    onClick={() => handleChange(value)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } ml-3 block font-normal capitalize truncate`}
                      >
                        {value}
                      </span>
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

export default LanguageSelector;
