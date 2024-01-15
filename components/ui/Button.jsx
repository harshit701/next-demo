"use client";

import { useFormStatus } from "react-dom";

export default function SubmitBtn({ children }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "submitting..." : children}</button>
  );
}
