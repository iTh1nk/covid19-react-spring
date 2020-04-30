import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div>
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="primary" />
    </div>
  );
};

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "8em",
};

export default function IsLoading() {
  return (
    <>
      <div style={loadingStyle}>Loading...</div>
      <div style={loadingStyle}>
        <Loading />
      </div>
    </>
  );
}
