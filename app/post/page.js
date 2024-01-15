import PostForm from "./postForm";

export const metadata = {
  title: "Post Page",
  description: "Post Page description",
  keywords: "Post Page keywords",
};

const PostPage = () => {
  return (
    <>
      <h1>Post Page</h1>

      <PostForm />
    </>
  );
};

export default PostPage;
