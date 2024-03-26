import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {Link, useNavigate} from "react-router-dom";
import "../MyCollection/MyCollection.css"
import {ReactComponent as Folder} from "../../assets/folder.svg";

function MyCollection() {
    const [collections, setCollections] = useState("")
    const [checkedItems, setCheckedItems] = useState({});
    const [error,setError] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        api.get("/my-collections/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setCollections(response.data.collections);
        }).catch(error => {
            setError(error)
        });
    }, []);

    const handleCheck = async (e) => {
        const {id, checked} = e.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: checked,
        }));
    };

    const handleCollectionAdd = async (e)=>{
        navigate(`/collection/create/`)
    }

    return (
        <div className={"container"}>
            {error ? (
                <div className={"alert alert-danger"}>
                    {error}
                </div>
            ) : null}
            <section>
                <button onClick={handleCollectionAdd} className={"btn btn-success mt-2 mb-3 d-inline mx-2"}>Create New
                    Collection
                </button>
                <button className={"btn btn-warning mt-2 mb-3 d-inline mx-2"}>Rename
                </button>
                <button className={"btn btn-danger mt-2 mb-3 d-inline"}>Delete Collection
                </button>
            </section>
            <div className="list-group">
                {collections ? (
                    collections.map((collection) => (
                        <li className="list-group-item d-flex justify-content-between align-items-start"
                            key={collection.id}>
                            <div className="ms-2 me-auto">
                                <input className={"d-inline mx-2"}
                                       checked={checkedItems[collection.id] || false}
                                       value={collection.collection_name} type="checkbox"
                                       id={collection.id} onChange={handleCheck}/>
                                <label><Folder/><span className={"d-inline"}><Link className={"mx-2 plain-text fw-bold"}
                                                                                   to={`/collection/${collection.id}`}>{collection.collection_name}</Link></span></label>
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