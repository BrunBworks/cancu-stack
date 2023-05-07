import React from 'react';
import Link from '@/components/_atoms/Link';
import Image from 'next/image';
import { UniformSlot } from '@uniformdev/canvas-react';
import { useRouter } from 'next/router';
import { LineItemsContainer, LineItemsCount } from '@commercelayer/react-components';
import IconArrow from '@/components/_atoms/IconArrow';
import IconHamburger from '@/components/_atoms/IconHamburger';
import { togglePageScroll } from '@/utils/scroll';
import LanguageSelector from '@/components/commercelayer/LanguageSelector';
import CountrySelector from '@/components/commercelayer/CountrySelector';
import { CommerceContext } from '@/context/commerce/CommerceContext';
import LayoutContext from '@/context/LayoutContext';
import { countries } from '@/constants';

type HeaderProps = Type.ComponentProps<{
  logo: string;
  showFavorites?: boolean;
}>;

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const commerceContext = React.useContext(CommerceContext);
  const layoutContext = React.useContext(LayoutContext);
  //const { countries, buildLanguages } = CommerceContext;
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const handleRouteChangeStart = () => {
    setIsOpen(false);
    togglePageScroll(true);
  };

  const toggleIsOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
    togglePageScroll();
  }, [isOpen]);

  React.useEffect(() => {
    router?.events.on('routeChangeStart', handleRouteChangeStart);
    return () => router?.events.off('routeChangeStart', handleRouteChangeStart);
  }, [router?.events]);

  const renderLogo = (logoSrc: string) => (
    <Link href={'/'}>
      <div className="cursor-pointer">
        <Image alt="Uniform Demo" src={logoSrc} width="196.46" height="47" priority={true} loading="eager" />
      </div>
    </Link>
  );

  return (
    <header className="relative z-10 border-b">
      <div
        className="relative hidden header_footer_container lg:flex lg:flex-row lg:items-center lg:place-content-between lg:py-4"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="flex justify-between flex-1 pr-12">
          {renderLogo(logo)}
          <div className="flex flex-col justify-center pb-10 lg:flex-row lg:items-center lg:pl-5 lg:pb-0">
            <UniformSlot name="topNav" />
          </div>
          <div className="flex flex-col justify-center pb-10 lg:flex-row lg:items-center lg:pl-5 lg:pb-0">
            <div>
              <CountrySelector options={countries} />
            </div>
            <div className="pl-4">
              <LanguageSelector options={countries} />
            </div>
            <div className="pl-4">
              <a href="#" onClick={layoutContext.handleAnimation}>
                <div className="flex flex-row items-center">
                  <span className="inline-block">Cart</span>
                  <LineItemsContainer>
                    <LineItemsCount className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-theme_strong hover:bg-blue-400 text-gray-50" />
                  </LineItemsContainer>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full h-20 px-5 lg:hidden ">
        <div className="basis-3/6">{renderLogo(logo)}</div>
        <div className="flex flex-row items-center justify-between basis-2/6">
          <button
            type="button"
            aria-label="mobile navigation"
            className="inline-flex w-6 h-6 focus:outline-none"
            onClick={toggleIsOpen}
          >
            {isOpen ? <IconArrow fill="black" /> : <IconHamburger fill="black" />}
          </button>
        </div>
      </div>
      <div className="lg:hidden">
        {isOpen && (
          <div className="absolute flex flex-col items-center w-full pt-16 bg-white header_footer_container--mobile">
            <div className="flex flex-col justify-center pb-10 lg:flex-row lg:items-center lg:pl-5 lg:pb-0">
              <UniformSlot name="topNav" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
