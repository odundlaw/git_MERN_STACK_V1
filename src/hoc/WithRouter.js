import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const withRouter = (Component) => {
  return function HocWithWrapper(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return (
      <Component
        params={params}
        navigate={navigate}
        location={location}
        {...props}
      />
    );
  };
};

export default withRouter;
