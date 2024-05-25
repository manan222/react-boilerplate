import React from "react";
import { Route, Redirect } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Calculator from "../../components/calculator/Calculator";
import ViewMap from "../../components/map/Map";
import WebCam from "../../components/webCam/WebCam";
import WeatherApp from "../../components/weather/WeatherApp";
import DragableTable from "../../components/card/DragableCards";
import CreateEditPost from "../../components/createEditpost/CreateEditPost";
import CreateProfile from "../../components/profile/CreateProfile";
import DashboardLayout from "../../components/common/layout/Layout";
import ProtectedRoute from "../../components/common/protectedRoutes/protectedRoutes";

const DashboardRoutes = () => {
  return (
    <>
      <DashboardLayout>
        <Route exact path="/" component={PostList} />
        <Route exact path="/posts" component={PostList} />
        <Route exact path="/create/post" component={CreateEditPost} />
        <Route exact path="/view/post/:id" component={CreateEditPost} />
        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/create/profile" component={CreateProfile} />
        <Route exact path="/view/map" component={ViewMap} />
        <Route exact path="/web/camera" component={WebCam} />
        <Route exact path="/drag" component={DragableTable} />
        <Route exact path="/weather" component={WeatherApp} />
        <Redirect to="/" />
      </DashboardLayout>
    </>
  );
}

export default DashboardRoutes;
