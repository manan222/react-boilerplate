import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../../redux/actions/authActions";
import { startLoader } from "../../redux/actions/loaderActions";
import { Form, Button, Image, Card } from "react-bootstrap";
import "./signup.scss";
import { toast, Zoom } from "react-toastify";
import ButtonLoader from "../common/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { REQUIRED_FIELDS_ERROR } from "../../constants/constant";

const SignUp = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { loaderReducer: isLoading } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const validEmailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validNameRegex = /^([a-z]+)/;
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
    let error;
    switch (input.name) {
      case "name":
        error = validNameRegex.test(input.value)
          ? ""
          : "Name cannot contain capital letters";
        setErrors({ ...errors, [input.name]: error });
        break;
      case "email":
        error = validEmailRegex.test(input.value) ? "" : "Email is not valid!";
        setErrors({ ...errors, [input.name]: error });
        break;
      case "password":
        error =
          input.value.length < 6 ? "Password must be 6 characters long!" : "";
        setErrors({ ...errors, [input.name]: error });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(errors)) {
      if (data.name !== "" && data.email !== "" && data.password !== "") {
        dispatch(startLoader());
        dispatch(createAccount(data, history));
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
      <div className="signup-container">
        <Card className="card-corners">
          <Card.Body>
            <div className="signup-heading">
              <h2>Signup With ADA </h2>
            </div>

            <div className="text-center">
              <Image
                src="/assets/images/LogoIconGold.png"
                className="signup-logo"
              ></Image>
            </div>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <Form.Text>
                  {errors.fullName.length > 0 && (
                    <span className="error">{errors.fullName}</span>
                  )}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Form.Text>
                  {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Form.Text>
                  {errors.password.length > 0 && (
                    <span className="error">{errors.password}</span>
                  )}
                </Form.Text>
              </Form.Group>
              <Form.Group className="button-container">
                {isLoading?.isLoading ? (
                  <ButtonLoader color="success" />
                ) : (
                  <Button
                    className="btn btn-success btn-style border-radius"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                )}
                <Link to="/login">
                  <Button className="btn btn-primary border-radius btn-style ml-2">
                    {" "}
                    Login
                  </Button>
                </Link>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
