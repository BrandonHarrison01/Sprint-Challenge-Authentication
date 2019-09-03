import React from 'react'

import { withFormik, Form, Field } from 'formik'
import axios from 'axios'

function LoginForm() {
    return(
        <Form>
            <Field 
                placeholder='username'
                name='username'
                type='text'
            />
            <Field 
                placeholder='password'
                name='password'
                type='password'
            />
            <button>Login</button>
        </Form>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues() {
        return {
            username: '',
            password: ''
        }
    },

    handleSubmit: (values, formikBag) => {
        console.log('values', values)
        axios
            .post('http://localhost:3300/api/auth/login', values)
            .then(res => {
                console.log(res)
                localStorage.setItem('authorization', res.data.token)
            })
    }
})(LoginForm)
 
export default FormikLoginForm
