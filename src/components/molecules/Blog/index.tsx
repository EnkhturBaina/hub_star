import React from 'react';
import BlogItem from './BlogItem';
import PaginationComp from '../Pagination';
import Title from '../../atoms/Title';
import { useTranslations } from 'next-intl';

const Blog = () => {
  const advertisements = [];
  const adMeta = { page: 1, pageCount: 1 };
  const t = useTranslations();
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
