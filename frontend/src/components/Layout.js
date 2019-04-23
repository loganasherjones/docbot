import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Footer from "./Footer";

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});

export function Layout(props) {
  const { children, classes } = props;
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
}

export default withStyles(styles)(Layout);
