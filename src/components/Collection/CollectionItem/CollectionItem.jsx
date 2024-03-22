import React, {useState} from 'react';
import "../CollectionItem/CollectionsItem.css"
import {Link} from "react-router-dom";
const CollectionsItem = ({ subcategory, setCategory }) => {
    return <li className={"list-group-item"}><Link onClick={setCategory} to={''}>{subcategory}</Link></li>;
};
const CollectionItem = ({ category }) => {
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
            <CollectionsItem key={index} subcategory={subcategory} />
          ))}
        </ul>
      </div>
    </div>

    );
}

export default CollectionItem;