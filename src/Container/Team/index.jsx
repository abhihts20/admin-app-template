import React, {useEffect, useState} from 'react';
import Layout from "../../Components/Layout";
import './style.scss';
import Modal from "../../Components/UI/Modal/Modal";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import Input from "../../Components/Form/InputText";
import axiosInstance from "../../Utils/axios";
import {Link} from "react-router-dom";
import Loader from "../../Components/Loader";
import SweetAlert from "react-bootstrap-sweetalert/dist";
import GmailIcon from '../../Images/Icons/gmail.png';
import LinkedInIcon from '../../Images/Icons/linkedin.png';
import WebsiteIcon from '../../Images/Icons/twitter.png';

const Team = () => {
    const [profilePicName, setProfilePictureName] = useState('');
    const [profilePicBuffer, setProfilePicBuffer] = useState('')
    const [teamData, setTeamData] = useState([]);
    const [show, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [successAlert, setSuccessAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const handleShow = () => {
        setShowForm(!showForm);
    };
    const handleFileChange = (event) => {
        let file = event.target.files[0];
        setProfilePictureName(file.name);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            setProfilePicBuffer(`${event.target.result}`);
        }
        fileReader.readAsDataURL(file);
    }

    const fetchAllTeamDetails = async () => {
        await axiosInstance.get('/team/getAllTeamMembers').then((res) => {
            setTeamData(res.data.team);
        }).catch(err => {
            console.log("Error", err)
        })
    }

    const handleSubmitForm = (values) => {
        setShowLoader(true);
        let obj = {
            ...values,
            profilePicture: {
                name: profilePicName,
                image: profilePicBuffer
            },
            socialLinks: {
                website: values.website,
                gmail: values.gmail,
                linkedin: values.linkedin
            }
        }
        axiosInstance.post('/team/createMember', {...obj})
            .then((r) => {
                setShowLoader(false);
                setSuccessAlert(true);
            })
            .catch((err) => {
                setShowLoader(false);
                setFailAlert(true)
            });

    }
    const handleModalShow = (index) => {
        setShowModal(true)

    }

    useEffect(() => {
        fetchAllTeamDetails()
    }, [])

    return (
        <>
            {showLoader && <Loader/>}

            <Layout>
                <div>
                    <div className="form-table-section">
                        <div className="d-flex flex-sm-row justify-content-md-between align-items-center p-2">
                            <h1>Add Team</h1>
                            <button className="btn purple-btn" onClick={handleShow}>
                                Add+
                            </button>
                        </div>

                        {showForm && (<Formik
                            initialValues={{
                                name: '',
                                email: '',
                                mobile: '',
                                designation: '',
                                website: '',
                                gmail: '',
                                linkedin: ''
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().max(20, "Max 20 Characters Allowed").required("Required"),
                                email: Yup.string().email("Invalid Email").required("Required"),
                                mobile: Yup.string().min(10, 'Invalid Mobile Number').matches(phoneRegExp, "Invalid Mobile Number").required('Required'),
                                designation: Yup.string().max(20, "Max 20 Characters Allowed").required("Required"),
                            })}
                            onSubmit={(values, {resetForm}) => {
                                handleSubmitForm(values);
                            }}>
                            {({handleSubmit, isSubmitting, dirty, resetForm, handleChange}) => (

                                <Form onSubmit={handleSubmit} id="team-form"
                                      className={`${show ? 'showDiv' : ''}`}
                                >
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <Input
                                                label="Name"
                                                name="name"
                                                type="text"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter Email"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <Input
                                                label="Mobile Number"
                                                name="mobile"
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                maxLength="10"
                                                onInput={(object) => {
                                                    if (object.target.value.length > object.target.maxLength) {
                                                        object.target.value = object.target.value.slice(0, object.target.maxLength)
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <Input
                                                label="Designation"
                                                name="designation"
                                                type="text"
                                                placeholder="Designation"
                                            />
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <label className="font-weight-bold">Profile Picture</label>
                                            <input
                                                type="file"
                                                className="form-control shadow-sm px-4"
                                                onChange={handleFileChange}
                                                placeholder="Profile Picture"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <Input
                                                name="website"
                                                type="text"
                                                placeholder="Website"
                                            />
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <Input
                                                name="gmail"
                                                type="text"
                                                placeholder="Gmail"
                                            />
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <Input
                                                name="linkedin"
                                                type="text"
                                                placeholder="LinkedIn"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-sm-row flex-column justify-content-end p-2">
                                        <button type="reset" className="btn red-btn m-1">Reset</button>
                                        <input type="submit" className="btn purple-btn m-1"/>
                                    </div>
                                    {successAlert &&
                                    <SweetAlert success closeAnim={true} customClass="sweet-alert" onConfirm={() => {
                                        setSuccessAlert(false)
                                        setShowForm(false);
                                        fetchAllTeamDetails().then(r => {
                                        })
                                        resetForm()

                                    }} title={"Data Saved Successfully"}/>}
                                    {failAlert &&
                                    <SweetAlert warning closeAnim={true} customClass={"sweet-alert"} onConfirm={() => {
                                        setFailAlert(false)
                                    }} title={"Error Occured"}
                                    />}
                                </Form>
                            )}
                        </Formik>)}
                    </div>
                    <div>
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Profile Picture</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>

                                {teamData && teamData.length > 0 ? teamData.map((el, index) => (

                                    <tr key={index}>
                                        <td>{el.name}</td>
                                        <td>{el.email}</td>
                                        <td>{el.mobile}</td>
                                        <td>{el.designation}</td>
                                        <td><img alt={""}
                                                 style={{
                                                     width: '50px',
                                                     height: '50px'
                                                 }}
                                                 src={el.profilePicture.image}/></td>
                                        <td>
                                            <div className="actions-box">
                                                <Link title={"Edit"} to={''}>
                                                    <i className="bx bx-edit action-link"/>
                                                </Link>
                                                <Link title={"Delete"} to={''}>
                                                    <i className="bx bx-trash action-link"/>
                                                </Link>
                                                <a title={"Preview"} onClick={() => {
                                                    setShowModal(true)
                                                    setDataIndex(index);
                                                }}>
                                                    <i className="bx bx-card action-link"/>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>

                                )) : (<h1>No data to show</h1>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>

            {show &&
            <Modal
                isShowing={show}
                setIsShowing={setShowModal}
                title={teamData[dataIndex].name}>
                <div className="d-flex flex-sm-row flex-column justify-content-around">
                    <div>
                        <img
                            alt={teamData[dataIndex].name}
                            src={teamData[dataIndex].profilePicture.image}
                            style={{
                                maxWidth: '300px',
                                width: '300px',
                                maxHeight: '300px',
                                height: '300px',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <div>
                        <h1>{teamData[dataIndex].name}</h1>
                        <h3>{teamData[dataIndex].designation}</h3>
                        <h4><b>+91</b> {teamData[dataIndex].mobile}</h4>
                        <p><img alt={"linkedin"} className={"social-icons"} src={LinkedInIcon}/><b> LinkedIn </b><a
                            href={teamData[dataIndex].socialLinks.linkedin}>{teamData[dataIndex].socialLinks.linkedin}</a>
                        </p>
                        <p><img alt={"gmail"} className={"social-icons"} src={GmailIcon}/> <b>Gmail </b><a
                            href={teamData[dataIndex].socialLinks.gmail}>{teamData[dataIndex].socialLinks.gmail}</a></p>
                        <p><img alt={"website"} className={"social-icons"} src={WebsiteIcon}/> <b>Website </b><a
                            href={teamData[dataIndex].socialLinks.website}>{teamData[dataIndex].socialLinks.website}</a>
                        </p>
                    </div>
                    <div>

                    </div>
                </div>
            </Modal>}
        </>
    );
};

export default Team;
