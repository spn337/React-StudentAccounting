import React from 'react'
import { Row, Col, Typography } from 'antd';
import SubscribedCourseItem from './courses-items/subscribed-course-item';
import UnsubscribedCourseItem from './courses-items/unsubscribed-course-item';


const StudentPage = ({ subscribedCourses, unsubscribedCourses, handleSubscribe, handleUnsubscribe }) => {

    const { Title } = Typography;

    const subscribedCoursesElements = subscribedCourses.map((item) => (
        <div className="course-container" key={item.id}>
            <SubscribedCourseItem
                item={item}
                onUnsubscribe={handleUnsubscribe} />
        </div>
    ));

    const unsubscribedCoursesElements = unsubscribedCourses.map((item) => (
        <div className="course-container" key={item.id}>
            <UnsubscribedCourseItem
                item={item}
                onSubscribe={handleSubscribe} />
        </div>
    ));

    return (
        <>
            <Row justify="center" className="title-container">
                <Col>
                    <Title align="center">Student Page</Title >
                </Col>
            </Row>
            <Row justify="center" className="courses-container">
                <Col span={24}>
                    {subscribedCoursesElements}
                </Col>
            </Row>
            <Row justify="center" className="courses-container">
                <Col span={24}>
                    {unsubscribedCoursesElements}
                </Col>
            </Row>
        </>
    )
};

export default StudentPage;