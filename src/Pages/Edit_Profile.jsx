import React, { useEffect, useState } from 'react';
import Auth from '../Components/middlewares/Auth';
import Layout from '../Components/Layout';
import { Button, Form, Input, message, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axiosReq from '../http';
import { useNavigate } from 'react-router-dom';

export default function Edit_Profile() {
	const [registerForm] = useForm();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState({});
	const navigate = useNavigate()

	const handleData = () => {
		return new Promise((resolve) => {
			const data = JSON.parse(atob(localStorage.getItem('user')));
			setUser(data);
			resolve();
		})
	}

	const handleUpdate = (val) => {
		setLoading(true)
		const userId = user.id;
		axiosReq.post(`/updateProfile/${userId}`, val).then((res) => {
			try {
				const { message, updatedUser } = res.data;
				const codedData = btoa(JSON.stringify(updatedUser));
				localStorage.removeItem('user');
				localStorage.setItem('user', codedData);
				setUser(updatedData);
				navigate('/profile');
				message.success('Updated Successfully');
			} catch {
				console.error('Error handling user data:', error);
			}
		}).catch((err) => {
			console.log('Error Updating profile', err);
		}).finally(() => {
			setLoading(false)
		})
	}
	useEffect(() => {
		handleData().then(() => {
			handleUpdate();
		}).catch((error) => {
			console.log('Error Handling data', error);
		})
	}, [])

	const [messageApi, contextHolder] = message.useMessage();
	const success = () => {
		messageApi
			.open({
				type: 'loading',
				content: 'Updating Profile',
				duration: 1,
			})
			.then(() => {
				message.success('Profile Updated Successfully', 2)
				navigate(`/profile/${user?.username}`)
			})
	};

	return (
		<Auth>
			<Layout>
				<Form form={registerForm} onFinish={handleUpdate} className="flex justify-center mt-0 md:mt-20">
					<div className="w-80">
						<h1 className='text-2xl text-center py-4'>Edit Profile</h1>
						<Form.Item name='email' initialValue={user ? user?.email : ''}>
							<Input type='email' placeholder='Enter your email' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='name' initialValue={user ? user.name : ''}>
							<Input placeholder='Enter your name' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='username' initialValue={user ? user.username : ''}>
							<Input placeholder='Enter your username' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='bio' initialValue={user ? user.bio : ''}>
							<Input.TextArea showCount placeholder='Enter Your Bio' maxLength={150} className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='gender' initialValue={user ? user.gender : ''}>
							<Select
								options={[
									{ label: <span>Male</span>, value: 'Male' },
									{ label: <span>Female</span>, value: 'Female' },
								]}
							/>
						</Form.Item>
						{contextHolder}
						<Button htmlType="submit" type='primary' className="w-full h-10" onClick={success}>
							Update Profile
						</Button>
					</div>
				</Form>
			</Layout>
		</Auth>
	);
}
