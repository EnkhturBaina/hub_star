import AdSkeleton from '@/components/Skeleton/AdSkeleton';
import { ReferenceService } from '@/service/reference/reference.service';
import { FooterMenuPage } from '@/types/reference';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MenuPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<FooterMenuPage>();
  useEffect(() => {
    if (router.query.slug) {
      ReferenceService.getMenuPage(router.query['slug'])
        .then(res => {
          if (res.success) {
            setPage(res.response);
            setLoading(false);
          }
        })
        .catch(err => toast.error(err));
    }
  }, [router.query['slug']]);
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
          <section className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0 mb-4">
            {page.image && page.image.path ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${page.image.path}`}
                alt="add"
                className="rounded-md object-contain object-center"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: '100%', height: 400 }}
              />
            ) : null}
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
