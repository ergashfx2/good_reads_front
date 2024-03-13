import React, {useEffect, useState} from 'react';
import "../MyCollections/MyCollections.css"
import api from "../../utils/utils";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function MyCollections(props) {
    const [collections, setCollections] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({collection_name: ''});
    const [data, setData] = useState("")
    const [error,setError] = useState("")
    useEffect(() => {
        api.get("/my-collections/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setCollections(response.data.collections);
        }).catch(error => {
            console.error("Error fetching collections:", error);
        });
    }, [data]);


        useEffect(() => {
        api.get("/my-collections/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setCollections(response.data.collections);
        }).catch(error => {
            console.error("Error fetching collections:", error);
        });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        setShowModal(false);
    };

    const handeModalSubmit = async (e) => {
        e.preventDefault()
        try {

            const token = localStorage.getItem('token')
            const res = await api.post("/create-collection/", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 400){
                setError(res)
            }
            if (res.status === 200) {
                setData(res.data.id)
                await handleCloseModal()
            }

        } catch (error) {
            // console.log(error.response.data.message)

        }
    }

    return (
        <div>
                        {error ? (
                            <div className={"alert alert-danger"}>
                                {error}
                            </div>
                        ): null}
            <section>
                <button className={"btn btn-success mt-2 mb-3 d-inline mx-2"} onClick={handleShowModal}>Create New
                    Collection
                </button>
                <button className={"btn btn-danger mt-2 mb-3 d-inline"}>Delete Collection</button>
            </section>
            <div className={`modal ${showModal ? 'show' : ''}`}
                 style={{display: showModal ? 'inline' : 'none', position: 'initial', width: "20%"}}>
                <Modal.Dialog>
                    <Modal.Header closeButton onHide={handleCloseModal}>
                        <Modal.Title>Collection form</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Collection name</Form.Label>
                                <Form.Control name={"collection_name"} onChange={handleChange} type="text"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                        <Button variant="success" onClick={handeModalSubmit} type={"button"}>Create Now</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
            <div className="list-group">
                {collections ? (
                    collections.map((name, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                            <div className="ms-2 me-auto">
                                <input type="checkbox" id={`checkbox-${index}`}/>
                                <label htmlFor={`checkbox-${index}`} className="fw-bold mx-2">{index + 1}. { name.collection_name}</label>
                            </div>
                            <span className="badge badge-primary rounded-pill">14</span>
                        </li>
                    ))
                ) : null}
            </div>

        </div>
    );
}

export default MyCollections;