import React from 'react';
import ProfileHeader from './ProfileHeader.jsx';
import 'C:/Users/mrvul/react_LMS/lms-gui/src/styles/dashboard/profile.css';
import userImage from 'C:/Users/mrvul/react_LMS/lms-gui/src/assets/image.png';
import { BiBook } from 'react-icons/bi';
const courses = [
    {
        title: 'HTMLOL CSS',
        duration: '2 Hourses',
        icon: <BiBook />,
    },
    {
        title: 'Javalorant',
        duration: '2 Hourses',
        icon: <BiBook />,
    },
    {
        title: 'React.js',
        duration: '2 Hourses',
        icon: <BiBook />,
    },
];
const Profile = () => {
    return (
        <div className="profile">
            <ProfileHeader />
            <div className="user--profile">
                <div className="user--detail">
                    <img src={userImage} alt="" />
                    <h3 className="username">Tuan Nguyen</h3>
                    <span className="profession">Teacher</span>
                </div>
                <div className="user--courses">
                    {courses.map((coures) => (
                        <div className="course">
                            <div className="course--detail">
                                <div className="course-cover">{coures.icon}</div>
                                <div className="course-name">
                                    <h5 className='title'>{coures.title}</h5>
                                    <span className="duration">{coures.duration}</span>
                                </div>
                            </div>
                            <div className="action">:</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Profile;