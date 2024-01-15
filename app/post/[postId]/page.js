"use client";

import { usePathname } from "next/navigation";
import PostForm from "../postForm";
import { useEffect, useState } from "react";
import { fetchPost } from "@/actions/post";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();
  const id = path.split("/")[2];

  console.log("id", id);

  useEffect(() => {
    const fetchSinglePost = async () => {
      const post = await fetchPost(id);

      console.log("fetch single post", post);

      setPost(post);
      setIsLoading(false);
    };

    fetchSinglePost();
  }, [id]);

  return (
    <>
      <h1>Edit Post</h1>

      {!isLoading && <PostForm post={post} id={id} />}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default EditPost;
