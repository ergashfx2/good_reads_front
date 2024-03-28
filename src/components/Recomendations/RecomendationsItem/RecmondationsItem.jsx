import React from "react";
import "../RecomendationsItem/RecomendationsItem.css";
import { Link } from "react-router-dom";

function RecmondationsItem(props) {
  return (
    <div className={"rec-item"}>
      <div className="card" style={{ width: "25rem" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={props.image} className="card-img" alt="image" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link
                to={`/items/${props.id}`}
                className={"card-title plain-text"}
              >
                {props.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecmondationsItem;
