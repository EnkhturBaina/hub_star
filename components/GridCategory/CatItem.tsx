'use client';
import { MainDirection } from '@/types/reference';
import { motion } from 'framer-motion';
import Image from 'next/image';
type Props = {
  mainDirection: MainDirection;
};
const CatItem: React.FC<Props> = ({ mainDirection }) => {
  const { id, logoId, name } = mainDirection;

  return (
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
        className="animate_top cursor-pointer bg-gradient-to-b shadow-solid-8 hover:bg-gradient-to-t hover:from-mainColor hover:to-transparent"
      >
        <div className="relative block h-64 w-full rounded-lg hover:opacity-50">
          <Image
            alt={name ?? 'alt'}
            src={process.env.NEXT_PUBLIC_MEDIA_URL + logoId}
            className="rounded-lg object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw"
          />
          <span className="absolute left-1/2 top-1/2 z-999 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl uppercase text-white">
            {name}
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default CatItem;
