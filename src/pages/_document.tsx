import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';

type Props = DocumentProps & {
  // add custom document props
};
class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    const currentLocale = this.props.__NEXT_DATA__.locale;

    return (
      <Html lang={currentLocale}>
        <Head title="Hubstar">
          <meta name="description" content="HUBSTAR ALL AT ONCE" />
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
