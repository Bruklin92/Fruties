import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Category(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formik;
  console.log(values);

  const [age, setAge] = React.useState("");

  const handleDrop = (event) => {
    setAge(event.target.value);
  };


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
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={Category} 
                label="Age"
                onChange={handleDrop}
              >
                <MenuItem value="">
                  <em>Category</em>
                </MenuItem>
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>

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
                values={values.name}
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
              <Button type="submit">submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Category;
