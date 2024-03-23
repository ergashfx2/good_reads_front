import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function MyBooksLiked({books}) {
    return (
        <div className={'container'}>
            <h1 className={'text-center btn-warning mt-1 mb-3'}>All books you liked </h1>
            <div className={'row'}>

            {books ? (
                books.map((book, index) => (
                    <div key={index} className={'col-lg-3 col-md-6 col-sm-12'}>

                    <Card style={{maxWidth: '15rem'}}>
                        <Card.Img variant="top" src={book.image}/>
                        <Card.Body>
                            <Card.Title><Link className={'card-title plain-text'} to={`/books/${book.id}`}>{book.title}</Link></Card.Title>
                        </Card.Body>
                    </Card>
                    </div>
                ))
            ) : null}
        </div>
                        </div>
    );
}

export default MyBooksLiked;
