import React from 'react';
import BlogItem from './BlogItem';
import { useAppContext } from '@/context/app-context';
import PaginationComp from '../Pagination';
import Title from '../Common/Title';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { advertisements, adMeta } = useAppContext();
  const { t } = useTranslation();
  return (
    <section className="mt-4">
      <div className="w-full overflow-hidden">
        <Title label={t('services')} />
      </div>
      <div className="mx-auto mt-10 max-w-c-1280">
        <div className="grid grid-cols-2 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {advertisements && advertisements.map(blog => <BlogItem blog={blog} key={blog.id} />)}
        </div>
        <PaginationComp page={adMeta.page} pageCount={adMeta.pageCount} />
      </div>
    </section>
  );
};

export default Blog;
