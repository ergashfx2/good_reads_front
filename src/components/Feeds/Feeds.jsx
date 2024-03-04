import React from 'react';
import "./Feeds.css"
import FeedsItem from "./FeedsItem/FeedsItem";

function Feeds(props) {
    return (
        <div className={'feeds-container'}>
            {props.books && props.books.map((book)=>(
                          <FeedsItem title={book.title} author={book.author} image={book.image} desc={book.description}/>
            ))}
        </div>
    );
}

export default Feeds;