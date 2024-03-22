import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
function CollectionBooks(props) {
    const params = useParams()
    // eslint-disable-next-line no-unused-vars
    const [success, setSuccess] = useState()
    const navigate = useNavigate()
    const [books, setBooks] = useState()
    useEffect( () => {
            try {

            api.get("/collection-books/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    collection_id: `${params.colID}`

                }

            }).then(res =>{
                console.log(res.data)
                setSuccess(res.data.message)
                setBooks(res.data)
            })

        } catch (error) {
            console.log(error)

        }
    }, [params.colID]);

    const HandleAddBook = () => {
        navigate(`/collection/add-book/${params.colID}/`)
    }

    return (
        <div className={"container justify-content-start"}>
            <section style={{height: "60px", width: "100%"}}>
                <Button variant={'success'} className={'btn-lg mt-3'} onClick={HandleAddBook} type={'button'}>
                    Add Book
                </Button>
            </section>
            <div className={'row'}>
                {books ? (
                    books.books.map((book, index) => (
                            <div className="card col-lg-6 col-md-4 col-sm-2 mt-3" key={index} style={{width: "15rem"}}>
                                <img loading={"eager"} src={book.image} alt="" className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <Link className={'btn btn-success'} to={`/books/${book.id}`}>
                                        Detailed
                                    </Link>
                                </div>
                        </div>
                    ))
                ) : (
                    <div className={"alert alert-warning w-50 mt-3"}>
                        You don't have books yet
                    </div>
                )}
            </div>
        </div>
    );
}
    export default CollectionBooks;