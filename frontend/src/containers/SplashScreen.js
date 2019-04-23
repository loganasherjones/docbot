import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { fetchProjects } from "../actions/project";
import ProjectCardList from "../components/project/ProjectCardList";
import Hero from "../components/Hero";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
});

export class SplashScreen extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const { classes, projects, projectsError, projectsLoading } = this.props;

    return (
      <>
        <Hero />
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Typography variant="h4">Recently Published Software</Typography>
            </Grid>
            <ProjectCardList
              projects={projects}
              loading={projectsLoading}
              error={projectsError}
            />
          </Grid>
        </div>
      </>
    );
  }
}

SplashScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  projectsLoading: PropTypes.bool.isRequired,
  projectsError: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    projects: state.projectReducer.projects,
    projectsLoading: state.projectReducer.projectsLoading,
    projectsError: state.projectReducer.projectsError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
);

export default enhance(SplashScreen);
