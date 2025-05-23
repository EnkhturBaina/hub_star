'use client';
import React, { useEffect, useState } from 'react';
import { Advice, PageMeta } from '@typeDefs/reference';
import { motion } from 'framer-motion';
import ReferenceService from '@services/reference';
import PaginationComp from '@components/molecules/Pagination';
import AdviceItem from '@components/molecules/Advertisement/AdviceItem';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const Advices = () => {
  const t = useTranslations();
  const { user } = useAuthState();
  const [params] = useState({
    page: 1,
    limit: 10,
    order: 'DESC',
    mainDirectionId: user.mainDirectionId,
  });
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    pageCount: 1,
  });

  useEffect(() => {
    const getData = async () => {
      await ReferenceService.getAdvice(params).then(res => {
        if (res.success) {
          setAdvices(res.response.data);
          setPageMeta(res.response.meta);
        }
      });
    };
    getData();
  }, [params]);

  return (
    <>
      <Head>
        <title>{t('advices')} | Hub Star</title>
      </Head>
      {advices.length > 0 ? (
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
          className="animate_top grid grid-cols-5 gap-3"
        >
          {advices.map((item, index) => {
            return <AdviceItem advice={item} key={index} />;
          })}
          <PaginationComp page={pageMeta.page} pageCount={pageMeta.pageCount} />
        </motion.div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default withAuth(Advices);
