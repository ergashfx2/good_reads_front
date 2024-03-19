import React from 'react';
import "./Feeds.css"
import FeedsItem from "./FeedsItem/FeedsItem";

function Feeds(props) {
    return (
        <div className={'feeds-container mt-3'}>
            {props.books && props.books.map((book,index)=>(
                          <FeedsItem key={index} title={book.title} author={book.author} image={book.image} desc={book.description}/>
            ))}
        </div>
    );
}

export default Feeds;