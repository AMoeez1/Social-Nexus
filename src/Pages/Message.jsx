import React, { useEffect } from 'react'
import Sm_Sidebar from '../Components/Sm_Sidebar'
import Chats from '../Components/Chats'
import Account_Modal from './Account_Modal'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'

export default function Message() {
	const navigate = useNavigate()
	useEffect(() => {
		const token = JSON.stringify(localStorage.getItem('token'))
		if (!token) {
			navigate('/')
		}
	}, [])
	return (
		<div className="grid grid-cols-12 h-screen bg-gray-100 w-screen">
			<div className="col-span-1 hidden md:block">
				<Sm_Sidebar />
			</div>
			<div className="hidden lg:block md:col-span-3 col-span-2 border-r border-gray-300 px-5 md:pr-5 md:pl-0 overflow-y-auto">
				<div className="ml-2 py-8 flex justify-between">
					<Account_Modal />
					<FiEdit size={25} />
				</div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<img className="w-12 h-12 rounded-full" src="https://placehold.co/48x48" alt="Profile picture" />
					</div>
				</div>

				<div className="mb-4">
					<h3 className="text-lg font-semibold text-black">Messages</h3>
					<div className="mt-2">
						<div className="flex bg-white items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded-lg">
							<div className="flex items-center ">
								<img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User profile picture" />
								<div className="ml-2">
									<h4 className="text-sm font-semibold text-black hidden md:block">Chats</h4>
									<p className="text-xs text-gray-600 hidden md:block">Moeezify is active</p>
								</div>
							</div>
							<span className="text-xs text-gray-600 hidden md:block">57m</span>
						</div>
					</div>
				</div>
			</div>
			<div className="lg:col-span-8 md:col-span-11 col-span-12 flex justify-center items-center">
				<Chats />
			</div>
			<div className="block md:hidden bg-gray-800 text-gray-300 h-screen fixed w-full" style={{ top: '91.5vh' }}>
				<Footer />
			</div>
		</div>

	)
}
