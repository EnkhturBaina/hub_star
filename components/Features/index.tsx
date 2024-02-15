"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="my-2 grid grid-cols-6 gap-4">
            {/* <!-- Features item Start --> */}

            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
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
