import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY } from "../../constants/constant";
import { Card, Form, Button } from "react-bootstrap";
import { startLoader, stopLoader } from "../../redux/actions/loaderActions";
import ButtonLoader from "../common/ButtonLoader";
import "./weather.scss";

function WeatherApp() {
  const key = API_KEY;

  const [data, setData] = useState({});
  const [formData, setForm] = useState({ location: "", days: "" });
  const [record, setRecord] = useState("");
  const { location, days } = formData;
  const { loaderReducer: isLoading } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const handleChange = ({ target: input }) => {
    if (input.name === "days") {
      setRecord(input.value);
    }

    setForm({ ...formData, [input.name]: input.value });
  };
  const handleSearch = () => {
    if (formData.location !== "" && formData.days !== "") {
      dispatch(startLoader());
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${formData.location},&cnt=${formData.days}&APPID=` +
          key +
          "&units=metric"
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "city not found") {
            setError(data.message);
            setTimeout(function () {
              setError("");
            }, 4000);
            setForm({ location: "", days: "" });
            dispatch(stopLoader());
          } else {
            setForm({ location: "", days: "" });
            setData(data);
            dispatch(stopLoader());
          }
        });
    }
  };
  const handleClear = () => {
    setData({});
    setForm({ location: "", days: "" });
  };
  return (
    <div className="weather-container">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          {error && (
            <div className="text-center error-border">
              <span className="span-style">{error}</span>
            </div>
          )}
          <h4 className="weather-head">Weather Application</h4>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Country or City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country or City"
                name="location"
                onChange={handleChange}
                autoComplete="off"
                value={location}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>No. of Days</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                name="days"
                onChange={handleChange}
                autoComplete="off"
                value={days}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName" className="text-center">
              {isLoading?.isLoading ? (
                <ButtonLoader />
              ) : (
                <Button
                  className="btn btn-primary search-button btn-style border-radius"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              )}

              {Object.entries(data).length > 0 && (
                <Button className="btn btn-danger ml-2" onClick={handleClear}>
                  Clear
                </Button>
              )}
            </Form.Group>
          </Form>
          {Object.entries(data).length > 0 && (
            <Card className="card-corners">
              <Card.Body className="text-center">
                <h2>Record of {record} days</h2>
                <h2>Location:{data?.name}</h2>
                <h5>Temperature:{data?.main?.temp} Degree celcius</h5>
                <h5>Pressure: {data?.main?.pressure}</h5>
                <h5>Wind Speed:{data?.wind?.speed}</h5>
                <h5>Degree:{data?.wind?.deg}</h5>
                <h5>Humidity:{data?.main?.humidity}%</h5>
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}
export default WeatherApp;
