import React from 'react'
import { Form, Input, AutoComplete, Cascader, Select } from 'antd'

import Button from '../../utils/Button'
import { residences, BusinesTypeValues } from './static'
import Options from "../../utils/option";
import 'antd/dist/antd.css'
// import './style.css'

const AutoCompleteOption = AutoComplete.Option;

class BusinessForm extends React.Component {

  state = {
    autoCompleteResult: []
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 0 },
        sm: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form'>

        <Form.Item label="Type of busines" className='form--item'>
          {getFieldDecorator("businestype", {
            rules: [
              { required: true, message: "Please select your Type of busines!" }
            ]
          })(
            <Select
              placeholder="Type of busines"
              onChange={this.handleSelectChange}
            >
              {Options(BusinesTypeValues)}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Orgnisation Name" className='form--item'>
          {getFieldDecorator('orgnisation', {
            rules: [
              {
                type: 'string',
                message: 'The Orgnisation Name should be string!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 5,
                message: 'Orgnisation Name must be 5 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your Orgnisation Name!',
              },
            ],
          })(<Input placeholder='Orgnisation Name' />)}
        </Form.Item>

        <Form.Item label="Website" className='form--item'>
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>,
          )}
        </Form.Item>

        <Form.Item label="Adress" className='form--item'>
          {getFieldDecorator('residence', {
            initialValue: ['Please', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: 'Please select your Adress!' },
            ],
          })(<Cascader options={residences} />)}
        </Form.Item>

        <Form.Item label="City" className='form--item'>
          {getFieldDecorator('city', {
            rules: [
              {
                type: 'string',
                message: 'The City Name should be string!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 3,
                message: 'City Name must be 3 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your City Name!',
              },
            ],
          })(<Input placeholder='City Name' />)}
        </Form.Item>

        <Form.Item label="Country" className='form--item'>
          {getFieldDecorator('Country', {
            rules: [
              {
                type: 'string',
                message: 'The Country Name should be string!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 3,
                message: 'Country Name must be 3 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your Country Name!',
              },
            ],
          })(<Input placeholder='Country Name' />)}
        </Form.Item>

        <Form.Item label="Postal Code" className='form--item'>
          {getFieldDecorator('postal', {
            rules: [
              {
                type: 'number',
                message: 'The Postal Code should be number!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 4,
                message: 'Postal NaCodeme must be 4 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your Postal Code!',
              },
            ],
          })(<Input placeholder='Postal Code' />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="submit" className='form--btn-save' >
            Save
        </Button>
          <Button className='form--btn-cancel'>
            Cancel
        </Button>
        </Form.Item>

      </Form>
    );
  }
}

const BusinessProfile = Form.create({ name: 'register' })(BusinessForm);

export default BusinessProfile
