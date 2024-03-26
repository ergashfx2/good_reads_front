import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CollectionItems.css"

function Collection_Items(props) {
    const params = useParams()
    // eslint-disable-next-line no-unused-vars
    const [success, setSuccess] = useState()
    const navigate = useNavigate()
    const [items, setItemss] = useState()
    useEffect(() => {
        try {

            api.get("/collection-items/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    collection_id: `${params.colID}`

                }

            }).then(res => {
                console.log(res.data)
                setSuccess(res.data.message)
                setItemss(res.data)
            })

        } catch (error) {
            console.log(error)

        }
    }, [params.colID]);

    const HandleAdditem = () => {
        navigate(`/collection/add-item/${params.colID}/`)
    }

    return (
        <div className={"container justify-content-start"}>
            <section style={{height: "60px", width: "100%"}}>
                <Button variant={'success'} className={'btn-lg mt-3'} onClick={HandleAdditem} type={'button'}>
                    Add item
                </Button>
            </section>
            <div className={'row'}>
                {items ? (
                    items.items.map((item, index) => (
                        <div className={'mt-3 col-lg-2 col-md-6 col-sm-12'}>
                        <Link key={index} className={'mt-4'} style={{maxWidth: '15rem'}} to={`/items/${item.id}`}>
                            <img loading={"eager"} src={item.image} alt="" className="card-img-top"/>
                        </Link>
                        </div>
                    ))
                ) : (
                    <div className={"alert alert-warning w-50 mt-3"}>
                        You don't have items yet
                    </div>
                )}
            </div>
        </div>
    );
}

export default Collection_Items;