import React from 'react';
import "./Feeds.css"
import FeedsItem from "./FeedsItem/FeedsItem";

function Feeds(props) {
    return (
        <div className={'feeds-container mt-3'}>
            {props.items && props.items.length > 0 ? (
                (props.likes),
                props.items.map((item, index) => {
                    const liked = props.likes && props.likes.includes(item.id);
                    (liked)
                    return (
                        <FeedsItem
                            author_id={item.author_id}
                            avatar={item.avatar}
                            key={index}
                            item_id={item.id}
                            title={item.title}
                            author={item.author}
                            image={item.image}
                            desc={item.description}
                            liked={liked}
                        />
                    );
                })
            ) : (
                <h1 className={'alert alert-warning'}>Nothing found</h1>
            )}
        </div>
    );
}

export default Feeds;
