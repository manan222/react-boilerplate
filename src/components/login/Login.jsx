import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import { startLoader } from "../../redux/actions/loaderActions";
import { Form, Button, Image, Card } from "react-bootstrap";
import "./login.scss";
import ButtonLoader from "../common/ButtonLoader";
import { toast, Zoom } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { REQUIRED_FIELDS_ERROR } from "../../constants/constant";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { loaderReducer: isLoading } = useSelector((state) => state);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const validEmailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
    let err;
    switch (input.name) {
      case "email":
        err = validEmailRegex.test(input.value) ? "" : "Email is not valid!";
        setErrors({ ...errors, [input.name]: err });
        break;
      case "password":
        err =
          input.value.length < 6 ? "Password must be 6 characters long!" : "";
        setErrors({ ...errors, [input.name]: err });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(errors)) {
      if (data.email !== "" && data.password !== "") {
        dispatch(startLoader());
        dispatch(login(data, history));
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
      <div className="login-container">
        <Card className="card-corners">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="login-heading">
                <h2>Login With ADA </h2>
              </div>
              <div className="text-center">
                <Image
                  src="/assets/images/LogoIconGold.png"
                  className="login-logo"
                ></Image>
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  autoComplete="off"
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
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Form.Text>
                  {errors?.password?.length > 0 && (
                    <span className="error">{errors?.password}</span>
                  )}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
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
                    Login
                  </Button>
                )}
                <Link to="/signup">
                  <Button className="btn btn-primary border-radius ml-2">
                    Create Account
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

export default Login;
