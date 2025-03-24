import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function Category(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    resetForm();
  };

  const catSchema = object({
    name: string().required(),
    description: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: catSchema,
    onSubmit: (values, { resetForm }) => {
      const localdata = JSON.parse(localStorage.getItem("category"));

      if (update) {
        let index = localdata.findIndex((v) => v.id === values.id);
        console.log(index);

        localdata[index] = values;
        console.log(localdata);

        localStorage.setItem("category", JSON.stringify(localdata));
      } else {
        let obj = { ...values, id: Math.floor(Math.random() * 1000) };

        console.log(obj, localdata);

        if (localdata) {
          localdata.push(obj);
          localStorage.setItem("category", JSON.stringify(localdata));
        } else {
          localStorage.setItem("category", JSON.stringify([obj]));
        }
      }

      getdata();
      handleClose();
      resetForm();
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setValues,
    resetForm,
  } = formik;

  console.log(values);

  const handleDelete = (id) => {
    console.log(id);

    const fdata = data.filter((v) => v.id !== id);
    console.log(fdata);

    localStorage.setItem("category", JSON.stringify(fdata));
    getdata();
    handleClose();
  };

  const handleUpdate = (udata) => {
    console.log(udata);
    setValues(udata);
    handleClickOpen();
    setUpdate(true);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleUpdate(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const getdata = () => {
    const localdata = JSON.parse(localStorage.getItem("category"));
    setData(localdata);
  };

  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <h1>Category Data</h1>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Category
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Category</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : ""}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={touched.description && errors.description}
                helperText={
                  touched.description && errors.description
                    ? errors.description
                    : ""
                }
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? "Update" : "Submit"}</Button>
            </DialogActions>
          </form>
        </Dialog>

        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </React.Fragment>
    </div>
  );
}

export default Category;
