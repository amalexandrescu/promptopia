"use client";
import { MySession } from "@app/api/auth/[...nextauth]/route";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface IPost {
  creator: ICreator;
  prompt: string;
  tag: string;
  _v: number;
  _id: string;
}

export interface ICreator {
  email: string;
  image: string;
  username: string;
  _v: number;
  _id: string;
}

export interface ICreatePost {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const router = useRouter();
  //useSession uses React context so we need to use "use client"
  //useSession has a data field inside
  //basically we destructure useSession and take the data field from it and we are assigning it to a session variable
  const { data: session } = useSession() as { data: MySession };

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<ICreatePost>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
