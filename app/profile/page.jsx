"use client"

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

export default function MyProfile() {
    const router = useRouter();

    const { data: session } = useSession()
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((item) => item._id !== post._id);

                setPosts(filteredPosts);
                router.push('/');
            } catch (error) {
                console.log(error);
            }
        }
    }
    console.log(posts,"posts.........")
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
