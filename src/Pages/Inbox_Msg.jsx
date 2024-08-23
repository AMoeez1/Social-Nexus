import React, { useEffect, useState } from 'react';
import Sm_Sidebar from "../Components/Sm_Sidebar";
import { RiMessengerLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import Account_Modal from './Account_Modal';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../Components/middlewares/Auth';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Messages() {
  // const [user, setUser] = useState([]);
  const encodedData = localStorage.getItem('user');
  const data = JSON.parse(atob(encodedData));

  useEffect(() => {
    document.title = `Chats • ${data?.name} (${data?.username})`
  }, [])
  return (
    <Auth>
      <div className="h-screen">
        <Header />
        <div className="grid grid-cols-12 bg-gray-100">
          <div className="md:col-span-1 hidden md:block">
            <Sm_Sidebar />
          </div>
          <div className="lg:col-span-3 col-span-11 border-r border-gray-300 px-5 md:pr-5 md:pl-0 overflow-y-auto">
            <div className="ml-2 py-8 flex justify-between">
              <Account_Modal />
              <FiEdit size={25} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img className="w-12 h-12 rounded-full" src="https://placehold.co/48x48" alt="Profile picture" />
                <p className='font-semibold'>{data?.name}</p>

              </div>
            </div>

            <Link to={'/direct/message'} className="mb-4">
              <h3 className="text-lg font-semibold text-black hidden md:block">Messages</h3>
              <div className="mt-2">
                <div className="flex items-center justify-between p-2 bg-white hover:bg-gray-200 cursor-pointer rounded-lg">
                  <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User profile picture" />
                    <div className="ml-2">
                      <h4 className="text-sm font-semibold hidden md:block">Chats</h4>
                      <p className="text-xs text-gray-400 hidden md:block">Moeezify is active</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 hidden md:block">57m</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="md:col-span-8 hidden  lg:flex justify-center items-center ">
            <div className="text-center ">
              <div className="flex justify-center pb-8">
                <div className="border-2 border-gray-700 rounded-full p-3">
                  <RiMessengerLine size={50} />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-black">Your messages</h2>
              <p className="text-sm text-gray-600">Send a message to start a chat.</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Send message</button>
            </div>
          </div>
        </div>
        <div className="block md:hidden bg-gray-100 h-screen fixed w-full" style={{ top: '91.5vh' }}>
          <Footer />
        </div>
      </div>
    </Auth>
  );
}
