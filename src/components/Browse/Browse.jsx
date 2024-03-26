import React from 'react';
import "./Browse.css"
import {Link} from "react-router-dom";

function Browse({items}) {
    return (
        <div className="row mt-4">
            <h1 className={'text-center btn-warning mb-3'}>All items</h1>
            {items.map((item, index) => (
                <div key={index} className="card-custom col-lg-3 col-md-6 col-sm-6  mb-4 mb-lg-0 d-flex">
                    <div className="card rounded shadow-sm border-0 flex-fill">
                        <div className="card-body p-4 d-flex flex-column justify-content-between">
                            <img src={item.image} alt="" className="img-fluid d-block mx-auto mb-3"></img>
                            <h5 className="card-title"><Link className={'plain-text'}
                                                             to={`/items/${item.id}`}>{item.title}</Link></h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Browse;