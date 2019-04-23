import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
});

export function Hero(props) {
  const { classes } = props;
  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome to ShopBox
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          ShopBox brings your software together by giving you a place to find
          software others have written. If you have some software you know
          others could use, then consider publishing it on ShopBox!
        </Typography>
        <div>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item xs={1}>
              <SearchIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                id="main-search"
                label="Find Some Software"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/publish"
              >
                Publish
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/explore"
              >
                Explore
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Hero);
