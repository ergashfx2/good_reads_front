import React, {useEffect, useState} from 'react';
import api from "../../utils/utils";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CollectionItems.css"
import {PencilSquare, TrashFill} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";

function Collection_Items(props) {
    const params = useParams()
    const [success, setSuccess] = useState()
    const navigate = useNavigate()
    const [items, setItemss] = useState()
    const [error, setError] = useState()
    const [checked, setChecked] = useState({})
    const [show, setShow] = useState(false)
    const [actionDone,setActionDone] = useState()
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
                setSuccess(res.data.message)
                setItemss(res.data)
            })

        } catch (error) {
            setError(error)

        }
    }, [actionDone]);

    const HandleAdditem = () => {
        navigate(`/collection/add-item/${params.colID}/`)
    }


    function handleCheck(e) {
        const {id, checked} = e.target
        setChecked({
            ...checked,
            [id]: checked


        })

    }


    function handleClick() {
        if (Object.keys(checked).length === 0 || Object.values(checked).every(value => value === false)) {
            setError("Select at least one item");
            return;
        }

        setShow(true)

    }

    function handleEdit (){
        navigate(`/edit-item/${Object.keys(checked)}/${params.colID}`)
    }


    async function handleDelete() {
        try {
            await api.delete('/delete-item/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    item_id: Object.keys(checked)
                }
            }).then(res=>{
                setShow(false)
                setActionDone(res.data)
            });
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }


    return (
        <div className={"container justify-content-start"}>
            {error ? (
                <div className={'alert alert-danger'}>{error}</div>
            ) : null}
            <section className={'mb-4'} style={{height: "60px", width: "100%"}}>
                <Button variant={'success'} className={'btn-lg mt-3'} onClick={HandleAdditem} type={'button'}>
                    Add item
                </Button>
                <PencilSquare onClick={handleEdit} size={53} color={'orange'} className={'mt-3 mx-1 icon'}/>
                <TrashFill onClick={handleClick} color={'red'} className={'mt-3 icon'} size={48}/>
            </section>
            <div className={'row'}>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                {items ? (
                    items.items.map((item, index) => (
                        <div key={index} className={'mt-3 col-lg-2 col-md-6 col-sm-12 mt-3'}>
                            <input
                                checked={checked[item.id] || false}
                                onChange={handleCheck}
                                id={item.id}
                                type="checkbox"
                            />
                            <Link className={'mt-4'} style={{maxWidth: '15rem'}} to={`/items/${item.id}`}>
                                <img loading="eager" src={item.image} alt="" className="card-img-top"/>
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