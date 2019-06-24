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
import axios from "axios";
import moment from "moment";

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import "./style.css";

const InputGroup = Input.Group;

class PublicServicesForm extends React.Component {
  state = {
    publishDatetime: moment().format()
  };

  async componentDidMount() {
    try {
      const {
        form: { setFieldsValue },
        id
      } = this.props;

      if (id) {
        const getRes = await axios.get(`/api/v1/post/${id}`, {
          params: {
            postType: "public_service"
          }
        });
        const publicService = getRes.data.data[0];
        publicService.primaryTag = publicService.primary_tag;
        publicService.secondaryTag = getRes.data.data.map(
          publicService => publicService.secondary_tag_id
        );
        publicService.altText = publicService.alt_text;
        publicService.focusKey = publicService.focus_key;

        delete publicService.primary_tag;
        delete publicService.secondary_tag_id;
        delete publicService.secondary_tag;
        delete publicService.alt_text;
        delete publicService.focus_key;

        await this.setState({
          publishDatetime: publicService.publish_datetime
        });
        setFieldsValue(publicService);
      }
    } catch (err) {
      if (Number(err.statusCode) === 400) {
        notification.error({
          message: "Bad Request",
          description: err.message
        });
      } else if (Number(err.statusCode) === 401) {
        notification.error({
          message: "Unauthorized",
          description: err.message
        });
      } else if (Number(err.statusCode) === 500) {
        notification.error({
          message: "Internal Server Error",
          description: err.message
        });
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong please try again later"
        });
      }
      this.props.history.push("/");
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { target } = e;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      try {
        if (err) {
          notification.error({
            message: "Error",
            description: "Validation Error"
          });
        } else {
          const { id } = this.props;
          values.type = "public_services";
          values.publishDatetime = this.state.publishDatetime;
          target.textContent === 'Preview' & !id ? values.isDraft = "true" : values.isDraft = 'false';

          const formData = new FormData();
          const file = this.uploadInput.state.fileList.length ? this.uploadInput.state.fileList[0].originFileObj : null;
          formData.append('data', JSON.stringify(values))
          formData.append('image', file)
          if (!file && !this.props.id) return notification.error({ message: "Bad Request", description: 'Add an Image' });

          let resPost;

          //Edit Post//
          if (id && target.textContent !== 'Preview') {
            resPost = await axios.put(`/api/v1/post/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            if (resPost.data.data.id)
              notification.success({
                message: "Successfully",
                description: "Post updated successfully"
              })
          }

          //Preview Published Post//
          if (this.props.id && target.textContent === 'Preview') {
            return notification.warning({
              message: 'Sorry!',
              description: 'You have to save the post to review it',
            })
          }

          //Post New Post: Draft or Live//
          if (!id) {
            resPost = await axios.post('/api/v1/post', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if (resPost.data.data.id)
              notification.success({
                message: "Successfully",
                description: "Post added successfully"
              })
          }
          const { id: postId, primary_tag } = resPost.data.data;
          const primaryTags = this.props.primaryTag;
          const tagId = primaryTags.findIndex(({ id }) => id === primary_tag);
          const tag = primaryTags[tagId].tag.toLowerCase().replace(' and ', '-');

          //Redirect
          this.props.history.push(`/post/public-service/${tag}/${postId}`)
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
            message: "Error",
            description: "There is an error try again"
          });
        }
      }
    });
  };

  render() {
    const {
      primaryTag,
      secondaryTags,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

    const publicServicesPrimaryTag = primaryTag.map(element => {
      return { id: element.id, value: element.tag };
    });
    const publicServicesSecondaryTag = secondaryTags.map(element => {
      return { id: element.id, value: element.tag };
    });

    const urlType = getFieldValue("primaryTag");

    return (
      <Form className="main--eventForm">
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
          optionsMenu={publicServicesPrimaryTag}
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
          optionsMenu={publicServicesSecondaryTag}
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
          {
            <Upload
              style={{ width: "100%" }}
              customRequest={_ => _}
              listType="picture"
              ref={element => (this.uploadInput = element)}
            >
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          }
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
            name="focusKey"
            validationMsg="Please input your keyword!"
            placeholder="Your main keyword"
          />
        </InputGroup>
        <Card
          title={
            <>
              Event Title
              <br />
              <span style={{ color: "#f36f18" }}>
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
            name="meta"
            validationMsg="Please input your Meta Description!"
            placeholder="Your main Meta Description"
            min={5}
            max={false}
          />
        </Card>
        <Form.Item>
          <Btn onClick={this.handleSubmit} type="primary" htmlType="submit">
            {this.props.id ? 'Save' : 'Publish'}
          </Btn>
          <Btn
            onClick={this.handleSubmit}
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
  secondaryTags: PropTypes.array.isRequired
};

export default WrappedPublicServices;
