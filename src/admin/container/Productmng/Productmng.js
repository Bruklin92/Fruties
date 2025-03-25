import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  FormHelperText,
  NativeSelect,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";

function Productmng(props) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  const [subcategorydata, setSubCategoryData] = useState([]);
  const [edit, setEdit] = useState(false);

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

      if (edit) {
        let index = pdata.findIndex((v) => v.id === values.id);
        console.log(index);

        pdata[index] = obj;
        console.log(pdata);

        localStorage.setItem("product", JSON.stringify(pdata));
        setEdit(false);
      } else {
        if (pdata) {
          pdata.push(obj);
          localStorage.setItem("product", JSON.stringify(pdata));
        } else {
          localStorage.setItem("product", JSON.stringify([obj]));
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
    resetForm,
    setFieldValue,
    setValues,
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

  const handleDelete = (id) => {
    console.log(id);

    const fdata = product.filter((v) => v.id !== id);
    console.log(fdata);

    localStorage.setItem("product", JSON.stringify(fdata));
    getdata();
    handleClose();
  };

  const handledite = (product) => {
    console.log(product);
    setValues(product);
    setEdit(true);
    handleSubData(product.category)
    handleClickOpen();
  };

  const handleSubData = (cat) => {
    const sdata = JSON.parse(localStorage.getItem("subcategory"));
    const finaldata = sdata?.filter((v) => v.category === cat);
    setSubCategoryData(finaldata);
  };

  const columns = [
    { field: "category", headerName: "Category", width: 170,
      renderCell: (params) => {        
        console.log(params.row.category, categorydata);
        const cat = categorydata?.find((v) => v.id == params.row.category);
        return cat?.name;
      }
     },
    { field: "procategory", headerName: "Sub Category", width: 170,
      renderCell: (params) => {
        const sdata = JSON.parse(localStorage.getItem("subcategory"));
        console.log(params.row.procategory, subcategorydata);
        const subcat = sdata?.find((v) => v.id == params.row.procategory);
        return subcat?.subname;
      }
     },
    { field: "price", headerName: "Price", width: 130 },
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

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <h1>Product Data</h1>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Product
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
                value={values.price}
                error={touched.price && errors.price}
                helperText={touched.price && errors.price ? errors.price : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
        <DataGrid
          rows={product}
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

export default Productmng;
