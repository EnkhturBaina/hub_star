'use client';
import { Advice, PageMeta } from '@/types/reference';
import { useAppContext } from '@/app/app-context';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import ProfileLayout from '@/layouts/profile.layout';
import { ReferenceService } from '@/service/reference/reference.service';
import { IAdviceParam } from '@/interfaces/request.interface';
import PaginationComp from '@/components/Pagination';
import AdviceItem from '@/components/Blog/AdviceItem';
import Empty from '@/components/Empty';

const Advices = () => {
  const { user } = useAppContext();
  const [params, setParams] = useState<IAdviceParam>({
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

  const getData = useCallback(async () => {
    await ReferenceService.getAdvice(params).then(res => {
      if (res.success) {
        setAdvices(res.response.data);
        setPageMeta(res.response.meta);
      }
    });
  }, [params]);

  useEffect(() => {
    getData();
  }, [getData]);

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

export default Advices;
