"use server";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

interface SSRProps {
  serverRenderedData: string;
}

const SSRExample: NextPage<SSRProps> = ({ serverRenderedData }) => {
  return (
    <div>
      <h1>Server-Side Rendering Example</h1>
      <p>Server-side rendered data:{serverRenderedData}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  // Simulate fetching data from an API
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": `${process.env.API_KEY}`,
  });

  const response = await fetch(
    `${process.env.PUBLIC_URL}/reference/main-direction`,
    {
      method: "GET",
      headers: headers,
      redirect: "follow",
    },
  );
  const data = await response.json();
  console.log("data", data);

  const serverRenderedData = data[0]?.url || "No data";

  // The returned object will be passed as props to the component
  return {
    props: {
      serverRenderedData,
    },
  };
};

export default SSRExample;
