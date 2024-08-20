import React, { useEffect } from 'react';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom';

const Reels = () => {
    const navigate = useNavigate()
    useEffect(() =>{
        const token = JSON.stringify(localStorage.getItem('token'))
        if (!token){
            navigate('/')
        }
    },[])
    return (
        <Layout>
            <div className="max-w-sm mx-auto bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                    <img src="https://placehold.co/400x600" alt="social media post background" className="w-full h-auto" />
                    <div className="absolute top-2 right-2">
                          <button className="bg-black bg-opacity-50 text-white rounded-full p-2">
                            <img aria-hidden="true" alt="mute-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔇" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center space-x-2">
                        <img src="https://placehold.co/40x40" alt="user profile" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">Moeezify</span>
                        <button className="ml-auto bg-primary text-primary-foreground px-3 py-1 rounded-md">Follow</button>
                    </div>
                    <p className="mt-2 text-muted-foreground">Desc....</p>
                    <div className="mt-2 flex items-center space-x-2">
                        <img aria-hidden="true" alt="music-note" src="https://openui.fly.dev/openui/24x24.svg?text=🎵" />
                        <span>Djo - End of Beginning</span>
                    </div>
                </div>
                <div className="flex justify-around py-2 border-t border-border">
                    <div className="flex items-center space-x-1">
                        <img aria-hidden="true" alt="heart-icon" src="https://openui.fly.dev/openui/24x24.svg?text=❤️" />
                        <span>51.2K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <img aria-hidden="true" alt="comment-icon" src="https://openui.fly.dev/openui/24x24.svg?text=💬" />
                        <span>1,040</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <img aria-hidden="true" alt="share-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📤" />
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Reels;
