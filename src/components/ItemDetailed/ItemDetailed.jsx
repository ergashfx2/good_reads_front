import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {useParams} from "react-router-dom";
import "./ItemDetailed.css"
import Table from "./Table";


function ItemDetailed(props) {
    const [item, setitem] = useState()
    const params = useParams()
    const [showMore, setShowMore] = useState(false)
    const [comments, setComments] = useState()
    const [show, setShow] = useState(false);
    useEffect(() => {
        try {
            api.get("/item-detail/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    item_id: `${params.itemID}`
                }
            }).then(res => {
                setitem(res.data.item[0]);
                let comments = []
                res.data.item.map((item) => {
                    comments.push({
                        comment: item.comment,
                        commentator: item.commenter_name,
                        commentator_avatar: item.commenter_avatar
                    })
                })
                setComments(comments)
            });
        } catch (error) {
            console.log(error);
        }
    }, [params.itemID]);

    const handleLike = async (event) => {
        if (!localStorage.getItem('token')) {
            setShow(!show)
            return
        }

        try {
            await api.post('/like/', {item_id: params.itemID}, {
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
                    {item ? (
                        <div className={"h-100"}>
                            <img src={item.image} className={"image-item mx-5"} alt={'img'}/>
                            <button onClick={handleLike} className={"mx-3 mt-3 fs-4 btn btn-outline-success button-custom"}>I want to read
                            </button>
                        </div>
                    ) : null}

                </div>
                <div className={"col-7"}>
                    {item ? (
                        <div className={"mt-4 mx-1"}>
                            <p className={'display-4 item-title mx-5'}>{item.title}</p>
                            <p className={'display-6 author mx-5'}>{item.author_name}</p>
                            {showMore ? (
                                <div className={'mx-5'}>
                                    <div className={" d-inline"}
                                         dangerouslySetInnerHTML={{__html: item.description}}></div>
                                    <span className={"p-0 btn btn-link link-secondary"} onClick={() => {
                                        setShowMore(false)
                                    }}>Show Less
                                    </span>
                                    <Table item={item}/>
                                </div>

                            ) : (
                                <div className={'mx-5'}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: item.description.slice(0, 500)}}></div>
                                    <span className={"p-0 btn btn-link link-secondary "} onClick={() => {
                                        setShowMore(true)
                                    }}>Show more
                                    </span>
                                    <Table item={item}/>
                                    <h4 className={'mt-5'}>Comments {comments.length - 1}</h4>
                                    <hr/>
                                    {comments && comments.length > 1 ? (
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

export default ItemDetailed;