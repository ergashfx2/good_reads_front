import React, {useState} from 'react';
import "../CollectionItem/CollectionsItem.css"
import {Link} from "react-router-dom";


const CollectionsItem = ({subcategory,setCategory}) => {
    const handleFilter = async (e) => {
    setCategory(e.target.textContent);
}

    return <li className={"list-group-item"}><Link className={'plain-text'} onClick={handleFilter} to={``}>{subcategory}</Link></li>;
};
const CollectionItem = ({category,setCategory}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <button className="mx-3 btn btn-outline-dark mt-2" onClick={toggleCollapse}>
                {category.category}
            </button>
            <div className={`collapse mt-2 ${isOpen ? 'show' : ''}`}>
                <ul className="list-group">
                    {category.subcategories.map((subcategory, index) => (
                        <div>
                            <CollectionsItem setCategory={setCategory} key={index} subcategory={subcategory}/>
                        </div>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default CollectionItem;