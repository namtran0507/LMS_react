// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/dashboard/userList.css';

// function AllUser() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://192.168.80.72:8000/admin/users');
//         setUsers(response.data); // Set the users data from API response
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="user--list">
//       <div className="list--header">
//         <h2>Users</h2>
//         <select>
//           <option value="all">All</option>
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//         </select>
//       </div>
//       <div className="list--container">
//         {users.map((user) => (
//           <div key={user.user_id} className="list">
//             <div className="user--detail">
//               <img src={user.image || 'path-to-default-image'} alt={user.username} />
//               <h2>{`${user.first_name} ${user.last_name}`}</h2>
//               <p>{user.email}</p>
//               <p>{user.role}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllUser;
