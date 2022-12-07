import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { GoogleLogin } from '@react-oauth/google';
import './Login.scss'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'


const initialValue = {
    email: '',
    password: ''
}
const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
})

const Login = () => {
    const { login, current } = useAuth()
    const handleGoogleLogin = (data) => {
        axios.post('/auth/google', { data }).then(({ data }) => {
            console.log(data)
            login(data.accessToken, data.userid, data.userName);
            // navigate('/')
        })
    }
    const navigate = useNavigate()
    const onSubmit = async values => {
        try {
            await axios.post('/auth/login', values).then((res) => {

                login(res.data.accessToken, res.data.user);
                navigate('/')
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    return (

        <div className='login'>
            {current && <Navigate to='/' />}
            <div className="card">
                <div className="left">
                    <h1>All<span>y</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quo! Nihil eaque
                        voluptatibus hic nam molestias sed vel accusantium cum.
                        Repellat quisquam dolore esse deserunt aperiam unde! Dolor,
                        deleniti iure.</p>
                    <span>Don't you have an account</span>
                    <Link to='/register'>
                        <button >Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            <Field name='email' type='text' placeholder='Email' />
                            <ErrorMessage name='email' component='span' className='error-input' />
                            <Field name='password' type='password' placeholder='Password' />
                            <ErrorMessage name='password' component='span' className='error-input' />
                            <button type='submit'  >Login</button>
                        </Form>
                    </Formik>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleGoogleLogin(credentialResponse)
                        }}
                        onError={() => {
                            toast.error('something went wrong please try again')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login