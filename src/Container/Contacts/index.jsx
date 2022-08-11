import React, {useEffect, useMemo, useState} from 'react';
import './styles.scss';
import Layout from "../../Components/Layout";
import axiosInstance from "../../Utils/axios";
import Modal from "../../Components/UI/Modal/Modal";
import {login} from "../../Redux/Actions";

const Contacts = () => {

    const [contactsQueriesList, setContactQueriesList] = useState([]);
    const [dataIndex, setDataIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const getContactQueries = async () => {
       await axiosInstance.get('/contact/getAllContactQueries').then((res) => {
            setContactQueriesList(res.data.contactList);
            console.log("Res", res)

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getContactQueries().then(r => console.log(r))
    }, [])

    const memoizeContactList = useMemo(() => getContactQueries(), [contactsQueriesList]);

    return (
        <>
            <Layout>
                <h1>Contacts Query</h1>
                <div className="table-responsive">
                    <table className={"table table-borderless"}>
                        <thead>
                        <th scope={"col"}>S.No</th>
                        <th scope={"col"}>Name</th>
                        <th scope={"col"}>Email</th>
                        <th scope={"col"}>Mobile</th>
                        <th scope={"col"}>Actions</th>
                        </thead>

                        <tbody>
                        {contactsQueriesList && contactsQueriesList.length > 0 ? contactsQueriesList.map((el, index) =>
                            (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.mobile}</td>
                                <td><a className={"action-link"} onClick={() => {
                                    setShowModal(true);
                                    setDataIndex(index)
                                }}>View Message</a></td>
                            </tr>)
                        ) : <h1>No data to Display</h1>}
                        </tbody>
                    </table>
                </div>
                {showModal &&
                <Modal
                    isShowing={showModal}
                    setIsShowing={setShowModal}
                    title={"View Query"}>
                    <p>
                        {contactsQueriesList[dataIndex].message}
                    </p>

                </Modal>}
            </Layout>


        </>
    );
};

export default Contacts;
