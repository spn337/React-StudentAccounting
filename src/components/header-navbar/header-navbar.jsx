import React from 'react'
import { Link } from 'react-router-dom';
import { Roles, Routes } from '../../constants/constants';
import { Col, Typography, Row, Space } from 'antd';
import './header-navbar.css';


const HeaderNavbar = ({ authUser, handleLogout }) => {
    const { Text } = Typography;

    const homeRouteName =
        (authUser && authUser.roles[0] === Roles.ADMIN)
            ? Routes.ADMIN
            : Routes.STUDENT;

    return (
        <>
            {(!authUser)
                ? <Row justify="end">
                    <Col>
                        <Link to={Routes.AUTH} className="nav-item">Sing in</Link>
                    </Col>
                </Row>

                : <Row justify="space-between">
                    <Col>
                        <Link to={homeRouteName} className="nav-item">Home</Link>
                    </Col>
                    <Col>
                        <Space size={20} align="baseline">
                            <Text className="text-user-name">{authUser.userName}</Text>
                            <span className="nav-item"
                                onClick={handleLogout}>Sing out</span>
                        </Space>
                    </Col>
                </Row>}
        </>
    )
};

export default HeaderNavbar;