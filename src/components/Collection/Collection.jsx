import React from 'react';
import "../Collection/Collections.css";

function Collection({ feeds, setNewFeeds }) {
    function handleCategory(e) {
        const category = e.target.textContent;
        if (category === 'All') {
            setNewFeeds(feeds);
            return;
        }
        const uniqueFeeds = feeds.filter(feed => feed.category === category);
        setNewFeeds(uniqueFeeds);
    }

    const uniqueCategories = Array.from(new Set(feeds.map(feed => feed.category)));

    return (
        <div className='mt-3'>
            <button onClick={handleCategory} className='btn btn-outline-secondary'>All</button>
            {uniqueCategories.map((category, index) => (
                <button key={index} onClick={handleCategory} className='btn btn-outline-secondary'>{category}</button>
            ))}
        </div>
    );
}

export default Collection;
