import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    marginLeft: "auto",
  },
});

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export function ProjectCard(props) {
  const { classes, project } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {project.displayName}
        </Typography>
        <Typography variant="body1">{project.shortDescription}</Typography>
      </CardContent>
      <CardActions disableActionSpacing>
        <IconButton aria-label="Add project to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="Star this project">
          <StarBorderIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          className={classes.cardButton}
          component={Link}
          to={`/explore/project/${project.project.name}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ProjectCard);
