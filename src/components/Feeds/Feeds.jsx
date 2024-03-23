import React from 'react';
import "./Feeds.css"
import FeedsItem from "./FeedsItem/FeedsItem";

function Feeds(props) {
    return (
        <div className={'feeds-container mt-3'}>
            {props.books && props.books.length > 0 ? (
                console.log(props.likes),
                props.books.map((book, index) => {
                    const liked = props.likes && props.likes.includes(book.id);
                    console.log(liked)
                    return (
                        <FeedsItem
                            author_id={book.author_id}
                            avatar={book.avatar}
                            key={index}
                            book_id={book.id}
                            title={book.title}
                            author={book.author}
                            image={book.image}
                            desc={book.description}
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
