import React from 'react'
import * as Yup from 'yup'
import { withFormik, Field } from 'formik'
import { Button, Input } from 'antd';

import 'antd/dist/antd.css'
import './style.css'

class Personal extends React.Component {

  render() {

    const { handleSubmit, handleChange } = this.props
    const { errors, touched } = this.props

    return (
      <form onSubmit={handleSubmit} className='form'>

          <Field
            name='firstName'
            render={({ field }) => (
              <>
                <label className='form-label' htmlFor='first'> First Name </label>
                <Input {...field} onChange={handleChange} id='first' placeholder="First Name" className='form-input' />
                {touched.firstName && errors.firstName && <h6 className='form-error' >{errors.firstName}</h6>}
              </>
            )}
          />

          <Field
            name='lastName'
            render={({ field }) => (
              <>
                <label className='form-label' htmlFor='last' > Last Name</label>
                <Input {...field} onChange={handleChange} id='last' placeholder="Last Name" className='form-input' />
                {touched.lastName && errors.lastName && <h6 className='form-error' >{errors.lastName}</h6>}
              </>
            )}
          />

          <Field
            name='email'
            render={({ field }) => (
              <>
                <label className='form-label' htmlFor='email' > Email </label>
                <Input {...field} id='email' placeholder="Email" className='form-input' />
                {touched.email && errors.email && <h6 className='form-error' >{errors.email}</h6>}
              </>
            )}
          />

          <Field
            name='password'
            render={({ field }) => (
              <>
                <label className='form-label' htmlFor='pass' > Password </label>
                <Input.Password {...field} id='pass' placeholder="Password" className='form-input' />
                {touched.password && errors.password && <h6 className='form-error' >{errors.password}</h6>}
              </>
            )}
          />

        <Button type="primary" htmlType="submit" className='form-btn--save' block>Save</Button>
        <Button type="primary" className='form-btn--cancel' block>Cancel</Button>
      </form>
    )
  }
}

const PersonalFormik = withFormik({
  mapPropsToValues({ firstName, lastName, email, password }) {
    return {
      firstName,
      lastName,
      email,
      password
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is requierd'),
    firstName: Yup.string('First Name must be a string').required('First Name is requierd'),
    lastName: Yup.string().required('Last Name is requierd'),
    password: Yup.string().min(5, 'Password must be 5 charcter at least').required('Password is requierd')
  }),
  handleSubmit(values) {
    console.log(values)
  },
})(Personal)

export default PersonalFormik
