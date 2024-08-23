import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Auth from "../Components/middlewares/Auth";
import axiosReq from '../http';
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { RiSaveFill, RiSaveLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { message } from "antd";
import Data from "../Data/postsData";
import ScrollToTop from "../Components/ScrollToTop";
import jordan from '../assets/Profile/JORDAN9.jfif'
import jordan1 from '../assets/Profile/JORDAN_06.jpg'
import jordan2 from '../assets/Profile/JORDAN4.jpg'
import jordan3 from '../assets/Profile/JORDAN2.jpg'
import jordan4 from '../assets/Profile/JORDAN7.jpg'
import jordan5 from '../assets/Profile/JORDAN10.jpg'


export default function Home() {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(atob(userData)) : null;
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [users, setUsers] = useState([]);
  const [follow, setFollow] = useState({});

  useEffect(() => {
    fetchUsers();
    document.title = `${user?.name} • Instagram`;
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosReq.get('/getData');
      const data = response.data;
      const stringData = JSON.stringify(data);
      const codedData = btoa(stringData);
      localStorage.setItem('fetchedUsers', codedData);
      if (data && Array.isArray(data.users)) {
        const shuffledUsers = data.users.sort(() => Math.random() - 0.5);
        const selectedUsers = shuffledUsers.slice(0, 5);
        setUsers(selectedUsers);
      } else {
        console.error('Invalid data format received from API:', data);
      }
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handleLike = () => {
    setLike(prevLike => !prevLike);
    if (!like) {
      message.success('Liked');
    } else {
      message.error('Unliked');
    }
  };

  const handleSave = () => {
    setSave(prevSave => !prevSave);
  };

  const randomPost = () => {
    Data.sort(() => Math.random() - 0.5);
    return Data[0];
  };

  useEffect(() => {
    randomPost();
  }, []);

  const handleFollow = (username) => {
    setFollow(prevFollow => {
      const isCurrentlyFollowing = prevFollow[username];
      const newFollowState = !isCurrentlyFollowing;

      return {
        ...prevFollow,
        [username]: newFollowState,
      };
    });

    const isCurrentlyFollowing = follow[username];
    const newFollowState = !isCurrentlyFollowing;

    if (newFollowState) {
      message.success(`Started Following ${username}`);
    } else {
      message.error(`Unfollowed ${username}`);
    }
  };
  const profile = [
    jordan,
    jordan1,
    jordan2,
    jordan3,
    jordan4,
    jordan5
  ];

  return (
    <ScrollToTop>
      <Auth>
        <Layout>
          <div className="grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="md:col-span-7 lg:col-span-6 xl:col-span-4 col-span-11 mt-4 z-index-1">
              {Data?.map((item) => (
                <div className="card px-5 py-3 bg-white rounded-lg shadow-xl mt-4" key={item.id}>
                  <div className="flex items-center">
                    <img className="rounded-full mr-3 w-10 h-10" src={item.img} alt="Profile Picture" />
                    <Link className="font-semibold" to={item.href}>{item?.model}</Link>
                    <div className="ml-auto">
                      <BsThreeDots />
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <img className="rounded-lg mb-4" src={item.img} alt="Meme Image" />
                  </div>
                  <p className="font-serif">{item?.desc}</p>
                  <div className="flex gap-8">
                    <div className="flex items-center cursor-pointer" onClick={handleLike}>
                      {like ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                      <p className="px-2 text-sm font-semibold">{like ? 100 : 99}</p>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <FaRegComment size={20} />
                      <p className="px-2 text-sm font-semibold">25</p>
                    </div>
                    <div onClick={handleSave} className="ml-auto mb-2 cursor-pointer transition ease-in-out delay-150">
                      {save ? <RiSaveLine size={25} /> : <RiSaveFill size={25} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1"></div>
            <div className="card lg:col-span-4 lg:mt-20 pl-8 hidden xl:block relative left-20">
              <ul className="border-l p-4">
                <div className="flex bg-white hover:bg-gray-50 p-2 border-gray-200 shadow-lg">
                  <img className="w-10 h-10 rounded-full mr-2" src={jordan} alt="User Avatar" />
                  <Link to={`/profile/${user?.username}`} className="flex flex-col">
                    <p className="font-bold text-sm">{user.username}</p>
                    <p className="text-sm text-start text-gray-500">{user.name}</p>
                  </Link>
                  <button className="ml-auto hover:bg-gray-200 text-sm py-1 px-2 rounded">Switch</button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="py-3 font-semibold">Suggested For You</p>
                </div>
                {users.map((item, index) => (
                  <div key={item?.id} className="flex items-center bg-white hover:bg-gray-50 p-2 border-gray-200 mb-1 shadow-md">
                    <Link to={`/user/${item?.username}`} className="flex">
                      <img className="w-10 h-10 rounded-full mr-2" src={profile[index % profile.length]} alt="User Avatar" />
                      <div className="flex flex-col">
                        <p className="font-bold text-sm">{item.username}</p>
                        <p className="text-sm text-start text-gray-500">{item.name}</p>
                      </div>
                    </Link>
                    <button
                      className="ml-auto bg-gray-800 text-white hover:bg-gray-900 text-sm py-1 px-2 rounded shadow-lg"
                      onClick={() => handleFollow(item?.username)}
                    >
                      {follow[item?.username] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </Layout>
      </Auth>
    </ScrollToTop>
  );
}
