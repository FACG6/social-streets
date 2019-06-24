import React, { Component } from "react";
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Button,
  Table,
  Select,
  Tag,
  notification
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

class index extends Component {
  state = {
    posts: [],
    type: "event",
    isLoading: false
  };
  handleSubmit = () => {
    this.setState({ isLoading: true });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const posts = (await axios.get("/api/v1/admin/posts", {
            headers: {
              post_type: values.type,
              post_query: values.organizationName
            }
          })).data.data;
          this.setState({ posts, type: values.type, isLoading: false });
        } catch (e) {
          const { statusCode, message } = e.response.data;
          if (statusCode === 401) {
            notification.error({
              message: "Un Authorized",
              description: "You can't get this data"
            });
          } else {
            notification.error({ message: "Error", description: message });
          }
          this.setState({ isLoading: false });
        }
      }
    });
  };
  render() {
    const { type } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ height: "100%" }}>
        <Row>
          <Col span={24}>
            <Title> Posts : </Title>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={24}>
            <Form>
              <Row type="flex" justify="space-around">
                <Col span={15}>
                  <Form.Item label="Organization Name">
                    {getFieldDecorator("organizationName", {
                      rules: [
                        {
                          required: true,
                          message: "Organization name required"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter organization name"
                        size="large"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Type">
                    {getFieldDecorator("type", {
                      initialValue: "event"
                    })(
                      <Select size="large">
                        <Option value="event">Event</Option>
                        <Option value="publicService">Public Service</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Search">
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={this.handleSubmit}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          {type &&
            (type === "event" ? (
              <Table
                dataSource={this.state.posts}
                loading={this.state.isLoading}
              >
                <Table.Column title="Title" dataIndex="title" />
                <Table.Column
                  title="Type"
                  render={(text, record, index) => "event"}
                />
                <Table.Column title="Category" dataIndex="category" />
                <Table.Column title="Venue" dataIndex="venue" />
                <Table.Column title="Start Date" dataIndex="start_date" />
                <Table.Column title="End Date" dataIndex="publish_datetime" />
                <Table.Column title="Webiste" dataIndex="website" />
                <Table.Column
                  title="topcis"
                  dataIndex="topics"
                  render={(text, record, index) => (
                    <span>
                      {record.topics.map(topic => (
                        <Tag color="blue" key={topic}>
                          {topic}
                        </Tag>
                      ))}
                    </span>
                  )}
                />
                <Table.Column title="Cost" dataIndex="cost" />
              </Table>
            ) : (
              <Table
                dataSource={this.state.posts}
                loading={this.state.isLoading}
              >
                <Table.Column title="Title" dataIndex="title" />
                <Table.Column
                  title="Type"
                  render={(text, record, index) => "event"}
                />
                <Table.Column title="Primary Tag" dataIndex="tag" />
                <Table.Column
                  title="Secondary Tags"
                  dataIndex="secondaryTags"
                  render={(text, record, index) => (
                    <span>
                      {record.secondaryTags.map(tag => (
                        <Tag color="blue" key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </span>
                  )}
                />
                <Table.Column
                  title="Publish Date"
                  dataIndex="publish_datetime"
                />
              </Table>
            ))}
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "posts_form" })(index);
