import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Auth from '../Components/middlewares/Auth';
import { Link } from 'react-router-dom';

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


	return (
		<Auth>
			<Layout>
				<div className="max-w-4xl mx-auto p-4">
					<div className="flex items-center space-x-4">
						<div className="relative">
							<img className="w-24 h-24 rounded-full" src="https://placehold.co/100x100" alt="Profile picture" />
							<div className="absolute bottom-0 right-0 bg-zinc-200 rounded-full p-1">
								<img className="w-6 h-6" src="https://placehold.co/24x24?text=🖊️" alt="Edit icon" />
							</div>
						</div>
						<div>
							{/* <h1 className="text-2xl font-bold">moeezify</h1> */}
							<h2 className="text-2xl font-bold">{userData?.name}</h2>
							<p className="text-gray-500">@{userData?.username}</p>
							<div className="flex space-x-2 mt-2">
								<Link to={`/profile/edit/${userData?.username}`} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-1 px-3 rounded">Edit profile</Link>
								<button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-1 px-3 rounded">View archive</button>
								<button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-1 px-3 rounded">
									<img className="w-4 h-4" src="https://placehold.co/16x16?text=⚙️" alt="Settings icon" />
								</button>
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
						<p className="mt-2 mb-8 text-muted-foreground">
							<b>{userData?.name}</b><br />
							<span className='font-semibold'>Bio: </span>
							<span>{userData?.bio}</span> 	
						</p>
					</div>
					<hr />
					{/* <div className="mt-4 border-t">
						<div className="flex justify-center space-x-8 mt-2">
							<button className="text-primary-foreground border-b-2 border-primary pb-1">POSTS</button>
							<button className="text-muted-foreground pb-1">SAVED</button>
							<button className="text-muted-foreground pb-1">TAGGED</button>
						</div>
					</div> */}

					<div className="grid grid-cols-2 gap-4 mt-4">
						<div>
							<img className="w-80" src="https://placehold.co/300x300" alt="Post image 1" />
						</div>
						<div>
							<img className="w-80" src="https://placehold.co/300x300" alt="Post image 2" />
						</div>
					</div>
				</div>

			</Layout>
		</Auth>
	);
}
