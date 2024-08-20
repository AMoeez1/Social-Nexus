import React from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { BsEmojiAngry, BsEmojiDizzy } from 'react-icons/bs';
import { FcGallery } from 'react-icons/fc';
import { GrGallery } from 'react-icons/gr';
import { IoCall } from 'react-icons/io5';

const Chat = () => (
  <div className="flex flex-col h-screen w-screen bg-background text-foreground">
    <div className="flex items-center p-4 border-b border-border">
      <img src="https://placehold.co/40x40" alt="User avatar" className="rounded-full" />
      <div className="ml-2">
        <div className="font-semibold">User's Name</div>
        <div className="text-sm text-muted-foreground">Active</div>
      </div>
      <div className="ml-auto flex space-x-4">
        <button className="text-muted-foreground hover:text-foreground">
            <IoCall size={25}/>
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=ℹ️" alt="Info icon" />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-start space-x-2">
        <img src="https://placehold.co/40x40" alt="User avatar" className="rounded-full" />
        <div>
          <div className="bg-card p-2 rounded-lg shadow-lg bg-white text-primary-foreground">
            <p className='pb-1'>Message send by someone else</p>
            </div>
        </div>
      </div>
      <div className="flex items-start space-x-2 justify-end">
        <div>
          <div className="bg-primary flex items-center bg-blue-500 text-white p-2 gap-4 rounded-lg shadow-lg">
          {/* <img src="https://placehold.co/40x40" alt="User avatar" className="rounded-full" /> */}
            <p >Message Send by me</p>
          </div>
        </div>
      </div>
    </div>

    <div className="py-4 px-2 border-t border-border gap-8 flex items-center fixed bottom-12 md:bottom-0 w-full md:w-5/6 xl:w-4/6">
        <BsEmojiAngry size={25}/>
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 p-2 border border-input rounded-lg focus:outline-none focus:ring focus:ring-primary"
      />
      <BiMicrophone size={25}/>
      <GrGallery size={20}/>
    </div>
  </div>
);

export default Chat;
;