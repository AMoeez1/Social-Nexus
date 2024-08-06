import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Auth from "../Components/middlewares/Auth";
import axiosReq from '../http';
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { RiSaveFill, RiSaveLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Space } from "antd";
import { FaSquarePen } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
export default function Home() {

  const userData = localStorage.getItem('user');
  const navigate = useNavigate('');
  const user = userData ? JSON.parse(atob(userData)) : null;
  if (!user) {
    navigate('/');
  }
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (values) => {
    try {
      const response = await axiosReq.get('/getData', { params: values });
      const data = response.data;
      const stringData = JSON.stringify(data);
      const codedData = btoa(stringData)
      localStorage.setItem('fetchedUsers', codedData);
      if (data && Array.isArray(data.users)) {
        const shuffledUsers = data.users.sort(() => 0.5 - Math.random());
        const selectedUsers = shuffledUsers.slice(0, 5);
        setUsers(selectedUsers);
      } else {
        console.error('Invalid data format received from API:', data);
      }
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };
  const [save, setSave] = useState(false)
  const hanldeSave = () => {
    setSave(prevSave => !prevSave)
  }
  return (
    <Auth>
      <Layout>
        {/* <div className="bg-white text-foreground min-h-screen flex flex-col items-center"> */}
        {/* <div className="flex space-x-4 overflow-x-hiddden py-4 px-2 border-b border-border w-full">
            {Array.from({ length: 7 }).map((_, index) => (
              <div className="flex-shrink-0" key={index}>
                <img
                  className="w-16 h-16 rounded-full border-2 border-primary"
                  src={`https://placehold.co/64x64`}
                  alt={`User ${index + 1}`}
                />
              </div>
            ))}
          </div> */}
        {/* <div className="grid grid-cols-4 md:mt-10 mx-4 md:mx-10 ">
          <div className="p-4 bg-background rounded-lg shadow-md col-span-3 md:col-span-3">
            <Space className="flex md:gap-20 space-x-4 mb-4">
              <Button type="primary" icon={<FaSquarePen />} shape="round">
                Write a post
              </Button>
              <Button type="primary" icon={<GrGallery />} shape="round">
                Upload photo
              </Button>
            </Space>
            <Input.TextArea
              style={{ height: 80 }}
              className="w-full p-2 border border-border rounded-lg bg-muted text-muted-foreground"
              rows={4}
              placeholder="Write something here..."
            />
          </div>
        </div> */}
        <div className="grid grid-cols-12">

          <div className="md:col-span-1"></div>
          <div className="card md:col-span-4 col-span-10 md:mt-20 mt-4">
            <div className="flex items-center ml-0">
              <img
                className=" rounded-full mr-3"
                src="https://placehold.co/40x40"
                alt="Profile Picture"
              />
              <p className="font-semibold">{user?.username}</p>

              <div className=" ml-auto">
                <BsThreeDots />
              </div>
            </div>
            <div className="mt-3">
              <img
                className="rounded-lg mb-4" style={{ width: '380px' }}
                src="https://placehold.co/500x500"
                alt="Meme Image"
              />
            </div>
            <div className="flex gap-8 px-4">
              <div className="flex cursor-pointer">
                <FaRegHeart size={20} />
                <p className="px-2 text-sm font-semibold">1000</p>
              </div>
              <div className="flex cursor-pointer">
                <FaRegComment size={20} />
                <p className="px-2 text-sm font-semibold">25</p>

              </div>
              <div onClick={hanldeSave} className="ml-auto cursor-pointer transition ease-in-out delay-150">
                {save ? <RiSaveLine size={25} /> : <RiSaveFill size={25} />}
              </div>
            </div>

          </div>

          <div className="col-span-1">

          </div>
          <div className="card col-span-4 mt-20 pl-8 hidden md:block">
            <ul className="border-l p-4">
              <div className="flex items-center border-gray-200 py-1 w-full">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src="https://placehold.co/32x32"
                  alt="User Avatar"
                />
                <Link to={`/profile/${user?.username}`} className="flex flex-col">
                  <p className="font-bold text-sm">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.name}</p>
                </Link>
                <button
                  className="ml-auto hover:bg-gray-200 text-sm py-1 px-2 rounded"
                >
                  Switch
                </button>
              </div>
              <div className="flex justify-between items-center">

                <p className="py-3 font-semibold">Suggested For You</p>
                <Link to='/explore/people' className="text-sm text-blue-600 hover:underline">See All</Link>
              </div>
              {users && users.slice(0, 5) && users.map((item) => {
                return (
                  <li key={item.id} className="flex items-center justify-between mb-2">
                    <Link to={`/user/${item.username}`}>
                      <div className="flex items-center border-gray-200 py-1 w-full">
                        <img
                          className="w-10 h-10 rounded-full mr-2"
                          src="https://placehold.co/32x32"
                          alt="User Avatar"
                        />
                        <div className="flex flex-col">
                          <p className="font-bold text-sm">{item.username}</p>
                          <p className="text-sm text-gray-500">{item.name}</p>
                        </div>
                        <button
                          className="ml-auto hover:bg-gray-200 text-sm py-1 px-2 rounded"
                        >
                          Follow
                        </button>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {/* </div> */}
      </Layout>
    </Auth >

  )
}
