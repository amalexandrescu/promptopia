"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { IPost } from "@app/create-prompt/page";
import { MySession } from "@app/api/auth/[...nextauth]/route";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession() as { data: MySession };
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session && session?.user && session?.user.id) {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
      }
    };

    if (session && session?.user && session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post: IPost) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IPost) => {
    //confirm is built in the browser api
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
