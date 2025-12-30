import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import CreatePost from "../components/post/CreatePost.jsx";
import PostFeed from "../components/post/Postfeed.jsx";
import api from "../api/axios.js";


function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/api/v1/posts")
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);


  const handleCreatePost = async (content) => {
    try {
      const res = await api.post("/api/v1/posts", { content });
      setPosts(prev => [res.data, ...prev]);
    } catch (error) {
      console.log("Failed to create post", error);
    }
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