import React from 'react'
import { Form, Input, AutoComplete, Select } from 'antd'

import Button from 'components/utils/Button'
import { BusinesTypeValues } from './static'
import Options from "components/utils/option"
import json from './country.json'

const AutoCompleteOption = AutoComplete.Option;

class BusinessForm extends React.Component {

  state = {
    autoCompleteResultWebsite: [],
    autoCompleteResultCuntry: [],
    autoCompleteResultCity: [],
    country: ''
  };

  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.business)
  }

  handleWebsiteChange = value => {
    let autoCompleteResultWebsite;
    if (!value) {
      autoCompleteResultWebsite = [];
    } else {
      autoCompleteResultWebsite = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResultWebsite });
  };

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
    const { autoCompleteResultWebsite, autoCompleteResultCuntry, autoCompleteResultCity } = this.state;

    const websiteOptions = autoCompleteResultWebsite.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const CountryOptionss = autoCompleteResultCuntry.map(country => (
      <AutoCompleteOption key={country}>{country}</AutoCompleteOption>
    ));

    const cityOptionsss = autoCompleteResultCity.map(city => (
      <AutoCompleteOption key={city}>{city}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className='form'>

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
                message: 'Please inter your Country Name!',
              },
            ],
          })(
            <AutoComplete
              dataSource={CountryOptionss}
              onChange={this.handleCuntryChange}
              placeholder="Country"
            >
              <Input />
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
                message: 'Please inter your City Name!',
              },
            ],
          })(
            <AutoComplete
              dataSource={cityOptionsss}
              onChange={this.handleCityChange}
              placeholder="City"
            >
              <Input />
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
                message: 'Please inter your Address!',
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
                message: 'Please inter your Postal Code!',
              },
            ],
          })(<Input placeholder='Postal Code' />)}
        </Form.Item>

        <Form.Item >
          <Button type="submit" className='form--btn-save' >
            Save
        </Button>
          <Button onClick={this.handleBack}  className='form--btn-cancel'>
            Back
        </Button>
        </Form.Item>

      </Form>
    );
  }
}

const BusinessProfile = Form.create({ name: 'register' })(BusinessForm);

export default BusinessProfile
