import React, {useEffect, useState} from "react";
import UploadImages from "./UploadImages";
import Form from "react-bootstrap/Form";
import "./AddBookForm.css"
import {XCircleFill} from "react-bootstrap-icons";
import {bookCategories, createBook} from "../../utils/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useParams} from "react-router-dom";

const AddBookForm = () => {
    const [tags, setTags] = useState([])
    const [tagsInput, setTagInput] = useState()
    const [subcategories, setSubcategories] = useState([])
    const [category, setCategory] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [subcategorySelected, setSubCategorySelected] = useState()
    const params = useParams()
    const [status, setStatus] = useState("ready")
    const [buttonText, setButtonText] = useState("Create Now");
    const [buttonClass, setButtonClass] = useState("btn btn-primary mt-3 w-100");
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (newValue) => {
        setDescription(newValue);
    };

    const handleTagInput = (e) => {
        setTagInput(e.target.value)

    }
    const getSubcategoriesByCategory = (category) => {
        const selectedCategory = bookCategories.find(cat => cat.category === category);
        return selectedCategory ? selectedCategory.subcategories : [];
    };

    const handleCategory = (e) => {
        const listCategories = getSubcategoriesByCategory(e.target.value)
        setCategory(e.target.value)
        setSubcategories(listCategories)
    }

    const handleSubCategory = (e) => {
        setSubCategorySelected(e.target.value)

    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setTags([...tags, e.target.value])
            setTagInput("")
        }
    }

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleImagesUrl = (data) => {
        setImageUrls(data)
    }

    useEffect(() => {
        if (status === "pending") {
            setButtonClass("btn btn-primary mt-3 w-100 disabled")
            setButtonText("Pending")

        } else {
            setButtonClass("btn btn-primary mt-3 w-100")
            setButtonText("Create Now")
        }
    }, [status]);

    useEffect(() => {
        const collection = params.colID
                if (imageUrls.length > 0) {
                    console.log(imageUrls)
            setStatus("ready");
            const BookData = {
                title: title,
                description: description,
                category: category,
                subcategory: subcategorySelected,
                images: imageUrls,
                collection: collection,
                tags: tags
            };
                     createBook(BookData).then(res => {
                console.log(res)
                setSubmitted(false)
                         setImageUrls([])
            });
        }

    }, [imageUrls,]);

    const handleSubmit = async (e) => {
        if (description && title && category && subcategories && imageUrls){
                 e.preventDefault()
        setSubmitted(true)
        setStatus("pending")
        }else {
            alert("Please fill all fields")
        }
    }


    return (
        <div className={'container'}>
            <h3 style={{height: "4rem"}} className={"text-warning pt-2 bg-primary rounded"}>Book creation</h3>
            <Form className={'form-control'}>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter book's title </Form.Label>
                    <Form.Control onChange={handleTitleChange} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter detailed description </Form.Label>
                    <ReactQuill
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Select category </Form.Label>
                    <Form.Select onChange={handleCategory} aria-label="Default select example">
                        <option>Open this select menu</option>
                        {bookCategories && bookCategories.map((category, index) => (
                            <option key={index} value={category.category}>{category.category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Select subcategory </Form.Label>
                    <Form.Select onChange={handleSubCategory} aria-label="Default select example">
                        <option>Open this select menu</option>
                        {subcategories && subcategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"fw-bold"}>Enter tags </Form.Label>
                    <div className={"form-control"}>
                        <ul className={"tags-list d-block"}>
                            <input onChange={handleTagInput} value={tagsInput} onKeyDown={handleKeyDown}
                                   className={'form-control d-block'} type={'text'} placeholder={"Enter tag ..."}/>
                            {tags && tags.map((tag, index) => (
                                <li className={'btn btn-light'} key={index}>
                                    <span>{tag}</span>
                                    <XCircleFill onClick={() => removeTag(index)} color={"red"} size={20}
                                                 className={'mx-2'}/>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </Form.Group>
            </Form>
            <UploadImages submitted={submitted} handleImagesUrl={handleImagesUrl}/>
            <button className={buttonClass} onClick={handleSubmit}>{buttonText}</button>
        </div>
    );
};

export default AddBookForm;
