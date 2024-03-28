import React, { useState } from "react";
import "./Author.css";
import AuthorTable from "./AuthorTable";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Author({ author }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={"w-100"}>
      <div className={"row"}>
        <div className={"col-3 left-side border-end border-1"}>
          {author ? (
            <div className={"h-100"}>
              <img
                src={
                  author.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
                }
                className={"image-author mt-3 mx-5"}
                alt={"img"}
              />
            </div>
          ) : null}
        </div>
        <div className={"col-7"}>
          {author ? (
            <div className={"mt-4 mx-1"}>
              <p className={"display-4 mx-5"}>{author.name}</p>
              <p className={"author mx-5"}>ID : {author.id}</p>
              <div className={"mx-5"}>
                <div
                  className={" d-inline"}
                  dangerouslySetInnerHTML={{ __html: author.bio }}
                ></div>
                <AuthorTable
                  date={author.date_registered}
                  address={author.address}
                  email={author.email}
                />
              </div>
              <div className={"mx-5 mt-4"}>
                <h3>Author's collection</h3>
                <hr className={"solid w-100"} />
                <div className={"row"}>
                  {author.user_items
                    ? author.user_items.map((item, index) => (
                        <Card key={index} style={{ maxWidth: "15rem" }}>
                          <Card.Img variant="top" src={item.image} />
                          <Card.Body>
                            <Card.Title>
                              <Link
                                className={"plain-text"}
                                to={`/items/${item.id}`}
                              >
                                {item.title}
                              </Link>
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={"col-2"}></div>
      </div>
    </div>
  );
}

export default Author;
