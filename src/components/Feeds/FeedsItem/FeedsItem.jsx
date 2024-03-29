import React, { useState } from "react";
import "./FeedsItem.css";
import { Link } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { ChatDots, HandThumbsUp } from "react-bootstrap-icons";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { Toast } from "react-bootstrap";
import api from "../../../utils/utils";

function FeedsItem(props) {
  const [display, setDisplay] = useState("none");
  const [liked, setLiked] = useState(props.liked);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState();
  const showComments = async (event) => {
    setDisplay("block");
    if (display === "block") {
      setDisplay("none");
    }
  };

  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };

  const handleLike = async (event) => {
    if (!localStorage.getItem("token")) {
      setShow(!show);
      return;
    }

    try {
      await api
        .post(
          "/like/",
          { item_id: props.item_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLiked(!liked);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (event) => {
    if (!localStorage.getItem("token")) {
      setShow(!show);
      return;
    }

    try {
      await api.post(
        "/comment/",
        { comment: comment, item_id: props.item_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      const ShareData = {
        url: window.location.href,
      };
      await navigator.share(ShareData);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleToggleClose = async () => {
    setShow(!show);
  };
  const handleUnlike = async () => {
    try {
      await api
        .post(
          "/unlike/",
          { book_id: props.book_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLiked(!liked);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container z-0">
      <section className="mx-auto" style={{ width: "42rem" }}>
        <div className="card">
          <div className="card-body d-flex flex-row">
            {props.avatar ? (
              <img
                src={props.avatar}
                className="rounded-circle me-3"
                height="50px"
                width="50px"
                alt="avatar"
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
                className="rounded-circle me-3"
                height="50px"
                width="50px"
                alt="Default social media profile avatar"
              />
            )}
            <div>
              <Link
                className={"plain-text link-danger h4 d-block"}
                to={`/items/${props.item_id}`}
              >
                {props.title}
              </Link>
              <Link
                to={`author/${props.author_id}`}
                className={"card-text fw-bold text-decoration-none plain-text"}
              >
                {props.author}
              </Link>
            </div>
          </div>
          <div
            className="bg-image hover-overlay ripple rounded-0"
            data-mdb-ripple-color="light"
          >
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className=" feeds-image rounded mx-auto d-block"
              loading={"eager"}
              src={props.image}
              alt="Card image cap"
            />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </div>
          <div className="card-body">
            <div
              className={`card-text'}`}
              id="collapseContent"
              dangerouslySetInnerHTML={{ __html: props.desc.slice(0, 200) }}
            ></div>
            <div className="small d-flex justify-content-start">
              {liked ? (
                <div>
                  <a
                    onClick={handleUnlike}
                    id={props.book_id}
                    className="d-flex align-items-center text-decoration-none me-3"
                  >
                    <BsHandThumbsUpFill
                      id={props.book_id}
                      onClick={handleUnlike}
                      size={20}
                      className={"m-2"}
                    />
                    <p
                      onClick={handleUnlike}
                      id={props.book_id}
                      className="mb-0"
                    >
                      Like
                    </p>
                  </a>
                </div>
              ) : (
                <div>
                  <a
                    onClick={handleLike}
                    id={props.book_id}
                    className="d-flex align-items-center text-decoration-none me-3"
                  >
                    <HandThumbsUp
                      id={props.book_id}
                      onClick={handleLike}
                      size={20}
                      className={"m-2"}
                    />
                    <p onClick={handleLike} id={props.book_id} className="mb-0">
                      Like
                    </p>
                  </a>
                  <Toast show={show} onClose={handleToggleClose}>
                    <Toast.Header>
                      <strong className="me-auto">Warning</strong>
                    </Toast.Header>
                    <Toast.Body>
                      You need to{" "}
                      <Link to={"/sign-in/"} className={"text-decoration-none"}>
                        Login
                      </Link>
                    </Toast.Body>
                  </Toast>
                </div>
              )}
              <a
                onClick={showComments}
                className="d-flex align-items-center me-3 text-decoration-none"
              >
                <ChatDots size={20} className={"me-2"} />
                <p className="mb-0">Comment</p>
              </a>
              <a
                onClick={handleShare}
                className="d-flex align-items-center text-decoration-none me-3"
              >
                <FaShare size={20} className={"me-2"} />
                <p className="mb-0">Share</p>
              </a>
            </div>
          </div>
          <div
            className="card-footer py-3 border-0"
            style={{ backgroundColor: "#f8f9fa;", display: display || "none" }}
          >
            <div className="d-flex flex-start w-100">
              <div className="form-outline w-100">
                <textarea
                  onChange={handleCommentChange}
                  className="form-control"
                  id="comment"
                  rows="4"
                  style={{ background: "#fff;" }}
                ></textarea>
                <label className="form-label" for="comment">
                  Message
                </label>
              </div>
            </div>
            <div className="float-end mt-3 pt-1">
              <button
                onClick={handleComment}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Post comment
              </button>
              <button
                onClick={showComments}
                type="button"
                className="btn btn-outline-primary btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeedsItem;
