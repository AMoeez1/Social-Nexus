import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Auth from '../Components/middlewares/Auth';
import { Link } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
// import Jordan from '../assets/Profile/Jordan1'
import postsData from '../Data/postsData';
import { BiEdit } from 'react-icons/bi';
import { SlUser, SlUserFemale } from 'react-icons/sl';
export default function Profile() {
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				const user = JSON.parse(atob(storedUser));
				setUserData(user);
				// console.log(user);
			} catch (error) {
				console.error('Failed to parse user data from localStorage:', error);
			}
		}
	}, []);
	useEffect(() => {
		if (userData && userData.name && userData.username) {
			document.title = `${userData.name} (${userData.username}) • Instagram`;
		}
	}, [userData]);
	return (
		<Auth>
			<Layout>
				<div className="max-w-4xl mx-auto p-4">
					<div className="flex items-center space-x-4" >
						<div className="relative">
							{/* <img className="w-24 h-24 rounded-full" src="https://placehold.co/100x100" alt="Profile picture" /> */}
							<div className="border-2 rounded-full p-6">
								{userData && userData.gender == 'Female' ?
									<SlUserFemale size={60}/> : <SlUser size={70} />
								}
							</div>
							{/* <img className="w-20 md:w-32 h-20 md:h-32 rounded-full object-contain" src={profile} alt="Profile picture" /> */}
							<div className="absolute bottom-0 right-0 bg-zinc-200 rounded-full p-1">
								{/* <img className="w-6 h-6" src="https://placehold.co/24x24?text=🖊️" alt="Edit icon" /> */}
							</div>
						</div>
						<div>
							{/* <h1 className="text-2xl font-bold">moeezify</h1> */}
							<h2 className="text-lg md:text-xl text-start font-semibold flex items-center gap-1 cursor-pointer">{userData?.username}<GoVerified className='text-blue-800' /> </h2>
							<div className="flex gap-2">
								<p className="text-sm	md:text-md text-gray-500 text-start">{userData?.name}</p>
								<Link to={`/profile/edit/${userData?.username}`} className='block md:hidden'><BiEdit size={20} /></Link>

							</div>
							<div className="flex space-x-2 mt-2">
								{/* <a href='/profile/moeezify'>Edit Profile</a> */}
								<Link to={`/profile/edit/${userData?.username}`} className="bg-white text-secondary-foreground hover:bg-gray-50 py-1 px-3 rounded hidden md:block">Edit profile</Link>
								<button className="bg-white text-secondary-foreground hover:bg-gray-50 py-1 px-3 rounded hidden md:block">View archive</button>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<div className="flex space-x-4">
							<div>
								<span className="font-bold">2</span> posts
							</div>
							<div>
								<span className="font-bold">277</span> followers
							</div>
							<div>
								<span className="font-bold">91</span> following
							</div>
						</div>
						<p className="mt-2 text-start mb-8 text-muted-foreground">
							<b>{userData?.name}</b><br />
							<span className='font-semibold'>Bio: </span>
							<span>{userData?.bio}</span>
						</p>
					</div>
					<hr />

					<div className="grid grid-cols-2 gap-4 mt-4">
						{data.map((item) => {
							<div>
								<img className="w-80" src={item?.img} alt="Post image 1" />
								{data?.model}
							</div>
						})}
					</div>
				</div>

			</Layout>
		</Auth>
	);
}
