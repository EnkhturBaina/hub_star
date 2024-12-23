import { NextPage } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import { withTranslationProps } from '@utils/withTranslationProps';
import { useTranslation } from 'next-i18next';
import MainLayout from '@components/layouts/main';
import { useRouter } from 'next/router';

const SearchPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <MainLayout>
      hello search page {router.query?.search} {router.query?.searchType}
    </MainLayout>
  );
};

export const getStaticProps = withTranslationProps();
export default SearchPage;
