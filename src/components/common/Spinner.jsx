import React from "react";
import { Spinner } from "react-bootstrap";

export default function ButtonLoader() {
  return (
    <Spinner
      animation="border"
      variant="primary"
      style={{ padding: "1.4rem" }}
    />
  );
}
