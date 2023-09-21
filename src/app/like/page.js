"use client";

import { getPosts } from "@/lib/get-posts";
import { useSession } from "next-auth/react";
import { Post } from '@/components/Posts'
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { AddPostBtn } from "@/components/AddPostButton/PostButton";
import { useEffect, useState } from "react";
import { AddPostModal } from "@/components/Modals/AddPost";


export default function Like() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    if (session) {
      getPosts("like", session?.token)
        .then((posts) => {
          setPosts(posts.results);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [session]);

  const addPost = () => {
    setModal(!modal);
  };



  return (
    <main>
      <div className="postHeader">
        <IoHeartOutline size={35} />

      </div>
      <div className="post-container">

        {posts?.map((post) => (
          <Post key={post.id} post={post} type='like' />
        ))}
      </div>
      <AddPostBtn onClick={addPost} type='like' />

      {modal && <AddPostModal onClick={addPost} type='like' />}



    </main>

  );

}
