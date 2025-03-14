import React from 'react';
import Contact from '@components/molecules/Contact';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Support Page - Solid SaaS Boilerplate',
  description: 'This is Support page for Solid Pro',
  // other metadata
};

const SupportPage: NextPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Contact />
    </div>
  );
};

export default SupportPage;
