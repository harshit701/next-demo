"use client";

import { deletePost, fetchAllPost } from "@/actions/post";
import SubmitBtn from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [postData, setPosts] = useState({});

  const handleOnDelete = async (id) => {
    await deletePost(id);

    const postData = await fetchAllPost();
    setPosts(postData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchAllPost();

      setPosts(posts);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Home Page</h1>

      <SubmitBtn>
        <Link href="/post">Add Post</Link>
      </SubmitBtn>

      {postData.posts &&
        postData.posts.map((post) => {
          return (
            <li key={post.id}>
              <p>{post.title}</p>

              <p> {post.body}</p>

              <button>
                <Link href={`post/` + post.id}>Edit</Link>
              </button>
              <button className="red" onClick={() => handleOnDelete(post.id)}>
                Delete
              </button>
            </li>
          );
        })}
    </>
  );
};

export default Home;
