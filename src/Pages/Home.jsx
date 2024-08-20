import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Auth from "../Components/middlewares/Auth";
import axiosReq from '../http';
import { BsHeartFill, BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { RiSaveFill, RiSaveLine } from "react-icons/ri";
import { Link, useNavigate, } from "react-router-dom";
import { message } from "antd";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import FollowButton from "../Components/FollowButton";
import postsData from "../Data/postsData";

export default function Home() {

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(atob(userData)) : null;
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    document.title = `${user?.name} • Instagram`
  }, []);

  const fetchUsers = async (values) => {
    try {
      const response = await axiosReq.get('/getData', { params: values });
      const data = response.data;
      const stringData = JSON.stringify(data);
      const codedData = btoa(stringData)
      localStorage.setItem('fetchedUsers', codedData);
      if (data && Array.isArray(data.users)) {
        const shuffledUsers = data.users.sort(() => .2 - Math.random());
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
    if (like == false) {
      message.success('Liked')
    } else {
      message.error('Unliked')
    }
  }

  const hanldeSave = () => {
    setSave(prevSave => !prevSave)
  }

  const randomPost = () => {
    postsData.sort(() => 0.5 - Math.random())
    return postsData[0];
  }

  useEffect(() =>{
    randomPost()
  },[])
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
          <div className="col-span-1"></div>
          <div className="md:col-span-7 lg:col-span-6 xl:col-span-4 col-span-11 mt-4 z-index-1 ">
            {postsData.map((item) => {
              return (
                <div className="card px-5 py-3 bg-white rounded-lg shadow-xl mt-4" >
                  <div className="flex items-center">
                    <img
                      className=" rounded-full mr-3 w-10 h-10"
                      src={item.img}
                      alt="Profile Picture"
                    />
                    <Link className="font-semibold" to={item.href}>{item?.model}</Link>
                    <div className=" ml-auto">
                      <BsThreeDots />
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <img
                      className="rounded-lg mb-4"
                      src={item.img}
                      alt="Meme Image"
                    />
                  </div>
                  <p className="font-serif">{item?.desc}</p>
                  <div className="flex gap-8">
                    <div className="flex items-center cursor-pointer" onClick={handleLike}>
                      {like ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                      <p className="px-2 text-sm font-semibold" >{like ? 100 : 99}</p>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <FaRegComment size={20} />
                      <p className="px-2 text-sm font-semibold">25</p>

                    </div>
                    <div onClick={hanldeSave} className="ml-auto mb-2 cursor-pointer transition ease-in-out delay-150">
                      {save ? <RiSaveLine size={25} /> : <RiSaveFill size={25} />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col-span-1"></div>
          <div className="card lg:col-span-4 lg:mt-20 pl-8 hidden xl:block relative left-20">
            <ul className="border-l p-4">
              <div className="flex bg-white hover:bg-gray-50 p-2 border-gray-200 shadow-lg">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src="https://placehold.co/32x32"
                  alt="User Avatar"
                />
                <Link to={`/profile/${user?.username}`} className="flex flex-col">
                  <p className="font-bold text-sm">{user.username}</p>
                  <p className="text-sm text-start text-gray-500">{user.name}</p>
                </Link>
                <button className="ml-auto hover:bg-gray-200 text-sm py-1 px-2 rounded">Switch</button>
              </div>
              <div className="flex justify-between items-center">

                <p className="py-3 font-semibold">Suggested For You</p>
                {/* <Link to='/explore/people' className="text-sm text-blue-600 hover:underline">See All</Link> */}
              </div>
              {users && users.slice(0, 5) && users.map((item) => {
                return (
                  <Link to={`/user/${item?.username}`} key={item?.id} className="flex items-center bg-white hover:bg-gray-50 p-2 border-gray-200 mb-1 shadow-md">
                    <img
                      className="w-10 h-10 rounded-full mr-2"
                      src="https://placehold.co/32x32"
                      alt="User Avatar"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">{item.username}</p>
                      <p className="text-sm text-start text-gray-500">{item.name}</p>
                    </div>
                    <button className="ml-auto bg-gray-800 text-white hover:bg-gray-900 text-sm py-1 px-2 rounded shadow-lg">Follow</button>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    </Auth >
  )
}
