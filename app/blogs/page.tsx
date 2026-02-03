import { getPublicBlogs } from "@/actions/blogs";
import BlogsClient from "./BlogsClient";

export default async function BlogsPage() {
  const blogs = await getPublicBlogs();

  return <BlogsClient blogs={blogs} />;
}