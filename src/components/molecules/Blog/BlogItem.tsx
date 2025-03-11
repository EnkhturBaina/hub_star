'use client';
import React from 'react';
import SpecialServiceData from '@datas/SpecialServiceData';
import UserTabData from '@datas/UserTabData';
import { Blog } from '@typeDefs/blog';
import { moneyFormat } from '@utils/index';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const BlogItem = ({ blog }: { blog: Blog }) => {
  const t = useTranslations();
  const { id, title, desciption, userType, specialService } = blog;
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
        <Link
          href={{ pathname: '/adv/item', query: { id } }}
          className="relative block h-32 w-full"
        >
          <Image
            src={imagePath}
            alt={title}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        </Link>

        <div className="flex flex-col px-3 h-30">
          {/* <span className="line-clamp-3">{`${desciption?.slice(0, 30)}...`}</span> */}
          {/* w-fit line-clamp-4 inline-block !text-ellipsis  */}
          <h3 className="text-sm font-semibold text-black duration-300 hover:text-primary line-clamp-2">
            <Link href={{ pathname: '/adv/item', query: { id } }}>{title}</Link>
          </h3>
          <strong className="w-fit md:text-base sm:text-sm text-xs line-clamp-3 !m-0 !p-0 h-fit flex items-center">
            {t(blogType)}
          </strong>
          <strong className="min-w-fit w-fit flex justify-end items-end md:text-lg sm:text-sm text-xs text-orange-500 underline underline-offset-2">
            {moneyFormat(blog?.price)} ₮
          </strong>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
