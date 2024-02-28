import React, { useContext } from "react";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";
import MainContext from "@/app/context/MainContext";

const Blog = () => {
  const state = useContext(MainContext);
  return (
    <section className="">
      <div className="mx-auto mt-10 max-w-c-1280">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {state?.adsData &&
            state?.adsData?.map((blog, key) => (
              <BlogItem blog={blog} key={key} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
