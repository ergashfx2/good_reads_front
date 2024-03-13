import React, {useState} from 'react';
import "../CollectionItem/CollectionsItem.css"
const CollectionsItem = ({ subcategory }) => {
    return <li className={"list-group-item"}><a className={"link-custom"} href={`/${subcategory}`}>{subcategory} </a></li>;
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