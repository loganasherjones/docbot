import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  root: { flexGrow: 0 },
  grow: { flexGrow: 1 },
});

export function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Link
            component={RouterLink}
            underline="none"
            to="/"
            variant="h6"
            color="inherit"
            className={classes.grow}
          >
            ShopBox
          </Link>
          <Button component={RouterLink} to="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const enhance = compose(
  withRouter,
  withStyles(styles),
);

export default enhance(Header);
