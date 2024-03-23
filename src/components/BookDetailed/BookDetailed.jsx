import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {useParams} from "react-router-dom";
import "./BookDetailed.css"
import Table from "./Table";


function BookDetailed(props) {
    const [book, setBook] = useState()
    const params = useParams()
    const [showMore, setShowMore] = useState(false)
    const [comments, setComments] = useState()
    const [show, setShow] = useState(false);
    useEffect(() => {
        try {
            api.get("/book-detail/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    book_id: `${params.bookID}`
                }
            }).then(res => {
                setBook(res.data.book[0]);
                let comments = []
                res.data.book.map((book) => {
                    comments.push({
                        comment: book.comment,
                        commentator: book.commenter_name,
                        commentator_avatar: book.commenter_avatar
                    })
                })
                setComments(comments)
                console.log(comments)
            });
        } catch (error) {
            console.log(error);
        }
    }, [params.bookID]);

    const handleLike = async (event) => {
        if (!localStorage.getItem('token')) {
            setShow(!show)
            return
        }

        try {
            await api.post('/like/', {book_id: params.bookID}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res.data)
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={"w-100"}>
            <div className={"row"}>
                <div className={"col-3 left-side border-end border-1"}>
                    {book ? (
                        <div className={"h-100"}>
                            <img src={book.image} className={"image-book mx-5"} alt={'img'}/>
                            <button onClick={handleLike} className={"mx-3 mt-3 fs-4 btn btn-outline-success button-custom"}>I want to read
                            </button>
                        </div>
                    ) : null}

                </div>
                <div className={"col-7"}>
                    {book ? (
                        <div className={"mt-4 mx-1"}>
                            <p className={'display-4 book-title mx-5'}>{book.title}</p>
                            <p className={'display-6 author mx-5'}>{book.name}</p>
                            {showMore ? (
                                <div className={'mx-5'}>
                                    <div className={" d-inline"}
                                         dangerouslySetInnerHTML={{__html: book.description}}></div>
                                    <span className={"p-0 btn btn-link link-secondary"} onClick={() => {
                                        setShowMore(false)
                                    }}>Show Less
                                    </span>
                                    <Table book={book}/>
                                </div>

                            ) : (
                                <div className={'mx-5'}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: book.description.slice(0, 500)}}></div>
                                    <span className={"p-0 btn btn-link link-secondary "} onClick={() => {
                                        setShowMore(true)
                                    }}>Show more
                                    </span>
                                    <Table book={book}/>
                                    <h4 className={'mt-5'}>Comments {comments.length}</h4>
                                    <hr/>
                                    {comments ? (
                                        comments.map((comment, index) => (
                                            <div className="card mb-4" key={index}>
                                                <div className="card-body">
                                                    <p>{comment.comment}</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <img
                                                                src={comment.commentator_avatar}
                                                                alt="avatar" width="25"
                                                                height="25"/>
                                                            <p className="small mb-0 ms-2">{comment.commentator}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}

                                </div>

                            )}</div>
                    ) : null}
                </div>
                <div className={"col-2"}>

                </div>

            </div>
        </div>

    );
}

export default BookDetailed;