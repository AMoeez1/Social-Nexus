import { useEffect } from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

export default function Explore() {
    const navigate = useNavigate()
    useEffect(() =>{
        const token = JSON.stringify(localStorage.getItem('token'))
        if (!token){
            navigate('/')
        }
    },[])
    const imageUrls = [
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300",
        "https://placehold.co/300x300"
    ];

    return (
        <Layout>
            <input type="text" className="border-2 w-full p-2" placeholder="Search Accounts, Post or Tags" />
            <div className="grid grid-cols-12 p-2 m-2">
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} className="relative col-span-3 p-2">
                        <img src={imageUrl} alt={`Image ${index + 1}`} className="h-full w-full object-cover" />
                        <div className="absolute top-1 right-1 bg-white rounded-full p-1">
                            <img src="https://openui.fly.dev/openui/24x24.svg?text=📷" alt="camera-icon" aria-hidden="true" />
                        </div>
                    </div>
                ))}
            </div>

        </Layout>
    );
}
