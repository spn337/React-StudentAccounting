import React from 'react'
import { Card, Button, Row, Col, Space, Popconfirm, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';


const SubscribedCourseItem = ({ item, onUnsubscribe }) => {
    const title =
        <Tooltip title={item.name}>
            <Text className="subscribed-text subscribed-color">{item.name}</Text>
        </Tooltip>

    return (
        <Card title={title}>
            <Row justify="space-between" align="middle" className="mt-3">
                <Col className="mb-3 study-date-container">
                    <Space size={20}>
                        <Text className="description-text">Study date: </Text>
                        <Text className="subscribed-text subscribed-color">{item.studyDate}</Text>
                    </Space>
                </Col>
                <Col className="mb-3">
                    <Space size={20}>
                        <Text className="subscribed-text subscribed-color">{item.daysToStudyCount} day(s) left</Text>
                        <Popconfirm title='Sure?' onConfirm={() => onUnsubscribe(item.id)}>
                            <Button type={'danger'}>Unsubscribe</Button>
                        </Popconfirm>
                    </Space>
                </Col>
            </Row>
        </Card>
    )
};

export default SubscribedCourseItem;