import React, { useState } from 'react';
import axios from 'axios';
import axiosReq from '../http';

const FollowButton = ({ userId, isFollowing }) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = async () => {
        try {
            const response = await axiosReq.post('/follow', { following_id: userId });
            if (response.status === 200) {
                setFollowing(true);
            }
        } catch (error) {
            console.error('Failed to follow user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await axios.post('/unfollow', { following_id: userId });
            if (response.status === 200) {
                setFollowing(false);
            }
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
    };

    return (
        <button onClick={following ? handleUnfollow : handleFollow}>
            {following ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;