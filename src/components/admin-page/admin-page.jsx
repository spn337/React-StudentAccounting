import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Pagination, Row, Table, Typography, Space, Input, Popconfirm }
    from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Routes } from '../../constants/constants';


const AdminPage = ({ usersData, currentPage, pageSize, totalUsersCount, searchValue,
    onChangePage, onChangeSearchValue, handleDelete, handleChangeUser, isLoading }) => {

    const columns = [
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            responsive: ['md']
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: true,

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
            responsive: ['sm']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            responsive: ['md']
        },
        {
            title: 'Registered Date',
            dataIndex: 'registeredDate',
            key: 'registeredDate',
            sorter: true,
            responsive: ['lg']
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (user) => {
                return (
                    <Space>
                        <Link to={Routes.UPDATE_USER + user.id}>
                            <EditOutlined />
                        </Link>
                        <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(user.id)}>
                            <DeleteOutlined twoToneColor="red" size="large" />
                        </Popconfirm>
                    </Space>
                )
            }
        }];

    usersData = usersData.map((item, index) => {
        const key = (index + 1) + (currentPage - 1) * pageSize;
        return {
            ...item,
            key
        }
    })

    const { Title, Text } = Typography;
    return (
        <>
            <Row justify="center" className="my-5">
                <Col>
                    <Title align="center">Admin Page</Title >
                </Col>
            </Row>
            <Row justify="center" align="middle" wrap={true}>
                <Col className="my-3" xs={24} sm={24} md={10} lg={13} xl={16} xxl={16}>
                    <Link to={Routes.CREATE_USER} className="ant-btn ant-btn-primary">
                        Create</Link>
                </Col>
                <Col className="my-3" xs={10} sm={10} md={5} lg={4} xl={3} xxl={3}>
                    <Text>Total Count: {totalUsersCount}</Text>
                </Col>
                <Col className="my-3" xs={14} sm={14} md={9} lg={7} xl={5} xxl={5}>
                    <Input
                        placeholder="Search user"
                        prefix={<SearchOutlined />}
                        value={searchValue}
                        allowClear
                        onChange={(e) => { onChangeSearchValue(e.target.value) }}
                    />
                </Col>
            </Row>
            <Row justify="center" className="mb-3">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        columns={columns}
                        dataSource={usersData}
                        expandable={{
                            expandedRowRender: (record) =>
                                <Space size={60}>
                                    <div><span className="expanded-name">Course Name:</span> {record.course.courseName}</div>
                                    <div><span className="expanded-name">Study Date:</span>  {record.course.studyDate} </div>
                                </Space>,

                            rowExpandable: record => record.course !== null,
                        }}
                        onChange={handleChangeUser}
                        loading={isLoading}
                        pagination={false}
                        size="middle" />
                </Col>
            </Row>
            <Row justify="center" className="mb-3">
                <Col>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalUsersCount}
                        onChange={onChangePage}
                        showSizeChanger={false} />
                </Col>
            </Row>
        </>
    )
}

export default AdminPage;