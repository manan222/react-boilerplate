import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./createEditPost.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/postActions";
import { getPost } from "../../redux/actions/postActions";
import { Link } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { useRouteMatch } from "react-router-dom";
import { REQUIRED_FIELDS_ERROR } from "../../constants/constant";
import { startLoader } from "../../redux/actions/loaderActions";
import ButtonLoader from "../../components/common/ButtonLoader";
import moment from "moment";

export default function CreateEditPost() {
  const { postReducer: post } = useSelector((state) => state);
  const isLoading = useSelector(({ loaderReducer }) => loaderReducer.isLoading);
  const [errors, setErrors] = useState({ postText: "" });
  const [postText, setPost] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId]);

  const handleChange = ({ target: input }) => {
    setPost(input.value);
    let error;
    switch (input.name) {
      case "postText":
        error =
          input.value.length < 10
            ? "Text must be between 10 or 300 Characters Long"
            : "";
        setErrors({ ...errors, [input.name]: error });
        break;
      default:
        break;
    }
  };
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (validateForm(errors)) {
      if (postText !== "") {
        var postObject = {
          text: postText,
        };
        dispatch(startLoader());
        dispatch(createPost(postObject, history));
      } else {
        toast.warning(REQUIRED_FIELDS_ERROR);
      }
    }
  };
  toast.configure({
    position: "top-center",
    autoClose: 3000,
    transition: Zoom,
  });
  const prevName = useRef("");

  useEffect(() => {
    prevName.current = postText;
  });

  return (
    <>
      <div className="text-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-2"></div>
          <div className="col-lg-6 col-md-6 col-sm-8">
            <Form>
              {!postId && (
                <>
                  <Card className="card-corners">
                    <Card.Title className="text-center mt-4">
                      Create Post{" "}
                    </Card.Title>
                    <Card.Body>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Post</Form.Label>
                        <Form.Control
                          ref={prevName}
                          type="text"
                          placeholder="Enter post"
                          onChange={handleChange}
                          autoComplete="off"
                          name="postText"
                        />

                        <Form.Text className="text-muted">
                          <Form.Text>
                            {errors.postText.length > 0 && (
                              <span className="error">{errors.postText}</span>
                            )}
                          </Form.Text>
                        </Form.Text>
                      </Form.Group>
                      <div className="mt-3">
                        {isLoading ? (
                          <ButtonLoader color="info" />
                        ) : (
                          <Button
                            variant="info"
                            className="btn-style border-radius "
                            type="submit"
                            onClick={handlePost}
                          >
                            Submit
                          </Button>
                        )}
                        <Link to="/">
                          <Button
                            variant="danger"
                            type="submit"
                            className="ml-2 border-radius"
                          >
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}

              {postId && (
                <Card card-corners>
                  <Card.Title className="text-center mt-3">
                    Post Details
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      {" "}
                      <b>Description:</b>
                      {post?.post?.text}
                    </Card.Text>
                    <Card.Text>
                      <b>User Id:</b>
                      {post?.post?.user}
                    </Card.Text>
                    <Card.Text>
                      {" "}
                      <b>Date:</b>
                      {moment(post?.post?.date).format("MMMM Do YYYY")}
                    </Card.Text>
                    <Link to="/">
                      <Button
                        variant="danger"
                        type="submit"
                        className="ml-auto border-radius"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              )}
            </Form>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-2"></div>
        </div>
      </div>
    </>
  );
}
