import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
// import Search from "antd/es/transfer/search";
import Search from "antd/es/input/Input";
import postsData from "../Data/postsData";
import { Modal } from "antd";
import '../Style/global.css'

export default function Explore() {
	const navigate = useNavigate();
	const [arrData, setArrData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [hasSearched, setHasSearched] = useState(false);

	useEffect(() => {
		const encoded = localStorage.getItem('user')
		const data = JSON.parse(atob(encoded))
		document.title = `${data?.name} • Instagram`
	}, [])
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
	}, [navigate]);

	useEffect(() => {
		const codedData = localStorage.getItem('fetchedUsers');
		if (codedData) {
			try {
				const decodedData = JSON.parse(atob(codedData));

				if (decodedData && decodedData.users && Array.isArray(decodedData.users)) {
					const data = decodedData.users;
					setArrData(data);
					setFilteredData([]);
				} else {
					console.error('Decoded data is not an array', decodedData);
				}
			} catch (error) {
				console.error('Error decoding or parsing localStorage data:', error);
			}
		} else {
			console.error('No data found in localStorage');
		}
	}, []);

	useEffect(() => {
		if (hasSearched) {
			const filtered = arrData.filter(user =>
				user?.username.toLowerCase().includes(searchInput.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [searchInput, arrData, hasSearched]);

	const handleFilter = (e) => {
		setSearchInput(e.target.value);
		setHasSearched(true);
	};
	useEffect(() => {
		if (searchInput === '') {
			setHasSearched(false)
		}
	}, [handleFilter])

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const showModal = (img) => {
		setSelectedImage(img);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const randomPosts = () => {
		postsData.sort(() => 0.5 - Math.random())
		return postsData[0]
	}
	useEffect(() => {
		randomPosts();
	}, [])

	return (
		<Layout>
			<div className="mt-4 mx-10 z-10 fixed w-full">
				<Search placeholder="Search Accounts" className="p-2 w-4/6" onChange={handleFilter} enterButton allowClear />
				{hasSearched && filteredData.length > 0 ? (
					filteredData.map((user) => (
						<Link to={`/user/${user?.username}`} key={user?.id} className="flex items-center w-4/6 bg-white hover:bg-gray-50 p-2 border-gray-200 mb-1 shadow-md">
							<img
								className="w-10 h-10 rounded-full mr-2"
								src="https://placehold.co/32x32"
								alt="User Avatar"
							/>
							<div className="flex flex-col">
								<p className="font-bold text-sm">{user.username}</p>
								<p className="text-sm text-start text-gray-500">{user.name}</p>
							</div>
						</Link>

					))
				) : hasSearched ? (
					<p>No users found</p>
				) : (
					<></>
				)}
			</div>
			<div className="lg:mx-8 grid grid-cols-12 p-2 m-2 relative top-16">
				{postsData.map((item, index) => (
					<div key={index} className="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 p-2">
						<img
							src={item?.img}
							alt={`Image ${index + 1}`}
							className="h-full w-full object-cover cursor-pointer"
							onClick={() => showModal(item?.img)}
						/>
					</div>
				))}
				<Modal
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={null}
					centered
					closable={false}
				>
					{selectedImage && (
						<div className="grid grid-cols-12 gap-2">
							<div className="col-span-12">
								<img src={selectedImage} alt="Selected" className="w-full h-full object-cover " />
							</div>
						</div>
					)}
				</Modal>
			</div>
		</Layout>
	);
}