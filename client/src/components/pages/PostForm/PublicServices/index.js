import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  Form,
  Tooltip,
  Icon,
  Upload,
  Divider,
  Card,
  Button,
  Input,
  notification
} from "antd";
import axios from 'axios';

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import { publicService } from "components/pages/PostForm/dumyData";
import "./style.css";

const InputGroup = Input.Group;

class PublicServicesForm extends React.Component {
  componentDidMount() {
    // id and postType need for fetch and take post info
    // const { id, postType } = this.props;
    // use id, postType for fetch and take post info from DB
    // by use setFieldsValue will put the reponse of post in inputs
    const {
      form: { setFieldsValue },
      id
    } = this.props;

    if (id) {
      setFieldsValue(publicService);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((async (err, values) => {
      try {
        if (!err) {
          notification.error({
            message: "Error",
            description: "Validation Error"
          });
        } else {
          const formData = new FormData()
          const file = this.uploadInput.state.fileList[0].originFileObj
          formData.append('data', JSON.stringify(values))
          formData.append('image', file)
          const serverResponse = await axios.post('/api/v1/post', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (serverResponse) {
            notification.success({
              message: "Successfully",
              description: "Post added successfully"
            })
          }
        }
      } catch (err) {
        if (Number(err.statusCode) === 400) {
          notification.error({
            message: "Bad Request",
            description: err.message
          });
        } else if (Number(err.statusCode) === 500) {
          notification.error({
            message: "Internal Server Error",
            description: err.message
          });
        } else {
          notification.error({
            message: 'Error',
            description: 'There is an error try again'
          });
        }
      }
    }));
  };

  render() {
    const {
      id,
      primaryTag,
      secondaryTag,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

    const urlType = getFieldValue("primaryTag");

    return (
      <Form className="main--eventForm" onSubmit={this.handleSubmit}>
        <InputGroup size="large">
          <InputAntd
            withTip
            label="Title"
            tipInfo="Title for Public Services"
            getFieldDecorator={getFieldDecorator}
            name="title"
            validationMsg="Please input your Public Services"
            placeholder="Public Services Title"
            validation={{ max: 60 }}
          />
        </InputGroup>
        <DropDownAntd
          label="Primary Tag"
          getFieldDecorator={getFieldDecorator}
          name="primaryTag"
          required
          validationMsg="Please select your Primary Tag!"
          placeholder="Primary Tag"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={primaryTag}
        />
        <DropDownAntd
          mode="multiple"
          label="Secondary Tag"
          getFieldDecorator={getFieldDecorator}
          name="secondaryTag"
          required
          validationMsg="Please select your Secondary Tag!"
          placeholder="Secondary Tag"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={secondaryTag}
        />
        <TextAreaAntd
          withTip
          label="Description"
          getFieldDecorator={getFieldDecorator}
          name="description"
          validationMsg="Please input your description!"
          placeholder="Enter Event Description"
          min={10}
          max={false}
        />
        <Form.Item
          label={
            <span>
              Image&nbsp;
              <Tooltip title="Image for Public Services">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("image", {
            rules: [
              {
                required: true,
                message: "Please input your image!",
                whitespace: true
              }
            ]
          })(
            <Upload
              style={{ width: "100%" }}
              name="eventImage"
              action="/upload.do"
              listType="picture"
              ref={element => (this.uploadInput = element)}
            >
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <InputAntd
          withTip={false}
          label="Alt-Text"
          tipInfo=""
          getFieldDecorator={getFieldDecorator}
          name="altText"
          validationMsg="Please input Alt Text For Image!"
          placeholder="Your Alt Text For Image"
        />
        <Divider style={{ margin: "20px 0" }} />
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Focus Keyword"
            getFieldDecorator={getFieldDecorator}
            name="focusKeyword"
            validationMsg="Please input your keyword!"
            placeholder="Your main keyword"
          />
        </InputGroup>
        <Card
          title={
            <>
              Event Title
              <br />
              <span style={{ color: "#277839" }}>
                www.socialstreets.co/events/{urlType && urlType}
              </span>
            </>
          }
          bordered
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <TextAreaAntd
            withTip={false}
            style={{ fontSize: "15px" }}
            label="Meta Description"
            getFieldDecorator={getFieldDecorator}
            name="metaDescription"
            validationMsg="Please input your Meta Description!"
            placeholder="Your main Meta Description"
            min={5}
            max={false}
          />
        </Card>
        <Form.Item>
          <Btn type="primary" htmlType="submit">
            Publish
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            type="primary"
            htmlType="submit"
          >
            Preview
          </Btn>
          <Btn
            className="main--form-btn-black main--form-btn"
            onClick={() => <Redirect to="/home" />}
            type="primary"
            htmlType="submit"
          >
            Cancel
          </Btn>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedPublicServices = Form.create({ name: "publicServicesForm" })(
  PublicServicesForm
);

WrappedPublicServices.propTypes = {
  primaryTag: PropTypes.array.isRequired,
  secondaryTag: PropTypes.array.isRequired
};

export default WrappedPublicServices;
