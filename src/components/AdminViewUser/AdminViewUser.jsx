import React, {useState} from 'react';
import folderIcon from "../../assets/folder.svg";
import {TrashFill} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {apiAdmin} from "../../utils/utils";

function AdminViewUser({user, collections, formatDate, items, setActionDone}) {
    const [selected, setSelected] = useState()
    const [checked, setChecked] = useState({})
    const [show, setShow] = useState(false);
    const [error, setError] = useState()

    function handleSelection(e) {
        setSelected(e.target.id)
        setChecked({...checked, [e.target.id]: !checked})
    }

    function handleDelete() {
        if (!selected) {
            setError('Select item you want to delete')
            return
        }
        setShow(true)
    }

    async function handleDeleteSubmit() {
        const params = selected.split('-')
        console.log(params)
        await apiAdmin.post('/delete-items/', {
            item_name: params[0],
            item_id: parseInt(params[1])
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setActionDone(res.data.id)
        })
        setShow(false)
    }

    return (
        <div>
            {user && collections ? (
                <div>
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure ? </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={handleDeleteSubmit}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className={'row mt-3'}>
                        <div className={'col-3 d-lg-inline d-sm-none d-md-none d-extra-small'}>
                            <img style={{maxWidth: '300px'}} alt={'avatar'}
                                 src={user.avatar || 'https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg'}/>
                        </div>
                        <div className={'col-4 col-md-12 col-sm-12 d-md-inline d-sm-inline '}>
                            <h3>{user.name}</h3>
                            <p><strong>Bio : </strong>{user.bio || 'No bio was written yet'}</p>
                            <p><strong>Registered : </strong>{formatDate(user.date_registered)}</p>
                            <p><strong>Collections : </strong>{collections.length}</p>
                        </div>
                        <div className={'col-5'}>

                        </div>
                    </div>
                    <hr/>
                    <div className={'mx-0'}>
                        {error ? (
                            <div className={'alert alert-danger'}>{error}</div>
                        ) : null}
                        <section className={'d-flex justify-content-end h-25'}>

                            <TrashFill className={'trash'} onClick={handleDelete} color={'red'} size={40}/>
                        </section>
                        {collections.length > 0 && (
                            <div className={'mx-0'}>
                                <hr/>
                                <h3 className={'bg-black'}>Collections</h3>
                                <hr/>
                                {collections.map((collection, index) => (
                                    <div className={'bg-light'}>
                                        <p id={collection.id}
                                           className={'list-group-item mx-0'}
                                           key={index}>
                                            <input onChange={handleSelection} id={"collections-" + collection.id}
                                                   type={"checkbox"}/>
                                            <span><img onClick={handleSelection}
                                                       id={"collection-" + collection.id}
                                                       style={{maxWidth: '100px'}}
                                                       alt={'span'}
                                                       src={folderIcon}/></span>{collection.collection_name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            ) : null}
            <div className={'row'}>
                <hr/>
                <h3>Items : </h3>
                <hr/>
                {items ? (

                    items.map((item, index) => (
                        <div className={'bg-light'}>
                            <p className={'col-9'} key={index}><input onChange={handleSelection} id={"items-" + item.id}
                                                                      type={"checkbox"}/> <img
                                style={{maxWidth: '50px', maxHeight: '50px', borderRadius: '50%'}}
                                src={item.image}/> {item.title}</p>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}

export default AdminViewUser;