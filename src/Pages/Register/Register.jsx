import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
const initialValue = {
    email: '',
    name: '',
    password: '',
    repassword: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid Email !')
        .required('Required'),
    name: Yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(40)
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Required'),
    repassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
})



const Register = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = async values => {
        try {
            await axios.post('/auth/register', values).then((res) => {
                console.log(res)
                login(res.data.accessToken)
                navigate('/')
            })

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
    return (
        <div className='register'>
            <div className="card">
                <div className="left">
                    <h1>Register</h1>
                    <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>

                        <Form>
                            <Field type="text" name="email" id="" placeholder='Email' />
                            <ErrorMessage name='email' component='span' className='error-input' />
                            <Field type="text" name="name" id="" placeholder='Name' />
                            <ErrorMessage name='name' component='span' className='error-input' />
                            <Field type="password" name="password" id="" placeholder='Password' />
                            <ErrorMessage name='password' component='span' className='error-input' />
                            <Field type="password" name="repassword" id="" placeholder='Confirm Password' />
                            <ErrorMessage name='repassword' component='span' className='error-input' />
                            <button type='submit'>Register</button>
                        </Form>
                    </Formik>
                </div>
                <div className="right">
                    <h1>All<span>y</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quo! Nihil eaque
                        voluptatibus hic nam molestias sed vel accusantium cum.
                        Repellat quisquam dolore esse deserunt aperiam unde! Dolor,
                        deleniti iure.</p>
                    <span>Already have an account</span>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register