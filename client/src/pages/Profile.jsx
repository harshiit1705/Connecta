import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import api from "../api/axios";
import PostCard from "../components/common/PostCard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Profile.css";

const Profile = () => {
    const { userId } = useParams();
    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const res = await api.get(`/api/v1/users/${userId}`);
            setProfile(res.data);

            if (user) {
                setIsFollowing(
                    res.data.followers.some(f => f._id === user._id)
                );
            }
        } catch (error) {
            console.log("failed to load profile ", error);
        }
    };

    const loadPosts = async () => {
        try {
            const res = await api.get(`/api/v1/users/${userId}/posts`);
            setPosts(res.data);
        } catch (error) {
            console.log("failed to load posts ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await api.delete(`/api/v1/users/${userId}/follow`);
                setIsFollowing(false);
                setProfile(prev => ({
                    ...prev,
                    followers: prev.followers.filter(f => f._id !== user._id)
                }));
            }
            else {
                await api.post(`/api/v1/users/${userId}/follow`);
                setIsFollowing(true);
                setProfile(prev => ({
                    ...prev,
                    followers: [...prev.followers, user]
                }));
            }
        } catch (error) {
            console.log("follow action failed");
        }
    }

    const handleAvatarChange = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        const res = await api.put("/api/v1/auth/avatar", formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        
        setProfile(prev => ({
            ...prev, avatar: res.data.avatar,
        }));
    }

    useEffect(() => {
        loadProfile();
        loadPosts();
    }, [userId]);

    if (loading || !profile) {
        return <p>Loading profile...</p>;
    }

    const isOwnProfile = user?._id === profile._id;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-header-left">
                    <div className="avatar-wrapper">
                        <img
                            src={profile.avatar?.url || "/default_avatar.png"}
                            alt="Profile Avatar"
                            className="avatar-edit-btn"
                        />
                        {isOwnProfile && (
                            <>
                                <label htmlFor="fileUpload"
                                    className="avatar-edit-btn">
                                    +
                                </label>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </>
                        )}

                    </div>
                </div>

                <div className="profile-header-right">
                    <h2>{profile.name}</h2>
                    <p className="bio">{profile.bio}</p>
                    </div>

                    <div className="follow-stats">
                        <span>{profile.followers.length} Followers</span>
                        <span>{profile.following.length} Following</span>
                    </div>

                    <div className="profile-action">
                        {isOwnProfile ? (
                            <button>Edit Profile</button>
                        ) : (
                            <button onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</button>
                        )}
                    </div>
                </div>

                <div>
                    {posts.length === 0 ? (
                        <p>No posts yet</p>
                    ) : (
                        posts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))
                    )}
                </div>
            </div>
            )
}

            export default Profile;