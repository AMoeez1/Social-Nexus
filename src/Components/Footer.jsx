import { Dropdown, message, Popconfirm, Space } from 'antd'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { MdHomeFilled, MdMenu, MdOutlineExplore } from 'react-icons/md'
import { SiMessenger } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
	const encodedData = localStorage.getItem('user');
	const user = JSON.parse(atob(encodedData));
	const Navigate = useNavigate('')

	const confirm = () =>
		new Promise((resolve) => {
			setTimeout(() => resolve(null), 3000);
			localStorage.removeItem('user');
			localStorage.removeItem('fetchedUsers')
			localStorage.removeItem('token')
		}).then(() => {
			Navigate('/');
			message.error('Logged Out');
		});

	const items = [
		{
			label: (
				<Link className='flex items-center gap-2'>
					<IoSettings size={20} />
					Setting
				</Link>
			),
			key: '0',
		},
		{
			type: 'divider',
		},
		{
			label: (
				<Popconfirm
					title="Log Out"
					className="flex items-center gap-2"
					description="Are You Sure, You want to log out"
					onConfirm={confirm}
				>
					<LuLogOut size={20} />
					Log out
				</Popconfirm>
			),
			key: '1',
		},
	];
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
	return (
		<div className="container block sm:hidden" >
			<ul className='flex items-center justify-between gap-16 py-2 px-8'>
				<li>
					<Link to={'/'}>
						<MdHomeFilled
							size={25} />
					</Link>
				</li>
				<li>
					<Link to={'/explore'}>
					<MdOutlineExplore size={25} />
					</Link>
				</li>
				<li>
					<Link to={'/direct/inbox'}>
						<SiMessenger size={22} />
					</Link>
				</li>
				<li>
					<Link to={'/create/post'}>
						<IoMdAddCircleOutline size={28} />
					</Link>
				</li>
				<li>
					<Link to={`/profile/${user?.username}`}>
						<FaUser size={20} />
					</Link>
				</li>
				<li>
				{contextHolder}
				<Popconfirm
					title="Log Out"
					className=" flex items-center gap-2 text-white font-semibold"
					description="Are You Sure, You want to log out"
					onConfirm={success}
				>
					<LuLogOut size={20} />
				</Popconfirm>
				</li>
			</ul>
		</div>
	)
}

export default Footer