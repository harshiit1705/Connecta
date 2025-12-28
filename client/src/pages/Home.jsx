import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import CreatePost from "../components/post/CreatePost.jsx";
import PostFeed from "../components/post/Postfeed.jsx";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";



function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/posts")
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);


  const handleCreatePost = async (content) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/posts", 
        {
        id: user.id,
        author: user.name,
        content ,
        time: "just now" 
        }
      );
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