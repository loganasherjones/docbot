import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

Error.propTypes = {
  error: PropTypes.object.isRequired,
};

function Error(props) {
  const { error } = props;
  return (
    <>
      <Typography variant="h2" gutterBottom color="error">
        Yikes! Something went wrong.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {error.message}
      </Typography>
    </>
  );
}

export default Error;
