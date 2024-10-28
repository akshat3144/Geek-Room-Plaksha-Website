import BlogsPage from "@/components/blogsPage/BlogsPage";
import Head from "next/head";

function Blogs() {
  return (
    <>
      <Head>
        <title>Media | Geek Room Plaksha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlogsPage />
    </>
  );
}

export default Blogs;
