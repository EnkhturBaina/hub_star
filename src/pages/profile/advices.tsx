'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Advice, PageMeta } from '@typeDefs/reference';
import { useAppContext } from '@context/app-context';
import { motion } from 'framer-motion';
import ProfileLayout from '@/layouts/profile.layout';
import { ReferenceService } from '@services/reference/reference.service';
import { IAdviceParam } from '@/interfaces/request.interface';
import PaginationComp from '@components/Pagination';
import AdviceItem from '@components/Blog/AdviceItem';
import Empty from '@components/Empty';
import withAuth from '@components/Common/withAuth';

const Advices = () => {
  const { user } = useAppContext();
  const [params] = useState<IAdviceParam>({
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
    <ProfileLayout>
      {advices.length == 0 ? (
        <Empty />
      ) : (
        <>
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
          </motion.div>
          <PaginationComp page={pageMeta.page} pageCount={pageMeta.pageCount} />
        </>
      )}
    </ProfileLayout>
  );
};

export default withAuth(Advices);
