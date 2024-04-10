import React, { useContext } from 'react';
import BlogItem from './BlogItem';
import { useAppContext } from '@/app/app-context';

const Blog = () => {
  const { advertisements } = useAppContext();
  return (
    <section className="">
      <div className="mx-auto mt-10 max-w-c-1280">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {advertisements && advertisements.map((blog, key) => <BlogItem blog={blog} key={key} />)}
        </div>
      </div>
    </section>
  );
};

export default Blog;
