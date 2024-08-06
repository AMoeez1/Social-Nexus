import React, { useEffect, useState } from 'react';
import Auth from '../Components/middlewares/Auth';
import Layout from '../Components/Layout';
import { Button, Form, Input, message, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axiosReq from '../http';

export default function Edit_Profile() {
	const [registerForm] = useForm();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState({});

	// const handleUpdate = async (val) => {
	//     try {
	//         const userId = user.id;
	//         const updatedData = await axiosReq.post(`/updateProfile/${userId}`, val);

	//     } catch (error) {
	//         console.log('Error Updating profile', error);
	//         setErrors(error.response?.data);
	//     } finally {
	//         setLoading(false);
	//     }
	// };
	const hanldeData = () => {
		return new Promise((resolve) => {
			const data = JSON.parse(atob(localStorage.getItem('user')));
			setUser(data);
			resolve();
		})
	}

	const handleUpdate = (val) => {
		setLoading(false)
		const userId = user.id;
		axiosReq.post(`/updateProfile/${userId}`, val).then((res) => {
			const updatedData = res.data;
			const codedData = btoa(JSON.stringify(updatedData));
			localStorage.removeItem('user');
			localStorage.setItem('user', codedData);
			message.success('Updated Successfully');
			setUser(updatedData);
		}).catch = ((error) => {
			console.log('Error Updating profile', error);
		}).finally(() => {
			setLoading(false)
		})
	}
	useEffect(() => {
		hanldeData().then(() => {
			handleUpdate();
		}).catch((error) => {
			console.log('Error Handling data', error);
		})
	}, [])

	return (
		<Auth>
			<Layout>
				<Form form={registerForm} onFinish={handleUpdate} className="flex justify-center mt-20">
					<div className="w-80">
						<h1 className='text-2xl text-center py-4'>Edit Profile</h1>
						<Form.Item name='email' initialValue={user.email}>
							<Input type='email' placeholder='Enter your email' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='name' initialValue={user.name}>
							<Input placeholder='Enter your name' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='username' initialValue={user.username}>
							<Input placeholder='Enter your username' className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='bio' initialValue={user.bio}>
							<Input.TextArea showCount placeholder='Enter Your Bio' maxLength={150} className='px-4 py-2' />
						</Form.Item>
						<Form.Item name='gender' initialValue={user.gender}>
							<Select
								options={[
									{ label: <span>Male</span>, value: 'Male' },
									{ label: <span>Female</span>, value: 'Female' },
								]}
							/>
						</Form.Item>
						<Button htmlType="submit" type='primary' className="w-full h-10" loading={loading}>
							Update Profile
						</Button>
					</div>
				</Form>
			</Layout>
		</Auth>
	);
}
