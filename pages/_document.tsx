import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';
import i18nextConfig from '../next-i18next.config';

type Props = DocumentProps & {
  // add custom document props
};
class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <Head>
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
