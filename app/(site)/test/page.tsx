import { api, setContext } from "@/service/api.service";
import { GetServerSideProps } from "next";
import React from "react";
const Post: React.FC<any> = ({ posts }) => {
  return <ul>{JSON.stringify(posts)}</ul>;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   setContext(context);

//   let posts = [];
//   try {
//     const { data } = await api.get("posts");
//     posts = data;
//   } catch (error) {
//     throw error;
//   }

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default Post;
