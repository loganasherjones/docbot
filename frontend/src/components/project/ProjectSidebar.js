import React, { Component } from "react";
import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import RestoreIcon from "@material-ui/icons/Restore";
import HomeIcon from "@material-ui/icons/Home";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ForumIcon from "@material-ui/icons/Forum";
import PersonIcon from "@material-ui/icons/Person";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  padMe: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class ProjectSidebar extends Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  projectLinks = project => {
    if (isEmpty(project.links)) {
      return null;
    }

    return (
      <>
        <ListSubheader>Project Links</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Homepage" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText inset primary="Issue Tracker" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText inset primary="Contact" />
        </ListItem>
      </>
    );
  };

  projectMeta = project => {
    if (isEmpty(project.metadata)) {
      return null;
    }
    const md = project.metadata;
    const metaEl = [];
    for (const key of Object.keys(md)) {
      metaEl.push(
        <ListItem key={key}>
          <ListItemText
            primary={key.charAt(0).toUpperCase() + key.slice(1)}
            secondary={md[key]}
          />
        </ListItem>,
      );
    }
    return (
      <>
        <ListSubheader>Metadata</ListSubheader>
        {metaEl}
      </>
    );
  };

  projectMaintainers = project => {
    const numMaintainers = Math.min(3, project.maintainers.length);
    const maintainers = [];
    for (let i = 0; i < numMaintainers; i++) {
      const username = project.maintainers[i].username;
      maintainers.push(
        <ListItem key={username}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText inset primary={username} />
        </ListItem>,
      );
    }

    return (
      <>
        <ListSubheader>Maintainers</ListSubheader>
        {maintainers}
      </>
    );
  };

  projectLabels = project => {
    const labels = project.labels.map(label => (
      <ListItem key={label}>
        <ListItemText primary={label} />
      </ListItem>
    ));
    return (
      <>
        <ListSubheader>Labels</ListSubheader>
        {labels}
      </>
    );
  };

  render() {
    const { classes, project } = this.props;
    return (
      <Grid item xs={12} md={3}>
        <List className={classes.root}>
          <ListSubheader>Information</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <RestoreIcon />
            </ListItemIcon>
            <ListItemText inset primary="Release history" />
          </ListItem>
          <Divider className={classes.padMe} />
          {this.projectLinks(project)}
          <Divider className={classes.padMe} />
          {this.projectMaintainers(project)}
          <Divider className={classes.padMe} />
          {this.projectMeta(project)}
          <Divider className={classes.padMe} />
          {this.projectLabels(project)}
        </List>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProjectSidebar);
