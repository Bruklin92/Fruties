import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { object, string } from "yup";
import FormControl from "@mui/material/FormControl";

function Review(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState("");
  const [shop, setShop] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getData();
  });

  const getData = () => {
    const shopData = JSON.parse(localStorage.getItem("shopDetaileData"));
    setdata(shopData);

    const shopdet = JSON.parse(localStorage.getItem("shopDetaile"));
    setShop(shopdet);
  };

  const Reviewsys = object({
    name: string().required(),
    email: string().required().email(),
    review: string().required(),
    rating: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      review: "",
      rating: "",
    },
    validationSchema: Reviewsys,
    onsubmit: (values) => {
      console.log(values);
      const sdata = JSON.parse(localStorage.getItem("Shopdata"));
      let obj = { ...values, id: Math.floor(Math.random() * 1000) };
      if (sdata) {
        sdata.push(obj);
        localStorage.setItem("Shopdata", JSON.stringify(sdata));
      } else {
        localStorage.setItem("Shopdata", JSON.stringify([obj]));
      }

      getData();
      handleClose();
    },
  });
  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    formik;

  const columns = [
    { field: "name", headerName: "name", width: 130 },
    { field: "email", headerName: "email", width: 130 },
    { field: "review", headerName: "review", width: 130 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <React.Fragment>
      <h1>Review Data</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Shopdetail
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Data</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Enter your name"
              type="text"
              fullWidth
              variant="standard"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name ? errors.name : ""}
            />

            <TextField
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
            <TextField
              margin="dense"
              id="name"
              name="review"
              label="Review"
              type="text"
              fullWidth
              variant="standard"
              value={values.review}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.review && errors.review}
              helperText={touched.review && errors.review ? errors.review : ""}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.rating}
                label="rating"
                onChange={handleChange}
              >
                <option value={0}>Your Product</option>
                <option value={1}>Padding</option>
                <option value={2}>Approved</option>
                <option value={3}>Reject</option>
              </Select>
            </FormControl>
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={shop}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </React.Fragment>
  );
}

export default Review;
