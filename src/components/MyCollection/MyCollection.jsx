import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import "../MyCollection/MyCollection.css"
import {ReactComponent as Folder } from "../../assets/folder.svg";

function MyCollection(props) {
    const [collections, setCollections] = useState("")
    const [formData, setFormData] = useState({collection_name: ''});
    const [data, setData] = useState("")
    const [error,setError] = useState("")
    const [selectedValues,setSelectedValues] = useState([])
    const [CheckedValues ,setCheckedValue] = useState({})
    const [show,setShow] = useState(false)
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

    const handleShowModal = () => setShow(true)
    const handleCloseModal= () => setShow(false)

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
            if (res.status === 200) {
                setData(res.data.id)
                await handleCloseModal()
            }

        } catch (error) {
            setError(error.response.data.message)

        }
    }

    const handleSelected = (e) =>{
        const { value, checked } = e.target;
        if (checked) {
            setSelectedValues(prevSelectedValues =>[...selectedValues,value]);
            setCheckedValue({...CheckedValues,[value]: checked})


        }


    }

    const HandleDelete = async ()=> {
        const token = localStorage.getItem('token')
        try {
            const res = await api.post("/delete-collections/", {selectedValues}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (res.status ===200) {
                setData(res.data.id)
            }

        }catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={"container"}>
                        {error ? (
                            <div className={"alert alert-danger"}>
                                {error}
                            </div>
                        ): null}
            <section>
                <button className={"btn btn-success mt-2 mb-3 d-inline mx-2"} onClick={handleShowModal}>Create New
                    Collection
                </button>
                <button className={"btn btn-danger mt-2 mb-3 d-inline"} onClick={HandleDelete}>Delete Collection</button>
            </section>
            <Modal show={show} onHide={handleCloseModal}>
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
            </Modal>
            <div className="list-group">
                {collections ? (
                    collections.map((collection) => (
                        <li className="list-group-item d-flex justify-content-between align-items-start" key={collection.id}>
                            <div className="ms-2 me-auto">
                                <input className={"d-inline mx-2"} checked={CheckedValues[collection.collection_name] || false} value={collection.collection_name} type="checkbox" id={`checkbox-${collection.id}`} onChange={handleSelected}/>
                                <label><Folder /><span className={"d-inline"}><Link className={"mx-2 plain-text fw-bold"} to={`/collection/${collection.id}`}>{collection.collection_name}</Link></span></label>
                            </div>
                            <span className="badge badge-primary rounded-pill">14</span>
                        </li>
                    ))
                ) : null}
            </div>

        </div>
    );
}

export default MyCollection;