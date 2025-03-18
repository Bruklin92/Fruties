import { useFormik } from "formik";
import React from "react";
import { array, boolean, mixed, number, object, string } from "yup";

function Contect(props) {
  const contectSchema = object({
    name: string()
      .required()
      .matches(/^[a-zA-Z]+$/),
    email: string().required().email(),
    number: string()
      .matches(/^[6789]\d{9}$/, "Please Enter Valid Mobile Number")
      .required(),
    msg: string()
      .required()
      .test("msg", "Please Enter Max 5 Word", (v) => {
        const arr = v.trim().split(" ");
        console.log(arr);

        if (arr.length <= 2) {
          return true;
        } else {
          return false;
        }
      }),
    gender: string().required("Please Select Your Gender"),
    contry: string().required("Please Select country"),
    condition: boolean()
      .required()
      .oneOf([true], "you need to accept conditions"),
    hobby: array().required("Please Select Min 2 Hobbies").min(2),
    document: mixed()
      .required()
      .test("document", "File Size Must Be Less Than 2MB.", (val) => {
        console.log("document", val.size);
        if (val.size < 2 * 1024 * 1024) {
          return true;
        } else {
          return false;
        }
      })
      .test("document", "check your file type", (val) => {
        if (val.type === "image/png" || val.type === "image/jpeg") {
          return true;
        } else {
          return false;
        }
      }),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      msg: "",
      contry: "",
      gender: "",
      hobby: "",
      document: "",
      condition: false,
    },
    validationSchema: contectSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
  } = formik;

  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Contact</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div>
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <p className="mb-4">
                    The contact form is currently inactive. Get a functional and
                    working contact form with Ajax &amp; PHP in a few minutes.
                    Just copy and paste the files, add a little code and you're
                    done.{" "}
                    <a href="https://htmlcodex.com/contact-form">
                      Download Now
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: 400 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <form action className onSubmit={handleSubmit}>
                  <input
                    name="name"
                    type="text"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <span className="error">{errors.name}</span>
                  ) : (
                    ""
                  )}
                  <input
                    name="email"
                    type="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <span className="error">{errors.email}</span>
                  ) : (
                    ""
                  )}
                  <input
                    name="number"
                    type="text"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                  />
                  {errors.number && touched.number ? (
                    <span className="error">{errors.number}</span>
                  ) : (
                    ""
                  )}
                  <textarea
                    name="msg"
                    className="w-100 form-control border-0 mb-4"
                    rows={5}
                    cols={10}
                    placeholder="Your Message"
                    defaultValue={""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.msg}
                  />
                  {errors.msg && touched.msg ? (
                    <span className="error">{errors.msg}</span>
                  ) : (
                    ""
                  )}
                  <label>
                    <input
                      className="gender"
                      type="radio"
                      name="gender"
                      value="m"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Male
                    <input
                      className="gender"
                      type="radio"
                      name="gender"
                      value="f"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Female
                  </label>
                  {errors.gender && touched.gender ? (
                    <span className="error">{errors.gender}</span>
                  ) : (
                    ""
                  )}
                  <label>
                    <input
                      type="checkbox"
                      className="gender"
                      name="hobby"
                      value={"Treaking"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Treaking
                    <input
                      type="checkbox"
                      className="gender"
                      name="hobby"
                      value={"Climbing"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Climbing
                    <input
                      type="checkbox"
                      className="gender"
                      name="hobby"
                      value={"Traveling"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Traveling
                    <input
                      type="checkbox"
                      className="gender"
                      name="hobby"
                      value={"Readding"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Readding
                  </label>
                  {errors.hobby && touched.hobby ? (
                    <span className="error">{errors.hobby}</span>
                  ) : (
                    ""
                  )}
                  <input
                    type="file"
                    name="document"
                    onChange={(e) =>
                      setFieldValue("document", e.target.files[0])
                    }
                    onBlur={handleBlur}
                  />
                  {errors.document && touched.document ? (
                    <span className="error">{errors.document}</span>
                  ) : (
                    ""
                  )}

                  <select
                    className="w-100 form-control border-0 py-3 mb-4"
                    name="contry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contry}
                  >
                    <option value="">-- select Country</option>
                    <option value="1">India</option>
                    <option value="2">Spain</option>
                    <option value="3">USA</option>
                  </select>
                  {errors.contry && touched.contry ? (
                    <span className="error">{errors.contry}</span>
                  ) : (
                    ""
                  )}

                  <label>
                    <input
                      type="checkbox"
                      name="condition"
                      value={"cheaked"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Terms & conditions Applay.
                  </label>
                  {errors.condition && touched.condition ? (
                    <span className="error">Please cheak the condition</span>
                  ) : (
                    ""
                  )}
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street New York.USA</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4" />
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">info@example.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contect;
