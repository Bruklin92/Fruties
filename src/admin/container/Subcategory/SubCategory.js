import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { data } from "react-router-dom";
import { render } from "@testing-library/react";

function SubCategory(props) {
  const [open, setOpen] = React.useState(false);
  const [categorydata, setCategoryData] = useState([]);
  const [subcategorydata, setSubCategoryData] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    resetForm();
  };

  const catSchema = object({
    category: string().required(),
    subname: string().required(),
    subdescription: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      subname: "",
      subdescription: "",
    },
    validationSchema: catSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      const sdata = JSON.parse(localStorage.getItem("subcategory"));
      console.log(sdata);

      let obj = { ...values, id: Math.floor(Math.random() * 1000) };
      console.log(obj);

      if (edit) {
        let index = sdata.findIndex((v) => v.id === values.id);
        console.log(index);

        sdata[index] = values;
        console.log(sdata);

        localStorage.setItem("subcategory", JSON.stringify(sdata));
      } else {
        if (sdata) {
          sdata.push(obj);
          localStorage.setItem("subcategory", JSON.stringify(sdata));
        } else {
          localStorage.setItem("subcategory", JSON.stringify([obj]));
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

  const getdata = () => {
    const subdata = JSON.parse(localStorage.getItem("category"));
    setCategoryData(subdata);

    const sdata = JSON.parse(localStorage.getItem("subcategory"));
    setSubCategoryData(sdata);
  };

  useEffect(() => {
    getdata();
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDelete = (id) => {
    console.log(id);

    const fdata = subcategorydata.filter((v) => v.id !== id);
    console.log(fdata);

    localStorage.setItem("subcategory", JSON.stringify(fdata));
    getdata();
    handleClose();
  };

  const handledite = (data) => {
    console.log(data);
    setValues(data);
    setEdit(true);
    handleClickOpen();
  };

  const columns = [
    {
      field: "category",
      headerName: "Category",
      width: 170,
      renderCell: (params) => {
        const cat = categorydata.find((v) => v.id == params.row.category);
        return cat?.name;
      }
    },
    { field: "subname", headerName: "Name", width: 130 },
    { field: "subdescription", headerName: "Description", width: 130 },
    {
      headerName: "Action",
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handledite(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Sub Category Data</h1>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Sub Category
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Category</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                error={touched.category && errors.category}
              >
                <NativeSelect
                  defaultValue={""}
                  inputProps={{
                    name: "category",
                    id: "uncontrolled-native",
                  }}
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.category}
                  error={touched.category && errors.category}
                  helperText={
                    touched.category && errors.category ? errors.category : ""
                  }
                >
                  <option value={""}>--Select Category</option>
                  {categorydata?.map((v) => (
                    <option value={v.id}>{v.name}</option>
                  ))}
                </NativeSelect>
                <FormHelperText>
                  {touched.category && errors.category ? errors.category : ""}
                </FormHelperText>
              </FormControl>
              <TextField
                margin="dense"
                label="Name"
                id="subname"
                name="subname"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subname}
                error={touched.subname && errors.subname}
                helperText={
                  touched.subname && errors.subname ? errors.subname : ""
                }
              />
              <TextField
                margin="dense"
                id="subdescription"
                name="subdescription"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subdescription}
                error={touched.subdescription && errors.subdescription}
                helperText={
                  touched.subdescription && errors.subdescription
                    ? errors.subdescription
                    : ""
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{edit ? "Edit" : "Submit"}</Button>
            </DialogActions>
          </form>
        </Dialog>
        <DataGrid
          rows={subcategorydata}
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

export default SubCategory;
