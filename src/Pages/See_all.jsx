import React, { useEffect, useState } from 'react'
import Auth from '../Components/middlewares/Auth'
import Layout from '../Components/Layout'

export default function See_all() {
  const encodedData = localStorage.getItem('fetchedUsers');
  const data = encodedData ? JSON.parse(atob(encodedData)) : null;
  const [users, setUsers] = useState([]);
  // const decodedData = atob(encodedData);
  // const data = JSON.parse(decodedData);
  
  const handleData = () => {
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    handleData();
  }, [])
  return (
    <Auth>
      <Layout>
        {users ? (
          users?.map((val) => (
            <p key={val?.id}>{val?.username}</p>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </Layout>
    </Auth>
  )
}
