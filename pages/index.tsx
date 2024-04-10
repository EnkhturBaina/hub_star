import Hero from '@/components/Hero';
import { Metadata, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default HomePage;
