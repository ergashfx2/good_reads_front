import React from 'react';
import folderIcon from "../../assets/folder-svgrepo-com.svg";
import {Card} from "react-bootstrap";

function AdminViewUser({user, handleCollection, collections, formatDate, items}) {
    return (
        <div>
            {user && collections ? (
                <div>
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
                        {collections.length > 0 && (
                            <ul className={'mx-0'}>
                                {collections.map((collection, index) => (
                                    <li onClick={handleCollection} id={collection.id} className={'list-group-item mx-0'}
                                        key={index}><span><img onClick={handleCollection} id={collection.id}
                                                               style={{maxWidth: '100px'}}
                                                               alt={'span'}
                                                               src={folderIcon}/></span>{collection.collection_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className={'row'}>
                    {items && items.length > 0 ? items.map((item, index
                    ) => (
                        <div className={'col-2 col-md-6 col-sm-12'}>
                        <input className={'d-inline'} type={"checkbox"}/>
                        <Card className={'col-4 col-md-6 col-sm-12'} style={{width: '18rem'}}>
                            <Card.Img variant="top" src={item.image}/>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                        </div>
                    )) : null}
                        </div>

                </div>
            ) : null}
        </div>
    );
}

export default AdminViewUser;