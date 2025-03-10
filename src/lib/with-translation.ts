import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type GetStaticPropsFunc = (context: GetStaticPropsContext) => Promise<GetStaticPropsResult<any>>;

export const withTranslationProps =
  (namespaces: string[] = ['common']): GetStaticPropsFunc =>
  async context => {
    const { locale } = context;
    return {
      props: {
        ...(await serverSideTranslations(locale as string, namespaces)),
      },
    };
  };
