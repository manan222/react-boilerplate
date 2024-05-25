import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function ButtonLoader({ color }) {
  return (
    <>
      <Button variant={color} className="btn-style border-radius">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span style={{ paddingLeft: "1px" }}>Loading...</span>
      </Button>{" "}
    </>
  );
}
