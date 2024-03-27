import "../Collection/Collections.css"
function Collection({feeds,setNewFeeds}) {

    function handleCategory (e){
        if (e.target.textContent === 'All'){
            setNewFeeds(feeds)
            return
        }
        const foundItems = feeds.find(obj => obj.category === e.target.textContent);
        setNewFeeds([foundItems])
    }

    return (
        <div className={'mt-3'}>
            <button onClick={handleCategory} className={'btn btn-outline-secondary'}>All</button>
            {feeds.map((feed) => (
                <div key={feed.id}>
                    <button onClick={handleCategory} className={'btn btn-outline-secondary'}>{feed.category}</button>
                </div>
            ))}
        </div>
    );
}


export default Collection;