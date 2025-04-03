import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";

function Review(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState("");
  const [update, setUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  useEffect(() => {
    getData();
  });

  const getData = () => {
    const shopData = JSON.parse(localStorage.getItem("ShopData"));
    setdata(shopData);
  };

  const Reviewsys = object({
    sname: string().required(),
    email: string().required().email(),
    review: string().required(),
    status: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      sname: "",
      email: "",
      review: "",
      status: "",
    },
    validationSchema: Reviewsys,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      const sdata = JSON.parse(localStorage.getItem("ShopData"));

      let index = sdata.findIndex((v) => v.id === values.id);
      console.log(index);

      sdata[index] = values;

      localStorage.setItem("ShopData", JSON.stringify(sdata));

      getData();
      resetForm();
      handleClose();
    },
  });
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setValues,
    resetForm
  } = formik;

  const handleUpdate = (data) => {
    setValues(data);
    handleClickOpen();
    setUpdate(true);
  };

  const columns = [
    { field: "sname", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "review", headerName: "Review", width: 180 },
    { field: "status", headerName: "Status", width: 100 },
    {
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => handleUpdate(params.row)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
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
              name="sname"
              label="Enter your name"
              type="text"
              fullWidth
              variant="standard"
              value={values.sname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.sname && errors.sname}
              helperText={touched.sname && errors.sname ? errors.sname : ""}
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
                value={values.status}
                label="status"
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Panding"}>Panding</MenuItem>
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Reject"}>Reject</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? "Update" : "Submit"}</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
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
