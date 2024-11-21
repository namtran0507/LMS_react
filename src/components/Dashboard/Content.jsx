import React from 'react';
import ContentHeader from './ContentHeader.jsx';
import "../../styles/dashboard/content.css";
import Card from './Card.jsx';
import TeacherList from './TeacherList';

const Content = () => {
    return (
        <div className="content">


            <TeacherList />
        </div>
    );
};
export default Content;