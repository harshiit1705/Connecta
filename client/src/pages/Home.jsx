import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import CreatePost from "../components/post/CreatePost.jsx";
import PostFeed from "../components/post/Postfeed.jsx";
import api from "../api/axios.js";
import PostCard from "../components/common/PostCard.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState((null));

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
  
  const handleDeletePost = async(id) => {
    try {
      const res = await api.delete(`/api/v1/posts/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id))
    } catch (error) {
      console.log("Failed to delete post! ",error);
    }
  };

  // const handleEditPost = (post) => {
  //   setEditingPost(post);
  // };

  const handleUpdatePost = async(id, content) => {
    try {
      const res = await api.patch(`/api/v1/posts/${id}`, { content });
  
      setPosts(prev => prev.map(p => (p._id == id ? res.data : p)));
      setEditingPost(null);
    } catch (error) {
      console.log("Failed to update post", error);
    }
  };

  return (
    <MainLayout>
      <Sidebar />
      <section style={{ flex: 1, padding: "20px" }}>
        <CreatePost 
        onCreate={handleCreatePost}
        onUpdate={handleUpdatePost}
        editingPost={editingPost}
        cancelEdit={() => setEditingPost(null)}
        />
        <PostFeed 
        posts={posts}
        onEdit={setEditingPost}
        onDelete={handleDeletePost} 
        />
      </section>
    </MainLayout>
  )
}

export default Home;