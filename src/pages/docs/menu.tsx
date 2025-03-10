import React, { useEffect, useState } from 'react';
import AdSkeleton from '@/components/Skeleton/AdSkeleton';
import { ReferenceService } from '@/service/reference/reference.service';
import { FooterMenuPage } from '@/types/reference';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { withTranslationProps } from '@/lib/with-translation';
import { useSearchParams } from 'next/navigation';

const MenuPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<FooterMenuPage>();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('menuId')) {
      ReferenceService.getMenuPage(searchParams.get('menuId'))
        .then(res => {
          if (res.success) {
            setPage(res.response);
            setLoading(false);
          }
        })
        .catch(err => toast.error(err));
    }
  }, [searchParams.get('menuId')]);
  return (
    <section className="!overflow-y-auto !my-0">
      {loading ? (
        <AdSkeleton />
      ) : (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 0,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="animate_top"
        >
          <section className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0 mb-4 ms:pt-8 pt-12 text-justify">
            {page.imageId && (
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_URL + page.imageId}
                alt="add"
                className="rounded-md object-contain object-center"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: '100%', height: 400 }}
              />
            )}
            <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold">
              {page.title}
            </h3>
            <div>{page.description}</div>
            <div dangerouslySetInnerHTML={{ __html: page.body }} />
          </section>
        </motion.div>
      )}
    </section>
  );
};

export const getStaticProps: GetStaticProps = withTranslationProps();
export default MenuPage;
