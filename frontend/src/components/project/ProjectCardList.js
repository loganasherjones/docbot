import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Error from "../shared/Error";
import Spinner from "../shared/Spinner";
import ProjectCard from "./ProjectCard";

ProjectCardList.propTypes = {
  projects: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

function ProjectCardList(props) {
  const { loading, error, projects } = props;
  if (loading) {
    return <Spinner />;
  } else if (error !== null) {
    return <Error error={error} />;
  } else {
    return projects.map(project => (
      <Grid
        item
        key={project.project.name + project.version}
        sm={6}
        md={4}
        lg={3}
      >
        <ProjectCard project={project} />
      </Grid>
    ));
  }
}

export default ProjectCardList;
