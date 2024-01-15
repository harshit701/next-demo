"use client";

import { addPost, editPost } from "@/actions/post";
import SubmitBtn from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddPostForm = ({ post, id }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post && post.title ? post.title : "",
      body: post && post.body ? post.body : "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    // reset(); // reset form
    if (id) {
      // edit post
      data.id = id;
      const postData = await editPost(id, data);

      console.log("edit post data", postData);

      router.push("/"); // Redirect to the home page
    } else {
      // add post
      data.id = uuidv4();
      const { response, data: postData } = await addPost(data);

      if (postData) {
        console.log("add post data", postData);
        console.log("add post response", response);

        // reset();

        router.push("/"); // Redirect to the home page
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            {...register("title", {
              required: "Title is Required",
            })}
          />
          <span className="red">
            {errors.title && <p>{errors.title.message}</p>}
          </span>
        </div>

        <div>
          <textarea
            placeholder="Description"
            name="body"
            {...register("body", {
              required: "Description is Required",
            })}
          />
          <span className="red">
            {errors.body && <p>{errors.body.message}</p>}
          </span>
        </div>

        {/* <div>
        <input
          type="text"
          placeholder="Age"
          name="age"
          {...register("age", {
            required: "Age is Required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Age should be a number",
            },
          })}
        />
        <span className="red">{errors.age && <p>{errors.age.message}</p>}</span>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
              message: "Email should be a valid email",
            },
          })}
        />
        <span className="red">
          {errors.email && <p>{errors.email.message}</p>}
        </span>
      </div> */}

        <div>
          <SubmitBtn>{id ? "Edit" : "Add"} Post</SubmitBtn>
          <SubmitBtn>
            <Link href="/">Back</Link>
          </SubmitBtn>
        </div>
      </form>
    </>
  );
};

export default AddPostForm;
