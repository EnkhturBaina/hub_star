import React from 'react';
import Hero from '@components/molecules/Hero';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Hub star',
  description: 'All at once',
  // other metadata
};
const HomePage: NextPage = () => {
  return (
    <main>
      <Hero />
    </main>
  );
};
export default HomePage;
