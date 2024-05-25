import React, { useState } from "react";
import "./map.scss";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ViewMap() {
  const [map] = useState({
    center: { lat: 59, lng: 30 },
    zoom: 11,
  });
  return (
    <>
      {/* <div style={{ height: "100vh", width: "100%", paddingTop: "20px" }}> */}
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={map.center}
          defaultZoom={map.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
      {/* </div> */}

    </>
  );
}
