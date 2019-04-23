import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
  },
});

export function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Originally Developed by{" "}
        <Link color="inherit" href="https://loganasherjones.com">
          Logan Asher Jones
        </Link>
      </Typography>
    </footer>
  );
}

export default withStyles(styles)(Footer);
