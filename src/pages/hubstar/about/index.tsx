import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';
import {
  ContentSection,
  HeroSection,
  LogoSection,
  TeamSection,
  ValuesSection,
} from '@components/about';

const AboutPage: NextPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ContentSection />
      <ValuesSection />
      <LogoSection />
      <TeamSection />
    </MainLayout>
  );
};
export const getStaticProps = withTranslationProps();
export default AboutPage;
