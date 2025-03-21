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
function SubCategory(props) {
  const [open, setOpen] = React.useState(false);
  const [categorydata, setCategoryData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    onSubmit: (values) => {
      console.log(values);

      const subdata = JSON.parse(localStorage.getItem("subcategory"));
      console.log(subdata);

      let obj = { ...values, id: Math.floor(Math.random() * 1000) };
      console.log(obj);

      if (subdata) {
        subdata.push(obj);
        localStorage.setItem("subcategory", JSON.stringify(subdata));
      } else {
        localStorage.setItem("subcategory", JSON.stringify([obj]));
      }
      setOpen(false);

    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formik;

  console.log(values);

  const getdata = () => {
    const subdata = JSON.parse(localStorage.getItem("subcategory"));
    setCategoryData(subdata);
  };

  useEffect(() => {
    getdata();
  }, []);
  const paginationModel = { page: 0, pageSize: 5 };

  const handleDelete = (id) => {}

  const columns = [
    { field: "id", headerName: "Category", width: 170 },
    { field: "subname", headerName: "Name", width: 130 },
    { field: "subdescription", headerName: "Description", width: 130 },
    {
      headerName: "Action",
      renderCell: (params) => {
        <>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </>;
      },
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
                values={values.name}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : ""}
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
                values={values.description}
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
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
        <DataGrid
          rows={categorydata}
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
