import React, {useEffect, useState} from "react";
import UploadImages from "../AddItemForm/UploadImages";
import Form from "react-bootstrap/Form";
import "../AddItemForm/AddItemForm.css";
import {XCircleFill} from "react-bootstrap-icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BuildCustom from "../AddItemForm/BuildCustom";
import api from "../../utils/utils";
const EditItemForm = ({item}) => {
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
    const [custom, setCustom] = useState();
    const [customData, setCustomData] = useState([]);
    const [category, setCategory] = useState('');
    const [setted, setSetted] = useState(false)

    if (item && !setted) {
        console.log(item.image)
        setDescription(item.description)
        setCustom(item.customData)
        setTitle(item.title)
        setCategory(item.category)
        setTags(item.tags)
        setSetted(true)
        setCustom(item.custom_field)
        setImageUrls([...imageUrls,item.image])
    }

    if (imageUrls){
        console.log(imageUrls)
    }

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
        if (submitted) {
            setStatus("ready");
            const ItemData = {
                title: title,
                description: description,
                tags: tags,
                images: imageUrls,
                customData: customData,
                category: category,
                id: params.id,
                collection : params.colID
            };
            api.patch('/update-item/', ItemData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                navigate(`/collection/${params.colID}`)
            })
        }
    }, [submitted]);

    const handleSubmit = async (e) => {
        setSubmitted(!submitted)
        console.log(e.target)
    }

    function handleCategory(e) {
        setCategory(e.target.value)

    }

    return (
        <div className={'container'}>
            <h3 style={{height: "4rem"}} className={"text-warning pt-2 bg-primary rounded"}>Collection creation</h3>
            <Form className={'form-control'}>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter title of collections </Form.Label>
                    <Form.Control value={title} onChange={handleTitleChange} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter detailed description </Form.Label>
                    <ReactQuill value={description} onChange={handleDescriptionChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter category </Form.Label>
                    <Form.Control value={category} onChange={handleCategory} type="text"/>
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
            <BuildCustom setCustomData={setCustomData} fields={custom}/>
            <UploadImages handleImagesUrl={handleImagesUrl} setImagesUrl={setImageUrls} submitted={submitted}/>
            <Button className={buttonClass} onClick={handleSubmit} variant={'primary'}>{buttonText}</Button>
        </div>
    );
};

export default EditItemForm;
