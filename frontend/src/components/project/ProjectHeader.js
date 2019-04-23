import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  greyBack: {
    backgroundColor: theme.palette.grey,
  },
  headerText: {
    color: theme.palette.common.white,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  pullRight: {
    marginLeft: "auto",
  },
  button: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    marginBottom: theme.spacing.unit * 2,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up("lg")]: {
      width: 1280,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  tabs: {
    backgroundColor: theme.palette.grey.A100,
  },
});

export class ProjectHeader extends Component {
  renderVersionInfo = () => {
    const { classes, project } = this.props;
    return (
      <Hidden xsDown>
        <Grid item md={4} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <CheckIcon className={classes.leftIcon} />
            Latest Version
          </Button>
          <Typography variant="subtitle1" className={classes.headerText}>
            Last Released:{" "}
            {moment(parseInt(project.releaseDate)).format("ddd, MMM D YYYY")}
          </Typography>
        </Grid>
      </Hidden>
    );
  };
  render() {
    const { classes, project } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.layout}>
            <Grid container spacing={32}>
              <Grid item xs={12} md={8}>
                <Typography
                  className={classes.headerText}
                  component="h2"
                  variant="h3"
                  align="left"
                  gutterBottom
                >
                  {project.displayName} - {project.version}
                </Typography>
                <Typography variant="subtitle1" className={classes.headerText}>
                  {project.tagline}
                </Typography>
              </Grid>
              {this.renderVersionInfo()}
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

ProjectHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const enhance = compose(withStyles(styles));
export default enhance(ProjectHeader);
