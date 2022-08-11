import React from 'react';
import './style.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import TextInput from "../../Components/Form/InputText";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/Actions";
import {Redirect} from "react-router-dom";
import Loader from "../../Components/Loader";
import DarkModeToggle from "../../Components/Theme/ThemeToggle";

const SignIn = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    if (auth.authenticate) {
        return <Redirect to={"/dashboard"}/>
    }

    return (
        <>
            {auth.loading && <Loader/>}
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="col-md-6 d-none d-md-flex bg-image"/>
                    <div className="col-md-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-7 mx-auto">
                                        <h2 className="mb-1">WE SHOWED UP</h2>
                                        <h3 className="display-4 mb-5">Admin Login <DarkModeToggle/></h3>
                                        {/*<p className="text-muted mb-4">Create a login split page using Bootstrap 4.</p>*/}
                                        <Formik
                                            initialValues={{
                                                email: '',
                                                password: ''
                                            }}
                                            validationSchema={Yup.object({
                                                email: Yup.string().email('Invalid Email Address').required('Required'),
                                                password: Yup.string().min(6, 'Must be 6 characters').required('Required'),
                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                                dispatch(login(values)).then((r)=>{
                                                    console.log("R",r)
                                                })
                                            }}
                                        >
                                            {({handleSubmit, isSubmitting, dirty, resetForm}) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="form-group mb-3">
                                                        <TextInput label="Email"
                                                                   name="email"
                                                                   type="text"
                                                                   placeholder="Enter Email"/>
                                                    </div>
                                                    <div className="form-group mb-5">
                                                        <TextInput label="Password"
                                                                   name="password"
                                                                   type="password"
                                                                   placeholder="Enter Password"/>
                                                    </div>

                                                    <button type="submit"
                                                            disabled={isSubmitting || !dirty}
                                                            className="btn purple-btn btn-block text-uppercase mb-2  shadow-sm">Sign
                                                        In
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SignIn;
