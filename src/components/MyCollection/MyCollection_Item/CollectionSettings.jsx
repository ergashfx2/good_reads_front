import React, {useState} from "react";
import UploadImages from "../../AddItemForm/UploadImages";
import Form from "react-bootstrap/Form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from "react-router-dom";
import CustomFields from "./CustomFields";
import api from "../../../utils/utils";
import Button from "react-bootstrap/Button";

const CollectionSettings = () => {
    const navigate = useNavigate();
    const [customFields, setCustomFields] = useState([]);
    const [title, setTitle] = useState()
    const handleTitle = async (e) => {
        setTitle(e.target.value)
    }

const handleSubmit = async () => {
    if (customFields.length !== 0) {
        const token = localStorage.getItem('token');

        try {
            await api.post(
                '/create-collection/',
                {
                    collection_name: title,
                    custom_fields: customFields
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Request sent successfully');
            navigate('/my-collections/');
        } catch (error) {
            console.error('Error:', error);
        }
    }
};


    return (
        <div className={'container'}>
            <h3 style={{height: "4rem"}} className={"text-warning pt-2 bg-primary rounded"}>Collection creation</h3>
            <Form className={'form-control'}>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter title of collections </Form.Label>
                    <Form.Control onChange={handleTitle} type="text"/>
                </Form.Group>
                <div className={'alert alert-info'}>These are fixed collection fields please do not change anything and
                    add custom fields as much as you want
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter detailed description </Form.Label>
                    <ReactQuill/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter category </Form.Label>
                    <Form.Control/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter tags </Form.Label>
                    <div className={"form-control"}>
                        <input className={'form-control d-block'} type={'text'} placeholder={"Enter tag ..."}/>
                    </div>
                </Form.Group>
            </Form>
            <CustomFields customFields={customFields} setCustomFields={setCustomFields}/>
            <UploadImages/>
            <Button className={'w-100'} onClick={handleSubmit} variant={'primary'}>Create Now</Button>
        </div>
    );
};

export default CollectionSettings;
