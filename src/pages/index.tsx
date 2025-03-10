import { withTranslationProps } from '@lib/with-translation';
import Hero from '@components/Hero';
import { GetStaticProps, Metadata, NextPage } from 'next';

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
export const getStaticProps: GetStaticProps = withTranslationProps();
export default HomePage;
