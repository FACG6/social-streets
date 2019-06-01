import React from 'react'
import { Form, Input, AutoComplete, Select } from 'antd'

import Button from 'components/utils/Button'
import { BusinesTypeValues } from './static'
import json from './country.json'
import './style.css'

const { Option } = Select
const InputGroup = Input.Group;

const AutoCompleteOption = AutoComplete.Option;

class BusinessForm extends React.Component {

  state = {
    autoCompleteResultCuntry: [],
    autoCompleteResultCity: [],
    country: ''
  };

  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.business)
  }

  handleCuntryChange = value => {
    let autoCompleteResultCuntry;
    if (!value) {
      autoCompleteResultCuntry = [];
    } else {
      const countries = Object.keys(json)
      let data = countries.filter((country) => {
        return country.toLowerCase().startsWith(value.toLowerCase())
      })
      autoCompleteResultCuntry = data.map(domain => `${domain}`);
    }
    this.setState(() => {
      return {
        autoCompleteResultCuntry,
        country: value
      }
    });
  };

  handleCityChange = value => {
    const { country } = this.state
    const countryName = json[country] || []
    let autoCompleteResultCity;
    if (!value) {
      autoCompleteResultCity = [];
    } else {
      let data = countryName.filter((city) => {
        return city.toLowerCase().includes(value.toLowerCase());
      })
      autoCompleteResultCity = data.map(domain => `${domain}`);
    }
    this.setState(() => {
      return { autoCompleteResultCity }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values, e)
        console.log('Received values of form: ', values);
      }
    });
  };

  handleBack = e => {
    e.preventDefault()
    const feildValues = this.props.form.getFieldsValue();
    this.props.handleGoBack(feildValues, e);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResultCuntry, autoCompleteResultCity } = this.state;

    const CountryOptions = autoCompleteResultCuntry.map(country => (
      <AutoCompleteOption key={country}>{country}</AutoCompleteOption>
    ));

    const cityOption = autoCompleteResultCity.map(city => (
      <AutoCompleteOption key={city}>{city}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className='form'>
      
        <InputGroup size="large" >

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
                  message: 'Please enter your Orgnisation Name!',
                },
              ],
            })(<Input placeholder='Orgnisation Name' />)}
          </Form.Item>

          <Form.Item label="Type of busines" className='form--item'>
            {getFieldDecorator("businestype", {
              rules: [
                { required: true, message: "Please select your Type of busines!" }
              ]
            })(
              <Select
                placeholder="Type of busines"
                onChange={this.handleSelectChange}
                style={{ 'width': '100%', 'fontSize': '16px' }}
              >
                {BusinesTypeValues.map(({ key, value }) => (<Option key={key} value={value}>{value}</Option>))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Website" className='form--item'>
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }, { pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, message: 'Please input a valied website' }],
            })(
              <Input placeholder="Website" />
            )}
          </Form.Item>

          <Form.Item label="Country" className='form--item'>
            {getFieldDecorator('country', {
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
                  message: 'Please enter your Country Name!',
                },
              ],
            })(
              <AutoComplete
                dataSource={CountryOptions}
                onChange={this.handleCuntryChange}
                style={{ 'width': '100%', 'fontSize': '16px' }}
                placeholder="Country"
              >
                <Input style={{ 'fontSize': '16px', 'height': '40px' }} />
              </AutoComplete>,
            )}
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
                  message: 'Please enter your City Name!',
                },
              ],
            })(
              <AutoComplete
                dataSource={cityOption}
                onChange={this.handleCityChange}
                style={{ 'width': '100%', 'fontSize': '16px' }}
                placeholder="City"
              >
                <Input
                  style={{ 'fontSize': '16px', 'height': '40px' }}
                />
              </AutoComplete>,
            )}
          </Form.Item>

          <Form.Item label="Address" className='form--item'>
            {getFieldDecorator('address', {
              rules: [
                {
                  type: 'string',
                  message: 'The Address should be string!',
                },
                {
                  whitespace: true,
                  message: 'Delete the spaces!'
                },
                {
                  min: 5,
                  message: 'Address must be 5 charcter at least!',
                },
                {
                  required: true,
                  message: 'Please enter your Address!',
                },
              ],
            })(<Input placeholder='Address' />)}
          </Form.Item>

          <Form.Item label="Zip/Postal Code" className='form--item'>
            {getFieldDecorator('postal', {
              rules: [
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
                  message: 'Please enter your Postal Code!',
                },
              ],
            })(<Input placeholder='Postal Code' />)}
          </Form.Item>

          <Form.Item label="Social Media" className='form--item'>
            {getFieldDecorator('facebook', {
              rules: [
                {
                  whitespace: true,
                  message: 'Delete the spaces!'
                },
                {
                  required: true,
                  message: 'Please enter your Social Media!',
                },
              ],
            })(
              <div className='socialinput' >
                <img src='https://image.flaticon.com/icons/svg/174/174848.svg' alt="facebook logo" className='socialimg' />
                <Input placeholder='Facebook page link...' />
              </div>)}
          </Form.Item>

          <Form.Item className='form--item'>
            {getFieldDecorator('instagram', {
              rules: [
                {
                  whitespace: true,
                  message: 'Delete the spaces!'
                },
                {
                  required: true,
                  message: 'Please enter your Social Media!',
                },
              ],
            })(
              <div className='socialinput'>
                <img src='https://image.flaticon.com/icons/svg/1409/1409946.svg' alt="instagram logo" className='socialimg' />
                <Input placeholder='Instagram page link...' />
              </div>)}
          </Form.Item>

          <Form.Item className='form--item'>

            {getFieldDecorator('twitter', {
              rules: [
                {
                  whitespace: true,
                  message: 'Delete the spaces!'
                },
                {
                  required: true,
                  message: 'Please enter your Social Media!',
                },
              ],
            })(
              <div className='socialinput' >
                <img src='https://image.flaticon.com/icons/svg/124/124021.svg' alt="titter logo" className='socialimg' />
                <Input placeholder='Twitter page link...' />
              </div>)}
          </Form.Item>

        </InputGroup>

        <Form.Item >
          <Button type="submit" className='form--btn-save' onClick={() => undefined} >
            Save
        </Button>
          <Button onClick={this.handleBack} className='form--btn-cancel'>
            Back
        </Button>
        </Form.Item>

      </Form>
    );
  }
}

const BusinessProfile = Form.create({ name: 'register' })(BusinessForm);

export default BusinessProfile
