import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import CreatePost from "../components/post/CreatePost.jsx";
import PostFeed from "../components/post/Postfeed.jsx";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts
      ? JSON.parse(savedPosts)
      : [
        {
          id: 1,
          author: "Mark",
          time: "1h",
          content: "Welcome to the Facebook."
        }
      ];
  });

  useEffect(() => {
  if (posts.length > 0) {
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}, [posts]);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      author: user.name,
      time: "just now",
      content: postData.content
    };

    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <MainLayout>
      <Sidebar />
      <section style={{ flex: 1, padding: "20px" }}>
        <CreatePost onCreate={handleCreatePost} />
        <PostFeed posts={posts} />
      </section>
    </MainLayout>
  )
}

export default Home;