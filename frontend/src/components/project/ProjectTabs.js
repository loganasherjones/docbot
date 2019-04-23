import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  tabs: {
    backgroundColor: theme.palette.grey.A100,
  },
});

class ProjectTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  tabs = includeMeta => {
    const { project } = this.props;
    const tabs = [<Tab key="readme" label="readme" />];

    if (includeMeta) {
      tabs.push(<Tab key="metadata" label="metadata" />);
    }

    if (project.contributing !== null) {
      tabs.push(<Tab key="contributing" label="contributing" />);
    }

    if (project.codeOfConduct !== null) {
      tabs.push(<Tab key="code of conduct" label="code of conduct" />);
    }

    if (project.changelog !== null) {
      tabs.push(<Tab key="changelog" label="changelog" />);
    }

    return tabs;
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Hidden xsDown>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            className={classes.tabs}
            centered
          >
            {this.tabs(false)}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            className={classes.tabs}
            variant="scrollable"
            scrollButtons="auto"
          >
            {this.tabs(true)}
          </Tabs>
        </Hidden>
      </>
    );
  }
}

ProjectTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectTabs);
