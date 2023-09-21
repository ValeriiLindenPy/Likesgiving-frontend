"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/get-posts";
import { useSession } from "next-auth/react";
import { Post } from "@/components/Posts";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { AddPostBtn } from "@/components/AddPostButton/PostButton";
import { AddPostModal } from "@/components/Modals/AddPost";

export default function Dislike() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (session) {
      // Fetch posts when the session is available
      getPosts("dislike", session.token)
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
    <main
      style={{
        backgroundColor: "#131313",
        color: "white",
        height: "100%",
      }}
    >
      <div className="postHeaderDislike">
        <IoHeartDislikeOutline size={35} color="white" />
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} type="dislike" />
        ))}
      </div>
      <AddPostBtn onClick={addPost} type="dislike" />
      {modal && <AddPostModal onClick={addPost} type='dislike' />}
    </main>
  );
}
