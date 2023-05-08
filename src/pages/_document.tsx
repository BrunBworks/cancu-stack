import React from 'react';
import Document, { Head, Html, Main, NextScript,  DocumentContext, DocumentInitialProps } from 'next/document';
import { countries } from '@/constants';
import { useRouter  } from 'next/router';
class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, locale: ctx.query.lang || 'en', slug: ctx.query.slug || '' };
  }

  render(): React.ReactElement {
    const locale = this.props.locale;
    const slug = this.props.slug;
    
    return (
      <Html lang={locale}>
        <Head>
        {countries.filter((m) => m.code != locale).map((l) => (
          <link
            key={l.code}
            rel="alternate"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}${
              l.code === 'en' ? '' : `/${l.code}`
            }/${slug}`}
            hrefLang={l.code}
          />
        ))}
          <link rel="stylesheet" href="https://use.typekit.net/amw0suj.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
