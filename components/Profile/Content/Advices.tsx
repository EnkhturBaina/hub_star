'use client';
import { IFeedbackParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Feedback } from '@/types/reference';
import { useAppContext } from '@/utils/context/app-context';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Advices = () => {
  const { user } = useAppContext();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const params: IFeedbackParam = {
    page: 1,
    limit: 10,
    order: 'DESC',
    mainDirectionId: user.mainDirectionId,
  };
  const getFeedback = () => {
    ReferenceService.getFeedback(params)
      .then(res => {
        if (res.success) {
          setFeedbacks(res.response.data);
        }
      })
      .catch(err => toast.error(err));
  };
  useEffect(() => {
    getFeedback();
  }, []);
  return (
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
      {feedbacks.map((item, i) => {
        return (
          <a
            key={i}
            href={`${process.env.NEXT_PUBLIC_BASE_API_URL}files/${item.pdf.path}`}
            target='_blank'
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-8"
          >
            <Image
              src="/pdf_icon.png"
              alt={'alt' + i}
              width={100}
              height={80}
              className="h-full w-12"
            />
            <span className="mt-2 text-center text-sm leading-none">{item.title}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export default Advices;
