import React from 'react';
import "./FeedsItem.css"
function FeedsItem(props) {
    return (
        <div className="container z-0">
            <section className="mx-auto" style={{width: "42rem"}}>

                <div className="card">
                    <div className="card-body d-flex flex-row">
                        <img src="https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
                             className="rounded-circle me-3" height="50px"
                             width="50px" alt="avatar"/>
                        <div>
                            <h5 className="card-title font-weight-bold mb-2">{props.title}</h5>
                            <p className="card-text"><strong>By </strong>{props.author}</p>
                        </div>
                    </div>
                    <div className="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img className=" feeds-image rounded mx-auto d-block"
                             src={props.image}
                             alt="Card image cap"/>
                        <a href="#!">
                            <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                        </a>
                    </div>
                    <div className="card-body">
                        <div className={`card-text'}`} id="collapseContent" dangerouslySetInnerHTML={{__html: props.desc.slice(0,200)}}>

                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-link link-danger p-md-1 my-1">Read more</button>
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