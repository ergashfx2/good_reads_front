import React, {useState} from 'react';
import folderIcon from "../../../assets/folder.svg";
import {Link} from "react-router-dom";

function MyCollectionItem({name,index}) {
        const [CheckedValues ,setCheckedValue] = useState({})
        const handleSelected = (e) =>{
        const { value, checked } = e.target;
        if (checked) {
            setCheckedValue({...CheckedValues,[value]: checked})


        }


    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
            <div className="ms-2 me-auto">
                <input className={"d-inline"} checked={CheckedValues[name.collection_name] || false}
                       value={name.collection_name} type="checkbox" id={`checkbox-${index}`} onChange={handleSelected}/>
                <label><img className={"mx-2"} src={folderIcon}/> <span className={"d-inline"}><Link className={"text-decoration-none "} to={`/collection/${index}`}>{name}</Link></span></label>
            </div>
            <span className="badge badge-primary rounded-pill">14</span>
        </li>
    );
}

export default MyCollectionItem;