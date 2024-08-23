import React, { useEffect } from 'react'
import Auth from '../Components/middlewares/Auth'
import Layout from '../Components/Layout'
import { Link, useParams } from 'react-router-dom';
import postsData from '../Data/postsData';
import { BiCamera } from 'react-icons/bi';
import { IoCamera, IoCameraOutline } from 'react-icons/io5';
import { CiCamera } from 'react-icons/ci';
import { SlUser, SlUserFemale } from 'react-icons/sl';

export default function Other_Profile() {
	const encodedData = localStorage.getItem('fetchedUsers');
	const data = JSON.parse(atob(encodedData));

	const { username } = useParams();
	const user = data.users.find((user) => user.username === username);

	useEffect(() => {
		document.title = `${user?.name} (${user?.username}) • Instagram`
	}, [])

	return (
		<Auth>
			<Layout>
				<div className="max-w-4xl mx-auto p-4">
					<div className="flex items-center space-x-4">
						<div className="relative">
						<div className="border-2 rounded-full p-6">
								{user && user.gender == 'Female' ?
									<SlUserFemale size={70} /> : <SlUser size={70} />
								}
							</div>
							{/* <img className="w-24 h-24 rounded-full" src="https://placehold.co/100x100" alt="Profile picture" /> */}
							<div className="absolute bottom-0 right-0 bg-zinc-200 rounded-full p-1">
								<img className="w-6 h-6" src="https://placehold.co/24x24?text=🖊️" alt="Edit icon" />
							</div>
						</div>
						<div>
							<h2 className="text-2xl font-bold">{user?.name}</h2>
							<p className="text-gray-500">@{user?.username}</p>
							<div className="flex space-x-2 mt-2">
								<button className="bg-blue-500 text-white hover:bg-secondary/80 py-1 px-3 rounded">Follow</button>
							</div>
						</div>
					</div>

					<div className="mt-4">
						<div className="flex space-x-4">
							<div>
								<span className="font-bold">0</span> posts
							</div>
							<div>
								<span className="font-bold">277</span> followers
							</div>
							<div>
								<span className="font-bold">91</span> following
							</div>
						</div>
						<p className="mt-2 mb-8 text-muted-foreground">
							<b>{user?.name}</b><br />
							<span className='font-semibold'>Bio: </span>
							<span>{user?.bio}</span>
						</p>
					</div>
					<hr />
					<div className="grid grid-cols-2 gap-4 mt-4 h-full">
						{/* <div >
							<img className="w-80" src='' alt="Post image 1" />
						</div> */}
					</div>
					<div className="flex justify-center items-center gap-4 mt-24">
						<div className="p-4 border-2 border-black rounded-full">
							<CiCamera size={50} />
						</div>
						<p className='text-2xl'>No Posts Yet</p>
					</div>
				</div>
			</Layout>
		</Auth>
	)
}
