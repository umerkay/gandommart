import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import jumpTo from "../../utils/navigation";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import { reviewsAction, reviewDeleteAction } from "../../store/action";
import { Loading } from "../components";
import { convertDateToStringFormat } from "../utils/convertDate";
import { CSVLink } from "react-csv";

const AllReviews = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.reviews);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!reviewState.reviews.length) {
      dispatch(reviewsAction());
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {reviewState.loading ? <Loading /> : null}
            <CardHeader
              action={
                <span>
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    <CSVLink
                      filename={
                        "reviews_" + new Date().toLocaleDateString() + ".csv"
                      }
                      data={reviewState.reviews}
                    >
                      Download CSV
                    </CSVLink>
                  </Button>
                </span>
              }
              title="All Reviews"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="reviews-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Last Modified</TableCell>
                      <TableCell>Reviewed Product</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviewState.reviews
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((review) => (
                        <TableRow key={review.id} hover>
                          <TableCell>{review.title}</TableCell>
                          <TableCell>
                            {review.customer_id.first_name} -{" "}
                            {convertDateToStringFormat(review.date)}
                          </TableCell>
                          <TableCell>
                            {convertDateToStringFormat(review.updated)}
                          </TableCell>
                          <TableCell> {review.product_id.name}</TableCell>
                          <TableCell>
                            <Rating
                              name="read-only"
                              value={Number(review.rating)}
                              readOnly
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Review" aria-label="delete">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  jumpTo(`edit-review/${review.id}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Review" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(reviewDeleteAction(review.id))
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={reviewState.reviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllReviews;
