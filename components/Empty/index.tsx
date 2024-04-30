'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Empty = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto"
            >
              <Image
                src="/empty_box.jpg"
                alt="About"
                className="rounded-t-lg object-cover"
                sizes="(max-width: 512px) 80vw"
                width={300}
                height={100}
              />
              <div className="text-center font-bold">Үр дүн олдсонгүй...</div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Empty;
