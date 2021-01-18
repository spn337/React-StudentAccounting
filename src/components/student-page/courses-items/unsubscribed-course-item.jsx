import React from 'react'
import moment from 'moment';
import { Card, Col, Button, Row, DatePicker, Space, Popconfirm, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';


class UnsubscribedCourseItem extends React.Component {

    state = {
        dateMoment: '',
        disabled: true
    }

    disabledDate = (current) => {
        return current && current < moment().endOf('day');
    };

    dataHangleChange = (value) => {
        this.setState({
            dateMoment: value,
            disabled: (value) ? false : true
        });
    };

    onSubscribe = (id) => {
        const date = this.state.dateMoment;
        this.props.onSubscribe(id, date);
    };

    render() {
        const { item } = this.props;
        const { dateMoment, disabled } = this.state;

        const title =
            <Tooltip title={item.name}>
                <Text className="subscribed-text unsubscribed-color">{item.name}</Text>
            </Tooltip>
        return (
            <Card title={title} bordered={false}>
                <Row justify="space-between" align="middle" className="mt-3">
                    <Col className="mb-3">
                        <Text className="description-text">{item.description}</Text>
                    </Col>
                    <Col className="mb-3">
                        <Space size={20}>
                            <DatePicker disabledDate={this.disabledDate}
                                value={dateMoment}
                                onChange={this.dataHangleChange} />
                            <Popconfirm title='Sure?' disabled={disabled} onConfirm={() => this.onSubscribe(item.id)}>
                                <Button type={'primary'} disabled={disabled}>Subscribe</Button>
                            </Popconfirm>
                        </Space>
                    </Col>
                </Row>
            </Card>
        )
    }
};

export default UnsubscribedCourseItem;