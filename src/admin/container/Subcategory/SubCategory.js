import { Category, Description } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";

function SubCategory(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subSchema = object({
    subcat: string().required(),
    Description: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      subcat: "",
      Description: "",
    },
    validationSchema: subSchema
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formik;

    console.log(errors, touched);
    
  return (
    <div>
      <h1>Sub category Data</h1>
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
                id="subcat"
                label="Sub Category"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subcat}
                error={touched.subcat && errors.subcat}
                helperText={touched.subcat && errors.subcat ? errors.subcat : ""}
              />

              <TextField
                margin="dense"
                id="Description"
                name="Description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Description}
                error={touched.Description && errors.Description}
                helperText={touched.Description && errors.Description ? errors.Description : ""}
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

export default SubCategory;
