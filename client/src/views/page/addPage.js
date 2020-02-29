import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  IconButton,
  Divider,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogAddAction } from "../../store/action/";
import palette from "../../theme/palette";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";

const AddPage = props => {
  const classes = useStyles();
  const [editPremalink, setEditPermalink] = useState(false);
  const [blog, setBlog] = useState({
    status: "Publish",
    slug: "",
    title: ""
  });

  useEffect(() => {
    if (props.blogs.success) {
      document.forms[0].reset();
      setBlog({
        ...blog,
        status: "Publish"
      });
    }
  }, [props.blogs.success]);

  useEffect(() => {
    if (props.blogs.blog.content !== undefined) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  useEffect(() => {
    var slugVal = blog.title.replace(/[^A-Z0-9]/gi, "-");
    setBlog({ ...blog, slug: slugVal.toLowerCase() });
  }, [blog.title]);

  const addPage = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  return (
    <Fragment>
      <Alert />
      <form>
        {props.blogs.loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" /> <br /> Loading
          </Backdrop>
        )}

        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-pages">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add Page</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addPage}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-pages" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.mainrow}>
          <Grid item lg={9} md={12}>
            <Box>
              <Card>
                <CardHeader title="Page Information" />
                <Divider />
                <CardContent>
                  <TextField
                    id="title"
                    label="Title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />

                  <Grid item md={12}>
                    {blog.title ? (
                      <span style={{ marginBottom: 10, display: "block" }}>
                        <strong>Link: </strong>
                        https://www.google.com/product/
                        {editPremalink === false && blog.slug}
                        {editPremalink === true && (
                          <input
                            id="url"
                            name="slug"
                            value={blog.slug}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.editpermalinkInput}
                          />
                        )}
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={changePermalink}
                          className={classes.editpermalinkInputBtn}
                        >
                          {editPremalink ? "Ok" : "Edit"}
                        </Button>
                      </span>
                    ) : null}
                  </Grid>

                  <TinymceEditor />
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Meta Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <TextField
                        id="meta-title"
                        label="Meta Title"
                        name="meta-title"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="meta-keyword"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="meta-description"
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        multiline
                        rows="4"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={3} md={12}>
            <Box>
              <Card>
                <CardHeader title="Status" />
                <Divider />
                <CardContent>
                  <RadioGroup
                    defaultValue="Publish"
                    name="status"
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="Publish"
                      control={<StyledRadio />}
                      label="Publish"
                    />
                    <FormControlLabel
                      value="Draft"
                      control={<StyledRadio />}
                      label="Draft"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const StyledRadio = props => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
  cancelBtn: {
    background: palette.error.dark,
    color: "#fff",
    marginLeft: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  mainrow: {
    padding: theme.spacing(4),
    marginTop: 40
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  width100: {
    width: "100%"
  },
  formbottom: {
    marginTop: theme.spacing(3)
  },
  secondRow: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  feautedImage: {
    color: "#0073aa",
    textDecoration: "underline",
    display: "flex",
    cursor: "pointer"
  },
  feautedImageBox: {
    background: "rgb(240,240,240)",
    height: "250px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  feautedImageBoxPreview: {
    maxWidth: "90%",
    maxHeight: "90%"
  },
  editpermalinkInput: {
    padding: "5px !important",
    height: "25px",
    marginLeft: 10
  },
  editpermalinkInputBtn: {
    height: "25px",
    fontSize: "10px",
    padding: 0,
    marginLeft: 10
  }
}));

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPage);
