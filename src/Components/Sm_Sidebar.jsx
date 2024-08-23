import { Dropdown, message, Popconfirm, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaInstagram, FaRegHeart, FaUser } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { LuLogOut, LuMenu } from 'react-icons/lu';
import { MdHomeFilled, MdMenu, MdOutlineExplore } from 'react-icons/md';
import { SiMessenger } from 'react-icons/si';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function Widget() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const username = JSON.parse(atob(localStorage.getItem('user')));
        setUser(username)
    }, [])

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Logging Out',
                duration: 1,
            })
            .then(() => {
                localStorage.clear();
                message.success('Logged Out Successfully', 2)
                Navigate('/')
            })
    };

    const sidebar = [
        {
            id: 1,
            title: 'Home',
            icon: <MdHomeFilled size={25} />,
            href: '/home'
        },
        {
            id: 3,
            title: 'Search',
            icon: <MdOutlineExplore size={25} />,
            href: '/explore'
        },
        {
            id: 4,
            title: 'Reels',
            icon: <TbPlayerPlayFilled size={25} />,
            href: '/reels'
        },
        {
            id: 5,
            title: 'Messages',
            icon: <SiMessenger size={22} />,
            href: '/direct/inbox'
        },
        {
            id: 7,
            title: 'Create',
            icon: <IoMdAddCircleOutline size={22} />,
            href: '/create/post'
        },
        {
            id: 8,
            title: 'Profile',
            icon: <FaUser size={25} />,
            href: `/profile/${user?.username}`
        },
    ];

    const items = [
        {
            label: (
                <Link className='flex items-center gap-2' to={'/'}>
                    {/* <IoSettings size={20} /> */}
                    Setting
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link className='flex items-center gap-2' to={'/home'}>
                    <LuLogOut size={20} />
                    Log out
                </Link>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link className='flex items-center gap-2' to={'/home'}>
                    <LuLogOut size={20} />
                    Log out
                </Link>
            ),
            key: '2',
        },
    ];
    return (
        <div className="flex items-center fixed">
            <ul className='bg-gray-100 border-r-2 h-screen'>
                <li className="nav-item pb-8">
                    <Link to='/' className="nav-link flex justify-center py-[20px]">
                        <FaInstagram size={25} />
                    </Link>
                </li>
                {sidebar.map((item) => (
                    <li key={item.id} className='py-4 px-5 mx-2 hover:bg-gray-200'>
                        <Link to={item.href}>
                            {item.icon}
                            <span className="sr-only">{item.title}</span>
                        </Link>
                    </li>
                ))
                }

{contextHolder}
					<Popconfirm
						title="Log Out"
						className="mt-10 flex items-center mx-6 gap-2 font-semibold cursor-pointer"
						description="Are You Sure, You want to log out"
						onConfirm={success}
					>
						<LuLogOut size={25} />
					</Popconfirm>
            </ul>
        </div >
    );
}
