import React from 'react';
import {Search} from "react-bootstrap-icons";
import './Search.css'
function SearchNav({feeds,setNewFeeds}) {
const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFeeds = feeds.filter(obj =>
        obj.title.toLowerCase().includes(searchTerm) ||
        obj.category.toLowerCase().includes(searchTerm) ||
        obj.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    if (searchTerm.length === 0) {
        setNewFeeds(feeds);
        return;
    }

    setNewFeeds(filteredFeeds);
}


    return (
        <div className={'container mt-2'}>
            <div className={"col input-group mb-3"}>
                <input onChange={handleSearch} className={"form-control"}
                       aria-describedby={'search'} placeholder={"Search"}/>
                <span className="input-group-text" id="search"><Search/></span>
            </div>
        </div>
    );
}

export default SearchNav;