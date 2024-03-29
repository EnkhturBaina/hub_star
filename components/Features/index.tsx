"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import { useAppContext } from "@/utils/context/app-context";

const Feature = () => {
  const { categories } = useAppContext();
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features">
        <div className="max-w-c-1315 lg:mx-auto lg:px-4 xl:px-0">
          <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {/* <!-- Features item Start --> */}

            {categories
              .filter((item) => item.isSpecial)
              .map((feature, key) => (
                <SingleFeature category={feature} key={key} />
              ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
