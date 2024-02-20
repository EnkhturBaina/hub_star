import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page - Solid SaaS Boilerplate",
  description: "This is Blog page for Solid Pro",
  // other metadata
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">7,284</span>
              </span>
              <div>
                <BreadCrumbs />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
          <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
            xaxaxa
          </div>
          <div className="py-6 lg:w-3/4">
            <div className="grid grid-cols-2 gap-3">
              {BlogData.map((blog, key) => (
                <BlogItem blog={blog} key={key} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
