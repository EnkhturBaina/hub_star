import React, { useEffect, useState } from 'react';
import AdSkeleton from '@components/Skeleton/AdSkeleton';
import { ReferenceService } from '@services/reference/reference.service';
import { RefNews } from '@typeDefs/reference';
import { NextPage } from 'next';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const MenuPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<RefNews>();

  const paramId = useSearchParams().get('id');

  console.log({ paramId });

  useEffect(() => {
    if (paramId) {
      ReferenceService.getNewsById(paramId)
        .then(res => {
          if (res.success) {
            setPage(res.response);
            setLoading(false);
          }
        })
        .catch(err => toast.error(err));
    }
  }, [paramId]);
  return (
    <section className="pt-35 lg:pt-40 xl:pt-42.5">
      {loading ? (
        <AdSkeleton />
      ) : (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
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
          <section className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0 mb-4 pt-10">
            {page.imageId && (
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_URL + page.imageId}
                alt="add"
                className="rounded-md object-cover"
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
export default MenuPage;
