import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import moment from "moment";
import ProjectHeader from "../components/project/ProjectHeader";
import ProjectTabs from "../components/project/ProjectTabs";
import ProjectSidebar from "../components/project/ProjectSidebar";
// import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

const README = `

Requests: HTTP for Humans™
==========================

[![image](https://img.shields.io/pypi/v/requests.svg)](https://pypi.org/project/requests/)
[![image](https://img.shields.io/pypi/l/requests.svg)](https://pypi.org/project/requests/)
[![image](https://img.shields.io/pypi/pyversions/requests.svg)](https://pypi.org/project/requests/)
[![codecov.io](https://codecov.io/github/requests/requests/coverage.svg?branch=master)](https://codecov.io/github/requests/requests)
[![image](https://img.shields.io/github/contributors/requests/requests.svg)](https://github.com/requests/requests/graphs/contributors)
[![image](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/kennethreitz)

**If you're interested in financially supporting Kenneth Reitz open source, consider [visiting this link](https://cash.me/$KennethReitz). Your support helps tremendously with sustainability of motivation, as Open Source is no longer part of my day job.**

Requests is the only *Non-GMO* HTTP library for Python, safe for human
consumption.

![image](https://farm5.staticflickr.com/4317/35198386374_1939af3de6_k_d.jpg)

Behold, the power of Requests:

\`\`\` {.sourceCode .python}
>>> r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
>>> r.status_code
200
>>> r.headers['content-type']
'application/json; charset=utf8'
>>> r.encoding
'utf-8'
>>> r.text
u'{"type":"User"...'
>>> r.json()
{u'disk_usage': 368627, u'private_gists': 484, ...}
\`\`\`

See [the similar code, sans Requests](https://gist.github.com/973705).

[![image](https://raw.githubusercontent.com/requests/requests/master/docs/_static/requests-logo-small.png)](http://docs.python-requests.org/)

Requests allows you to send *organic, grass-fed* HTTP/1.1 requests,
without the need for manual labor. There's no need to manually add query
strings to your URLs, or to form-encode your POST data. Keep-alive and
HTTP connection pooling are 100% automatic, thanks to
[urllib3](https://github.com/shazow/urllib3).

Besides, all the cool kids are doing it. Requests is one of the most
downloaded Python packages of all time, pulling in over 11,000,000
downloads every month. You don't want to be left out!

Feature Support
---------------

Requests is ready for today's web.

-   International Domains and URLs
-   Keep-Alive & Connection Pooling
-   Sessions with Cookie Persistence
-   Browser-style SSL Verification
-   Basic/Digest Authentication
-   Elegant Key/Value Cookies
-   Automatic Decompression
-   Automatic Content Decoding
-   Unicode Response Bodies
-   Multipart File Uploads
-   HTTP(S) Proxy Support
-   Connection Timeouts
-   Streaming Downloads
-   \`.netrc\` Support
-   Chunked Requests

Requests officially supports Python 2.7 & 3.4–3.7, and runs great on
PyPy.

Installation
------------

To install Requests, simply use [pipenv](http://pipenv.org/) (or pip, of
course):

\`\`\` {.sourceCode .bash}
$ pipenv install requests
✨🍰✨
\`\`\`

Satisfaction guaranteed.

Documentation
-------------

Fantastic documentation is available at
<http://docs.python-requests.org/>, for a limited time only.

How to Contribute
-----------------

1.  Check for open issues or open a fresh issue to start a discussion
    around a feature idea or a bug. There is a [Contributor
    Friendly](https://github.com/requests/requests/issues?direction=desc&labels=Contributor+Friendly&page=1&sort=updated&state=open)
    tag for issues that should be ideal for people who are not very
    familiar with the codebase yet.
2.  Fork [the repository](https://github.com/requests/requests) on
    GitHub to start making your changes to the **master** branch (or
    branch off of it).
3.  Write a test which shows that the bug was fixed or that the feature
    works as expected.
4.  Send a pull request and bug the maintainer until it gets merged and
    published. :) Make sure to add yourself to
    [AUTHORS](https://github.com/requests/requests/blob/master/AUTHORS.rst).

`;

const project = {
  name: "project1",
  displayName: "My Cool Project",
  version: "1.0.0",
  latestVersion: true,
  tagline: "My Cool Project saves the world.",
  releaseDate: moment()
    .subtract(10, "days")
    .format("x"),
  metadata: {
    author: "Logan Jones",
  },
  maintainers: [{ username: "loganasherjones" }, { username: "hazmat345" }],
  labels: ["Programming Language::Python::3.6", "Audience::Developers"],
  links: {
    homepage: "https://beer-garden.io",
    issues: "https://github.com/beer-garden/beer-garden/issues",
    contact: "https://gitter.im/beer-garden",
  },
  docs: {
    readme: README,
    contributing: "TODO: Make a contributing markdown doc.",
    changelog: "TODO: Put a changelog here.",
    codeOfConduct: "TODO: Put a code of conduct here.",
  },
};
const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("lg")]: {
      width: 1280,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  wrapper: {
    padding: theme.spacing.unit * 2,
  },
  root: {
    paddingBottom: theme.spacing.unit * 2,
  },
});
const options = {
  overrides: {
    h1: {
      component: props => <Typography gutterBottom variant="h4" {...props} />,
    },
    h2: {
      component: props => <Typography gutterBottom variant="h6" {...props} />,
    },
    h3: {
      component: props => (
        <Typography gutterBottom variant="subtitle1" {...props} />
      ),
    },
    h4: {
      component: props => (
        <Typography gutterBottom variant="caption" paragraph {...props} />
      ),
    },
    p: { component: props => <Typography paragraph {...props} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
    img: {
      component: props => <img {...props} style={{ maxWidth: "100%" }} />,
    },
  },
};

class ProjectView extends Component {
  render() {
    const {
      match: {
        params: { projectName },
      },
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <ProjectHeader project={project} />
        <ProjectTabs project={project} />
        <div className={classes.layout}>
          <Grid container spacing={32}>
            <Hidden xsDown>
              <ProjectSidebar project={project} />
            </Hidden>
            <Grid item xs={12} md={9}>
              <Paper className={classes.wrapper}>
                <Markdown options={options}>{project.docs.readme}</Markdown>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withStyles(styles),
);

export default enhance(ProjectView);
