import React, {useState} from 'react';
import './style.scss'
import Layout from "../../Components/Layout";
import Modal from "../../Components/UI/Modal/Modal";
import {Formik} from "formik";
import * as Yup from 'yup';


const Products = () => {
    const [show, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    // const handleClose = () => setShow(false);
    const handleShow = () => {
        setShowModal(true)
    };
    const showModal = () => {
        setShowModal(!show);
    }

    const submitData = () => {
    }

    return (
        <>
            <Layout>
                <section id={"productSection"}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Add Product</h1>
                        <div>
                            <button className="btn btn-primary" onClick={handleShow}>Add+</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-s">
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Url</th>
                                <th scope="col">Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <td>
                                    <button className="btn btn-info">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <Modal
                        isShowing={show}
                        setIsShowing={setShowModal}
                        title="Add Team">
                        {/*<Formik*/}
                        {/*    initialValues={{*/}
                        {/*        name:'',*/}
                        {/*        email:'',*/}
                        {/*        mobile:'',*/}
                        {/*        designation:''*/}
                        {/*    }}*/}
                        {/*    validationSchema={Yup.Object({*/}
                        {/*        */}
                        {/*    })}>*/}

                        {/*</Formik>*/}
                    </Modal>
                </section>

            </Layout>

        </>
    );
};

export default Products;
