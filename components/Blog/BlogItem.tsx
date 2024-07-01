'use client';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import UserTabData from '@/app/data/UserTabData';
import { Blog } from '@/types/blog';
import { moneyFormat } from '@/utils/util';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { t } = useTranslation();
  const { id, mainImage, title, desciption, userType, specialService } = blog;
  const [imagePath, setImagePath] = useState('/images/blog_img.jpg');
  const [blogType, setBlogType] = useState('');
  const takeTypeName = () => {
    if (userType !== null) {
      UserTabData?.map(el => {
        if (el.type === userType) {
          setBlogType(el.title);
        }
      });
    } else if (specialService !== null) {
      SpecialServiceData?.map(el => {
        if (el.type === specialService) {
          setBlogType(el.title);
        }
      });
    } else {
      setBlogType(desciption);
    }
  };

  useEffect(() => {
    takeTypeName();
    if (blog.images?.length == 0) {
      setImagePath('/images/blog_img.jpg');
    } else {
      setImagePath(process.env.NEXT_PUBLIC_MEDIA_URL + blog.images[0]?.id);
    }
  }, []);

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
        className="animate_top rounded-lg bg-white shadow-md"
      >
        <Link href={{ pathname: 'adv/item', query: { id } }} className="relative block h-32 w-full">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        </Link>

        <div className="flex flex-col px-3 pb-2 justify-between h-20">
          <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-sm font-semibold text-black duration-300 hover:text-primary">
            <Link href={{ pathname: '/adv/item', query: { id } }}>{title}</Link>
          </h3>
          {/* <span className="line-clamp-3">{`${desciption?.slice(0, 30)}...`}</span> */}
          <div className="flex justify-between">
            <span className="md:text-base text-sm line-clamp-3 !m-0 !p-0 min-h-8 max-h-8 flex items-center">
              {t(blogType)}
            </span>
            <strong className="md:text-lg text-base text-orange-500 underline underline-offset-2">
              {moneyFormat(blog?.price)} ₮
            </strong>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
