import React, { useEffect, useState } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import Layout from '../Components/Layout';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../http';

export default function Upload_img() {
	const navigate = useNavigate();
	const [fileList, setFileList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [registerForm] = useForm();

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

	const handleUpload = () => {
		const formData = new FormData();
		fileList.forEach((file) => {
			console.log('Appending file', file);
			formData.append('files[]', file);
		});
		formData.append('desc', registerForm.getFieldValue('desc'));
		formData.append('title', registerForm.getFieldValue('title'));

		setUploading(true);
		axiosReq.post('/post', formData)
			.then(() => {
				setFileList([]);
				registerForm.resetFields();
				message.success('Upload successful.');
			})
			.catch(() => {
				message.error('Upload failed.');
			})
			.finally(() => {
				setUploading(false);
			});
	};

	const handleRemove = (file) => {
		const index = fileList.indexOf(file);
		const newFileList = [...fileList];
		newFileList.splice(index, 1);
		setFileList(newFileList);
	};

	const props = {
		onRemove: (file) => handleRemove(file),
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			console.log('Selected file', file)
			return false;
		},
		fileList,
	};
	return (
		<Layout>
			<div className="flex items-center justify-center pt-8">
				<div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-xl">
					<div className="flex justify-center mb-6">
						<i>
							<svg xmlns="http://www.w3.org/2000/svg" class="mt-4" width="180" height="90"
								viewBox=".182 .548 511.304 171.879" id="instagram">
								<path fill="#000"
									d="M47.5 1c-3.4 1.3-9 8.3-12.3 15.2-4.5 9.6-6.5 18.1-6.5 27.9 0 7.1.4 9.4 2.7 14.5 1.5 3.2 3.9 7.2 5.4 8.8 3.4 3.6 9.7 6.5 14 6.6 2.7 0 3.2.4 3.2 2.5 0 1.4-.9 4.7-1.9 7.5-4.4 11.5-13.3 18-25 18-8.3 0-14.3-2.7-16.5-7.4-2.7-5.7-2.1-9.2 2.5-14.8 3.1-3.6 4.3-6 4.7-9.3.4-4 .2-4.6-1.9-5.3-5.7-2.1-12.8 3.2-15 11-.6 2.4-.9 6.9-.6 10.1 1.5 16.4 13.8 24.8 34.2 23.4 11.2-.8 17-3 23.1-9.2C64 94.2 66.7 87.1 68 74.1c1.1-11 1.3-53.1.4-64.4-.7-7.6-.7-7.7-3.8-8.1C57.5.5 49.4.2 47.5 1zm6.2 14.2c.6.8.8 10.6.5 24.5-.4 21.6-.6 23.3-2.3 23.8-3.3 1.1-7.3-1.7-9.9-7-2.3-4.5-2.5-6.2-2.5-17 0-13 1.1-17.7 5.2-22.5 2.6-3.2 7.2-4.1 9-1.8zM174.6 3.7c-.3.8-.6 3.8-.6 6.6 0 2.9-.3 8.2-.7 11.9l-.6 6.8h-4.6c-4.5 0-11.8 1.4-12.8 2.3-.2.3 0 1.4.6 2.5 1 1.8 3.1 2.6 13.9 4.8l2.2.4-.2 23.8c-.3 20.8-.1 24.5 1.6 29.9 3.2 10.6 10.5 17 17.9 15.6 3.7-.7 8.6-6 11.9-12.8 1.5-3.3 2.8-5.1 2.8-4 0 3.3 4.7 12.2 7.2 13.9 1.3.9 4.8 2 7.7 2.6 8.6 1.6 13.6-2 18.7-13.6l1.6-3.9.9 2.9c1.1 4 6.5 9.3 10.1 10 3.9.8 9.1-1.5 11.8-5.2l2.3-3.1 2.1 4.2c2.8 5.4 5.8 7.5 13 8.8 5.3.9 6.2.9 8.5-.9 1.4-1 3.8-4.1 5.3-6.8l2.8-4.9v11.9l-7.4 7.3c-8.2 8-14.2 18.5-17.1 29.8-4.9 19.3 1.3 27.8 20.4 27.9 8.2.1 8.3.1 11.1-3.2 4.7-5.6 5.4-9.8 6-35.2l.5-23.5h3.2c1.8 0 3.8-.6 4.5-1.3 1.1-1.1.9-1.7-1.1-3.3-1.3-1-3.5-1.9-4.9-1.9h-2.5l.5-16.3c.4-12.5.9-17 2.2-19.5l1.7-3.3-3.3-1.3-3.3-1.4v-9c0-8.6-.2-9.2-2.8-12-1.5-1.6-4.7-3.4-7-4.1-2.3-.6-6.3-2.1-8.9-3.3-5.5-2.5-8.4-2-13.2 2.2-6.8 6-10.2 17.8-11.5 39.5-.8 13.9-2.3 18.8-6.1 20-2.8.9-4.7-.9-6-5.4-1.3-4.9-1.3-16.2.2-21.8 1.1-4.4 1-4.7-1.4-6.7-2.3-1.9-2.6-3-3-10.4-.6-10.5-2.1-12.6-11.4-16.4-18.6-7.6-27.9.8-31.4 28.6-.5 4.3-1.4 8.4-1.9 9s-1.7 4.2-2.5 7.9c-2 8.4-4.8 14.2-8.2 16.3-2.4 1.6-2.6 1.6-4.5-.3-3-3-3.9-12.4-3.3-33.3.7-26.2.3-24.7 7-25.6 3.1-.3 8.5-.7 12-.7 6.9-.1 7.9-1 4.4-4.2-1.6-1.4-4.3-2-11.8-2.4l-9.7-.6.2-7c.1-3.9.5-9.2.8-11.8.6-4.7.5-4.8-2.7-6.1-5.6-2.2-10.6-2.7-11.2-.9zm120.1 41.7c2.6 2.3 2.8 2.9 2.7 9.8-.2 13.5-2.8 28.7-6.1 35.3-2.3 4.6-6.4 8.5-9 8.5-1.3 0-3-1.1-4-2.7-2.7-4-2.6-30.4.1-38.3 2.6-7.8 5.4-12 9-13.6 4.1-1.8 4.1-1.8 7.3 1zm-57.9 2.1c2.7 3.5 3.7 10.8 1.8 13.7-.8 1.3-1.9 7.1-2.5 13-1.5 13.4-3.5 20.4-7.1 24-4.2 4.1-7.7 3.8-9.7-1-3.9-9.1-2.3-35.4 2.8-45.3 3.6-7.1 10.9-9.3 14.7-4.4zM297 148.3c-1.8 11.6-6.1 17.6-11.6 16.3-5.2-1.3-6.8-10.7-3.9-22.1 2.2-8.3 7.5-19.2 12.1-24.5l3.9-4.4.3 13.9c.1 7.7-.2 17.1-.8 20.8z">
								</path>
								<path fill="#000"
									d="M372.5 36.4c-5.1 5.3-8.1 13.3-9.6 26.1-1.4 12-5.4 27.8-8.2 32.9-1.7 3.1-2.8 4.1-4.7 4.1-4 0-5.3-5.5-4.7-20.5.4-9.1 1.1-14.5 2.8-19.9l2.3-7.4-2.2-1.8c-1.4-1.1-4.8-2-9-2.4-3.7-.3-7.4-.7-8.2-.8-1-.2-1.5-1.5-1.5-4.2-.1-5.7-1.1-6.8-5.2-6.2-6.1 1-6.1 1.2-5.6 18 .4 9.8.1 17.9-.7 22.7-1.8 10.6-1.7 11.4.3 11.8 2.7.6 5.3-6.6 7.4-20.8l1.9-12.5h5.9l-.4 13c-.6 25.5 4.7 38.5 15.7 38.5 4.6 0 8.6-3.1 11.5-9l2.5-4.9 1.6 4.3c.9 2.3 2.9 5.4 4.4 6.8 3.3 3.1 12.6 5.4 16.4 3.9 3.3-1.2 7.6-6.5 10.3-12.4l2.1-4.9 1.9 4.2c4.8 10.7 15.8 11.5 22.3 1.7l2.7-4.1.6 5.2c.9 6.6 2 7.9 7.5 8.8 8.7 1.3 8.7 1.2 10.7-13.8 1.7-13.5 4.3-24.8 5.8-24.8.4 0 .9 6.7 1.1 14.9.3 12.9.6 15.2 2.2 17 3.9 4.3 13.6 3.6 13.6-1 0-3.5 4-18 7.3-26.4l3.2-8 .5 14c.4 12.4.8 14.6 3 18.9 1.4 2.8 3.7 5.9 5.2 7 3.7 2.7 10.8 2.7 14.4 0 7.7-5.7 15.7-30.4 9.9-30.4-1.8 0-3 2.4-4 7.5-2.3 12.8-10 20.1-13.5 12.7-2.1-4.3-2.4-21.5-.5-29.7 3-13 3.1-12-.9-15-2.5-1.9-5.3-3-8.5-3.3l-4.7-.4-2.6 5.8c-1.5 3.3-4.8 12-7.5 19.4l-4.8 13.5-.3-15.2-.3-15.3-2.9-1.5c-8-4.1-12.2-.4-16.9 15.1-1.8 6-3.4 11.3-3.6 11.9-.2.5-.4-7.6-.4-18.2-.1-11.9-.5-19.4-1.1-19.8-.6-.4-3.5-.9-6.4-1.2l-5.4-.6-.4 18.9c-.4 15.9-.8 19.9-2.6 25.5-3.9 11.7-8.9 15.3-11.8 8.4-1.7-4.1-1.9-19.2-.3-25 1-3.6.9-4.1-1.4-6-2.1-1.7-2.5-3.2-3.1-9.9-.8-8.9-2.3-12.7-5.8-14.2-10.5-4.9-12.3-5.4-17.5-5.4-5.4 0-5.9.2-9.8 4.4zM392 46c3.3 1.8 5.5 13.1 3 15.6-.5.5-1.5 5.7-2 11.4-1.4 13.6-3.6 21.3-7.1 25.1-3.7 3.9-7.8 3.7-9.8-.5-3.4-7.2-3.2-27.5.4-40 3-10.1 9.3-14.9 15.5-11.6zM80.6 39.8c-.8 1.4-2.9 48.8-2.4 54.4.7 6.6 2.9 8.8 8.7 8.8 2.5 0 5.1-.4 5.7-.8.7-.4 1.9-4.5 2.8-9.2 1.9-9.3 4.9-19.1 7.1-23 1.3-2.3 1.4-1.4 1.5 9.5 0 13.3 1.4 17.9 6 20.3 3.3 1.7 9.6.9 13.2-1.8 3-2.2 3-2.2 4.4-.2 3.2 4.6 17 7.3 26.7 5.2 7.3-1.5 11.7-5 11.7-9.4 0-4.3-1.5-6.2-11.9-14.6-10.4-8.4-12.1-10.6-12.1-15.5 0-7.2 8.9-11.5 14.1-6.9 2.4 2.2 4.5 1.7 7.4-1.7 2.1-2.5 2.5-4 2.3-7.3-.3-3.4-.8-4.3-3.3-5.5-5.6-2.7-23.9 2.2-30.4 8.2-5.2 4.8-6.4 12.2-3.1 18.6 1.5 3.1 1.7 4 .6 4.4-.7.3-1.6 2.5-2 4.8-1.6 10.1-6.9 17-10.5 13.5-1.3-1.4-1.6-4.4-1.8-18-.1-12.5-.5-17.1-1.7-19.4-1.7-3.3-5.6-4.8-8.6-3.2-2.5 1.3-6.5 8.2-10.1 17.3l-2.8 7.2-.1-16.2c0-15.7-.1-16.3-2.2-17.7-3.1-1.9-8.5-2.9-9.2-1.8zm66.9 47.5c2.4 2.1 4.5 4.6 4.8 5.7 1.5 5.6-6.7 7.2-13.1 2.5-2.1-1.5-4.9-3.5-6.5-4.4-1.7-1-2.5-2.1-2.1-3.1.3-.8 1.1-4 1.7-7.1l1.1-5.7 5 4.2c2.7 2.2 6.8 5.8 9.1 7.9z">
								</path>
							</svg>
						</i>
					</div>
					<Form form={registerForm} className="space-y-4 col-span-4">
						<Form.Item name='title'>
							<Input placeholder='Enter Title' />
						</Form.Item >
						<Form.Item name='desc' >
							<Input.TextArea showCount maxLength={150} placeholder='Enter your post description' className='px-4 py-2 max-h-60' />
						</Form.Item>
						<Form.Item name='file'>
							<Upload action={'/post'}
								headers={{
									// 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
								}}
								{...props}>
								<Button icon={<UploadOutlined />}>Select File</Button>
							</Upload>
						</Form.Item>
						<Button
							type="primary"
							onClick={handleUpload}
							disabled={fileList.length === 0}
							loading={uploading}
							style={{ marginTop: 16 }}
						>
							{uploading ? 'Uploading' : 'Start Upload'}
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

// import React, { useState, useEffect } from 'react';

// const Upload_img = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     // Load image from localStorage on component mount
//     const savedImage = localStorage.getItem('savedImage');
//     if (savedImage) {
//       setImageSrc(savedImage);
//     }
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
      
//       reader.onloadend = () => {
//         // Get base64 string of the image
//         const base64String = reader.result;
//         // Save base64 string to localStorage
//         localStorage.setItem('savedImage', base64String);
//         // Set image source to display it
//         setImageSrc(base64String);
//       };
      
//       // Read the file as a base64 encoded string
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {imageSrc && (
//         <div>
//           <img src={imageSrc} alt="Uploaded preview" style={{ width: '300px', height: 'auto' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Upload_img;
