import React from 'react';

function FeedsItem(props) {
    return (
        <div className="container z-0">
            <section className="mx-auto" style={{width: "42rem"}}>

                <div className="card">
                    <div className="card-body d-flex flex-row">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                             className="rounded-circle me-3" height="50px"
                             width="50px" alt="avatar"/>
                        <div>
                            <h5 className="card-title font-weight-bold mb-2">{props.title}</h5>
                            <p className="card-text"><strong>By </strong>{props.author}</p>
                        </div>
                    </div>
                    <div className="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img className=" rounded mx-auto d-block"
                             src={props.image}
                             alt="Card image cap"/>
                        <a href="#!">
                            <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className={`card-text'}`} id="collapseContent">
                            {props.desc}
                        </p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-link link-danger p-md-1 my-1">'Read more'</button>
                            <div>
                                <i className="fas fa-share-alt text-muted p-md-1 my-1 me-2" data-mdb-toggle="tooltip"
                                   data-mdb-placement="top" title="Share this post"></i>
                                <i className="fas fa-heart text-muted p-md-1 my-1 me-0" data-mdb-toggle="tooltip"
                                   data-mdb-placement="top"
                                   title="I like it"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default FeedsItem;