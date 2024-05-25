import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Button, Card, Dropdown, Modal } from "react-bootstrap";
import {
  getAllPosts,
  deletePost,
  clearPosts,
} from "../../redux/actions/postActions";
import { startLoader } from "../../redux/actions/loaderActions";
import ButtonLoader from "../common/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import "./postList.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Spinner from "../common/Spinner";
import LineCharts from "../common/high_charts/LineCharts";

createTheme("solarized", {
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
});
const PostList = () => {
  const history = useHistory();
  const { postReducer: posts } = useSelector((state) => state);
  const isLoading = useSelector(({ loaderReducer }) => loaderReducer.isLoading);
  const [showModal, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  const [activePostId, setActivePost] = useState("");
  if (localStorage.getItem("userToken")) {
    const token = localStorage?.getItem("userToken");
    var decoded = jwtDecode(token);
    var LoggedInUserId = decoded.id;
  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
    setActivePost(id);
  };

  const viewHandler = (id) => {
    history.push(`view/post/${id}`);
  };
  const handleDelete = () => {
    dispatch(startLoader());
    dispatch(deletePost(activePostId, history));
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  const columns = [
    {
      name: "User",
      selector: "user",

      minWidth: "10rem",

      center: true,
    },
    {
      name: "Description",
      selector: "text",
      minWidth: "20rem",

      center: true,
    },
    {
      name: "Date",
      selector: (d) => {
        return moment(d.date).format("MMMM Do YYYY, h:mm:ss a");
      },
      minWidth: "10rem",
      sortable: true,
      center: true,
    },
    {
      name: "Time",
      selector: (d) => {
        return moment(d.date).format("h:mm:ss");
      },
      minWidth: "4rem",
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      minWidth: "20rem",
      cell: (post) => (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => viewHandler(post._id)}>
              View
            </Dropdown.Item>
            {localStorage.getItem("userToken") &&
              LoggedInUserId === post.user && (
                <Dropdown.Item onClick={() => handleShow(post._id)}>
                  Delete
                </Dropdown.Item>
              )}
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true,
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoader());
    dispatch(getAllPosts());
  }, [dispatch]);

  function dragStart(event) {
    event.dataTransfer.setData("text", `${event.target.id},${event.clientY}`);
    event.target.parentElement.id = "parent";
  }
  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.setData("text", event.target.id);
  }
  function dragEnd(event) {
    const [sourceId, Y] = event.dataTransfer.getData("text").split(",");
    event.preventDefault();
    const row = event.target.parentNode;
    const parent = row.parentNode;
    const sourceNodeId = sourceId;
    const sourceNode = document.getElementById(sourceNodeId);
    const destinationNode = event.target.parentNode;
    if (parent === sourceNode.parentElement) {
      if (Y > event.clientY) parent.insertBefore(sourceNode, destinationNode);
      else parent.insertBefore(sourceNode, destinationNode.nextSibling);
    }
  }

  useEffect(() => {
    const allRows = document.getElementsByClassName("dmCPBb");
    setRows(allRows);
    if (rows && rows?.length > 0) {
      for (let row of rows) {
        row.draggable = true;
      }
    }
  }, [rows]);

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("dragstart", dragStart);
    document.addEventListener("dragover", dragOver);
    document.addEventListener("drop", dragEnd);
    return () => {
      document.removeEventListener("dragStart", dragStart);
      document.removeEventListener("dragend", dragEnd);
      document.removeEventListener("dragover", dragOver);
    };
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure You want to Delete Post?</Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <ButtonLoader color="success" />
          ) : (
            <Button
              variant="success"
              className="btn-style border-radius"
              onClick={() => handleDelete()}
            >
              Confirm
            </Button>
          )}

          <Button
            variant="danger"
            className="border-radius"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Header /> */}
      <div className="table-container">
      <LineCharts/>
        <Card className="card-corners padding">
          <Card.Title className="text-center mt-3">Post Lists</Card.Title>
          <Card.Body>
            <Link to="/create/post">
              <Button variant="success" className="mb-3 border-radius">
                Create Post
              </Button>
            </Link>

            {posts?.posts?.length === 0 && isLoading ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : (
              <DataTable
                data={posts?.posts}
                columns={columns}
                header
                selectableRows
                theme="solarized"
                defaultSortAsc
                pagination
              />
            )}
          </Card.Body>
        </Card>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default PostList;
