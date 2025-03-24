import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { FormControl, FormHelperText, NativeSelect } from "@mui/material";

function Productmng(props) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  const [subcategorydata, setSubCategoryData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const productschema = object({
    price: number().required(),
    procategory: string().required(),
    category: string().required(),
    subname: string().required(),
    subdescription: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      price: "",
      procategory: "",
      category: "",
      subname: "",
      subdescription: "",
    },
    validationSchema: productschema,
    onSubmit: (values) => {
      console.log(values);

      const pdata = JSON.parse(localStorage.getItem("product"));
      console.log(pdata);

      let obj = { ...values, id: Math.floor(Math.random() * 1000) };
      console.log(obj);

      if (pdata) {
        pdata.push(obj);
        localStorage.setItem("product", JSON.stringify(pdata));
      } else {
        localStorage.setItem("product", JSON.stringify([obj]));
      }
      setOpen(false);
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
    resetForm,
    setFieldValue,
  } = formik;

  console.log(values);

  const getdata = () => {
    const cdata = JSON.parse(localStorage.getItem("category"));
    setCategoryData(cdata);

    const pdata = JSON.parse(localStorage.getItem("product"));
    setProduct(pdata);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleSubData = (cat) => {
    const sdata = JSON.parse(localStorage.getItem("subcategory"));
    const filterdata = sdata?.filter((v) => v.category === cat);
    setSubCategoryData(filterdata);
  };

  return (
    <div>
      <h1>Product Data</h1>
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
                  name="category"
                  defaultValue={""}
                  inputProps={{
                    name: "category",
                    id: "uncontrolled-native",
                  }}
                  value={values.category}
                  onChange={(e) => {
                    handleSubData(e.target.value);
                    setFieldValue("category", e.target.value);
                  }}
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

              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                error={touched.procategory && errors.procategory}
              >
                <NativeSelect
                  defaultValue={""}
                  inputProps={{
                    name: "procategory",
                    id: "uncontrolled-native",
                  }}
                  value={values.procategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.procategory}
                  error={touched.procategory && errors.procategory}
                  helperText={
                    touched.procategory && errors.procategory
                      ? errors.procategory
                      : ""
                  }
                >
                  <option value={""}>--Select Sub Category</option>
                  {subcategorydata?.map((v) => (
                    <option value={v.id}>{v.subname}</option>
                  ))}
                </NativeSelect>
                <FormHelperText>
                  {touched.procategory && errors.procategory
                    ? errors.procategory
                    : ""}
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
                values={values.subname}
                error={touched.subname && errors.subname}
              />
              {touched.subname && errors.subname ? errors.subname : ""}
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
                values={values.subdescription}
                error={touched.subdescription && errors.subdescription}
                helperText={
                  touched.subdescription && errors.subdescription
                    ? errors.subdescription
                    : ""
                }
              />
              {touched.subname && errors.subname ? errors.subname : ""}
              <TextField
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.price}
                error={touched.price && errors.price}
              />
              {touched.price && errors.price ? errors.price : ""}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Productmng;
