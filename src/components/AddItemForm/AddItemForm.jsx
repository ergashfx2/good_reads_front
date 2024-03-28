import React, {useEffect, useState} from "react";
import UploadImages from "./UploadImages";
import Form from "react-bootstrap/Form";
import "./AddItemForm.css";
import {XCircleFill} from "react-bootstrap-icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BuildCustom from "./BuildCustom";
import api from "../../utils/utils";

const AddItemForm = () => {
    const [tags, setTags] = useState([]);
    const [tagsInput, setTagInput] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [status, setStatus] = useState("ready");
    const [buttonText, setButtonText] = useState("Create Now");
    const [buttonClass, setButtonClass] = useState("btn btn-primary mt-3 w-100");
    const navigate = useNavigate();
    const params = useParams();
    const [custom, setCustom] = useState()
    const [customData, setCustomData] = useState([])
    const [category, setCategory] = useState()

    useEffect(() => {
        const GetCustoms = async () => {
            await api.get('/get-collection/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    id: params.colID
                }
            }).then(res => {
                setCustom(res.data.collection[0].custom_fields)
            })
        }
        GetCustoms()
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (newValue) => {
        setDescription(newValue);
    };

    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setTags([...tags, e.target.value]);
            setTagInput("");
        }
    }

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleImagesUrl = (data) => {
        setImageUrls(data);
    }

    useEffect(() => {
        if (status === "pending") {
            setButtonClass("btn btn-primary mt-3 w-100 disabled");
            setButtonText("Pending");
        } else {
            setButtonClass("btn btn-primary mt-3 w-100");
            setButtonText("Create Now");
        }
    }, [status]);

    useEffect(() => {
        const collection = params.colID;
        if (imageUrls.length > 0) {
            (imageUrls)
            setStatus("ready");
            const ItemData = {
                title: title,
                description: description,
                collection: collection,
                tags: tags,
                images: imageUrls,
                customData: customData,
                category: category
            };
            api.post('/create-item/', ItemData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                navigate(`/collection/${params.colID}`)
            })
        }
    }, [imageUrls]);

    const handleSubmit = async (e) => {
        setSubmitted(!submitted)
        (e.target)
    }

    function handleCategory(e) {
        setCategory(e.target.value)

    }

    return (
        <div className={'container'}>
            <h3 style={{height: "4rem"}} className={"text-warning pt-2 bg-primary rounded"}>Form</h3>
            <Form className={'form-control'}>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter title </Form.Label>
                    <Form.Control onChange={handleTitleChange} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter detailed description </Form.Label>
                    <ReactQuill onChange={handleDescriptionChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter category </Form.Label>
                    <Form.Control onChange={handleCategory} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter tags </Form.Label>
                    <div className={"form-control"} style={{height: '200px'}}>
                        <input
                            onChange={handleTagInput}
                            onKeyDown={handleKeyDown}
                            value={tagsInput}
                            className={'form-control d-block'}
                            type={'text'}
                            placeholder={"Enter tag ..."}
                        />
                        <div className="tags-container mt-4">
                            {tags.map((tag, index) => (
                                <span key={index} className="tag bg-light">{tag} <XCircleFill
                                    onClick={() => removeTag(index)}
                                    color={"red"} size={20}
                                    className={'mx-2'}/></span>
                            ))}
                        </div>
                    </div>
                </Form.Group>

            </Form>
            {custom ? (<BuildCustom setCustomData={setCustomData} fields={custom}/>):null}
            <UploadImages handleImagesUrl={handleImagesUrl} setImagesUrl={setImageUrls} submitted={submitted}/>
            <Button className={buttonClass} onClick={handleSubmit} variant={'primary'}>{buttonText}</Button>
        </div>
    );
};

export default AddItemForm;
