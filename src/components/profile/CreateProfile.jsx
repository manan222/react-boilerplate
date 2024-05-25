import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  clearProfile,
} from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./profile.scss";
import { toast, Zoom } from "react-toastify";
import { REQUIRED_FIELDS_ERROR } from "../../constants/constant";
import { startLoader } from "../../redux/actions/loaderActions";
import ButtonLoader from "../common/ButtonLoader";
export default function CreateProfile() {
  const [data, setData] = useState({
    department: "",
    status: "",
    options: [
      { value: "Javascript", label: "Javascript", isFixed: false },
      { value: "Node", label: " Node", isFixed: false },
      { value: "Python", label: " Python", isFixed: false },
      { value: "Laravel", label: " Laravel", isFixed: false },
    ],
    selectedOptions: [],
  });
  const [errors, setErrors] = useState({
    department: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(({ profileReducer }) => profileReducer.profile);
  const isLoading = useSelector(({ loaderReducer }) => loaderReducer.isLoading);

  useEffect(() => {
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handleSkills = (skills) => {
    setData({ ...data, selectedOptions: skills });
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
    let error;
    switch (input.name) {
      case "department":
        error =
          input.value.length < 6
            ? "Department should be 6 characters long"
            : "";
        setErrors({ ...errors, [input.name]: error });
        break;
      default:
        break;
    }
  };

  const handleProfile = (event) => {
    event.preventDefault();
    if (validateForm(errors)) {
      if (
        data.department !== "" &&
        data.selectedOptions !== "" &&
        data.status !== ""
      ) {
        var profileObject = {
          handle: data.department,
          status: data.status,
          skills: data.selectedOptions.map((s) => s.value).toString(),
        };
        dispatch(startLoader());
        dispatch(createProfile(profileObject, history));

        setData({
          department: "",
          status: "",
          selectedOptions: [],
          options: data.options,
        });
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
  return (
    <>
      <div className="profile-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-2"></div>
          <div className="col-lg-6 col-md-6 col-sm-8">
            <Card className="card-corners">
              <Card.Title className="text-center mt-4">
                Create Profile{" "}
              </Card.Title>
              <Card.Body>
                <Form className="mt-3">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter post"
                      onChange={handleChange}
                      value={data.department}
                      autoComplete="off"
                      name="department"
                    />
                    <Form.Text>
                      {errors.department.length > 0 && (
                        <span className="error">{errors.department}</span>
                      )}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Check
                      type="radio"
                      aria-label="radio 1"
                      label="Active"
                      onChange={handleChange}
                      name="status"
                      checked={data.status === "active"}
                      value="active"
                    />
                    <Form.Check
                      type="radio"
                      aria-label="radio 1"
                      label="In Active"
                      className="mt-2"
                      onChange={handleChange}
                      name="status"
                      checked={data.status === "inactive"}
                      value="inactive"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="basicInput7">Skills</Form.Label>
                    <Select
                      isMulti
                      name="newStatus"
                      options={data.options}
                      onChange={handleSkills}
                      value={data.selectedOptions}
                    />
                  </Form.Group>
                  <div className="mt-4">
                    {isLoading ? (
                      <ButtonLoader color="primary" />
                    ) : (
                      <Button
                        variant="primary"
                        className="btn-style border-radius"
                        type="submit"
                        onClick={handleProfile}
                      >
                        Create
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
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-2">
            {profile && (
              <Card>
                <Card.Header>Profile Details</Card.Header>
                <Card.Body>
                  <Card.Title>Information</Card.Title>
                  <Card.Text> Training:{profile?.handle}</Card.Text>
                  <Card.Text> Status:{profile?.status}</Card.Text>
                  <Card.Text> Skills</Card.Text>
                  {profile.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>;
                  })}
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
