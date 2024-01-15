"use server";

const BASE_URL = "http://localhost:4000/post";

export const fetchPost = async (id) => {
  const res = await fetch(BASE_URL + "/" + id, {
    next: {
      revalidate: 1,
    },
  });

  const data = await res.json();

  return data;
};

export const fetchAllPost = async () => {
  try {
    const res = await fetch(BASE_URL, { cache: "no-cache" });

    if (!res.ok) {
      return {
        error: {
          message: "Failed to fetch posts!",
        },
      };
    }

    return await res.json();
  } catch (error) {
    return {
      error: {
        message: "Something went wrong!",
      },
    };
  }
};

export const addPost = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const postData = await res.json();

    console.log("postData", postData);

    return postData;
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id) => {
  const res = await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
  });

  if (res.ok) {
    return {
      message: "post deleted successfully!",
    };
  } else {
    return {
      message: "Failed!",
    };
  }
};

export const editPost = async (id, data) => {
  try {
    const res = await fetch(BASE_URL + "/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const postData = await res.json();

    return postData;
  } catch (error) {
    return error;
  }
};
