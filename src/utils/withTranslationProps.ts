import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type GetStaticPropsFunc = (context: GetStaticPropsContext) => Promise<GetStaticPropsResult<any>>;

export const withTranslationProps =
  (namespaces = ['common']): GetStaticPropsFunc =>
  async context => {
    const { locale } = context;
    const translations = await serverSideTranslations(locale, namespaces);

    return {
      props: {
        ...translations,
      },
    };
  };
