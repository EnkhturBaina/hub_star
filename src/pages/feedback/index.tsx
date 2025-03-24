import React from 'react';
import Feedback from '@components/molecules/Feedback';
import Head from 'next/head';
const FeedbackPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Санал хүсэлт илгээх | Hub Star</title>
      </Head>
      <section className="pb-2 lg:pb-2 xl:pb-4 pt-20">
        <Feedback />
      </section>
    </>
  );
};

export default FeedbackPage;
