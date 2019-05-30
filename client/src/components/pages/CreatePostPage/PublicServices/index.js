import React from "react";
import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import "./style.css";
import {
  Form,
  Tooltip,
  Icon,
  Upload,
  Divider,
  Card,
  Button,
  Input
} from "antd";

import { Button as Btn } from "components/utils";

const InputGroup = Input.Group;

class PublicServicesForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { primaryTag, secondaryTag } = this.props;
    return (
      <Form className="main--eventForm" onSubmit={this.handleSubmit}>
        <InputGroup size="large">
          {InputAntd(
            true,
            "Title",
            "What do you want others to call you?",
            getFieldDecorator,
            "title",
            "Please input your Event’s Title!",
            "Event’s Title"
          )}
        </InputGroup>
        {DropDownAntd(
          "Primary Tag",
          getFieldDecorator,
          "primaryTag",
          true,
          "Please select your Primary Tag!",
          "Primary Tag",
          this.handleSelectChange,
          primaryTag
        )}
        {DropDownAntd(
          "Secondary Tag",
          getFieldDecorator,
          "secondaryTag",
          true,
          "Please select your Secondary Tag!",
          "Secondary Tag",
          this.handleSelectChange,
          secondaryTag
        )}
        {TextAreaAntd(
          true,
          {},
          "Description",
          "What do you want others to call you?",
          getFieldDecorator,
          "description",
          "Please input your description!",
          "Enter Event Description",
          10,
          false
        )}
        <Form.Item
          label={
            <span>
              Image&nbsp;
              <Tooltip title="What do you want others to call you?">
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
            >
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Divider style={{ margin: "20px 0" }} />
        <InputGroup size="large">
          {InputAntd(
            false,
            "Focus Keyword",
            "",
            getFieldDecorator,
            "focusKeyword",
            "Please input your keyword!",
            "Your main keyword"
          )}
        </InputGroup>
        <Card
          title={
            <>
              Event Title
              <br />
              <span style={{ color: "#277839" }}>
                www.socialstreets.co/events/festival
              </span>
            </>
          }
          bordered={true}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          {TextAreaAntd(
            false,
            { fontSize: "15px" },
            "Meta Description",
            "What do you want others to call you?",
            getFieldDecorator,
            "metaDescription",
            "Please input your Meta Description!",
            "Your main Meta Description",
            5,
            false
          )}
        </Card>

        <Form.Item>
          <Btn onClick={() => {}} type="primary" htmlType="submit">
            Publish
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            onClick={() => {}}
            type="primary"
            htmlType="submit"
          >
            Preview
          </Btn>
          <Btn
            className="main--form-btn-black main--form-btn"
            onClick={() => {}}
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

export default WrappedPublicServices;
