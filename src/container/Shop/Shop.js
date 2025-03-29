import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Slide, Slider } from "@mui/material";
import { NavLink } from "react-router-dom";

function Shop(props) {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [sortdata, setsort] = useState("");
  const [catdata, setCatdata] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [price, setPrice] = useState(0);

  const getdata = () => {
    const localData = JSON.parse(localStorage.getItem("product"));
    setProduct(localData);

    const cData = JSON.parse(localStorage.getItem("category"));
    console.log(cData);
    setCatdata(cData);

    const Uniqueid = [];
    localData.map((v) => {
      let x = cData.find((v1) => v1.id == v.category);
      console.log(x);
      if (!Uniqueid.some((v2) => v2.id == v.category)) {
        Uniqueid.push(x);
      }
    });
    console.log(Uniqueid);

    setCatdata(Uniqueid);
  };
  useEffect(() => {
    getdata();
  }, []);

  const handleFilter = () => {
    const fdata = product.filter(
      (v) =>
        v.subname.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.subdescription.toLowerCase().includes(search.toLowerCase()) ||
        v.price.toString().includes(search.toString())
    );
    const sData = fdata.sort((a, b) => {
      if (sortdata === "AZ") {
        return a.subname.localeCompare(b.subname);
      } else if (sortdata === "ZA") {
        return b.subname.localeCompare(a.subname);
      } else if (sortdata === "LH") {
        return a.price - b.price;
      } else if (sortdata === "HL") {
        return b.price - a.price;
      }
    });

    if (selectedCat) {
      const ssdata = sData.filter((v1) => v1.category == selectedCat);

      return ssdata;
    }
    console.log(selectedCat);

    if (price) {
      const ssdata = sData.filter((v1) => v1.price <= price);
      return ssdata;
    }

    return sData;
  };
  console.log(search);
  console.log(price);

  const finalData = handleFilter();

  return product.length > 0 ? (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <h1 className="mb-4">Fresh fruits shop</h1>
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="row g-4">
              <div className="col-xl-3">
                <div className="input-group w-100 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span id="search-icon-1" className="input-group-text p-3">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>

              <div className="col-6" />

              <div className="col-xl-3">
                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                  <label htmlFor="fruits">Default Sorting:</label>
                  <select
                    onChange={(e) => setsort(e.target.value)}
                    id="fruits"
                    name="fruitlist"
                    className="border-0 form-select-sm bg-light me-3"
                    form="fruitform"
                  >
                    <option value={0}>--Select Sort--</option>
                    <option value={"AZ"}> A-Z</option>
                    <option value={"ZA"}> Z-A</option>
                    <option value={"LH"}> Low to High</option>
                    <option value={"HL"}> High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4>Categories</h4>
                      <ul className="list-unstyled fruite-categorie">
                        <li>
                          <div className="d-flex justify-content-between fruite-name">
                            <a
                              href="#"
                              onClick={() => setSelectedCat()}
                              style={{
                                color: selectedCat ? "#81c408" : "orange",
                              }}
                            >
                              <i className="fas fa-apple-alt me-2" />
                              All
                            </a>
                            <span>({product.length})</span>
                          </div>
                        </li>
                        {catdata.map((v) => (
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a
                                href="#"
                                onClick={() => setSelectedCat(v.id)}
                                style={{
                                  color:
                                    selectedCat == v.id ? "orange" : " #81c408",
                                }}
                              >
                                <i className="fas fa-apple-alt me-2" />
                                {v.name}
                                {/* {catdata?.find((v1) => v1.id == v.category)?.name} */}
                              </a>
                              <span>
                                (
                                {
                                  product.filter((v1) => v1.category == v.id)
                                    .length
                                }
                                )
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4 className="mb-2">Price</h4>
                      <Slider
                        style={{ color: " #81c408" }}
                        className="form-range w-100"
                        defaultValue={100}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        min={100}
                        max={500}
                        value={price}
                        onChange={(e, v) => setPrice(v)}
                      />
                      <output
                        id="amount"
                        name="amount"
                        min-velue={0}
                        max-value={500}
                        htmlFor="rangeInput"
                      >
                        {price}
                      </output>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4>Additional</h4>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-1"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-1"> Organic</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-2"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-2"> Fresh</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-3"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-3"> Sales</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-4"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-4"> Discount</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-5"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-5"> Expired</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h4 className="mb-3">Featured products</h4>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="img/featur-1.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="img/featur-2.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="img/featur-3.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <a
                        href="#"
                        className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                      >
                        Vew More
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <img
                        src="img/banner-fruits.jpg"
                        className="img-fluid w-100 rounded"
                        alt
                      />
                      <div
                        className="position-absolute"
                        style={{
                          top: "50%",
                          right: 10,
                          transform: "translateY(-50%)",
                        }}
                      >
                        <h3 className="text-secondary fw-bold">
                          Fresh <br /> Fruits <br /> Banner
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                  {finalData.map((v) => (
                    <div className="col-md-6 col-lg-6 col-xl-4">
                      <NavLink to={`/shop/:id`}>
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img
                              src="img/fruite-item-5.jpg"
                              className="img-fluid w-100 rounded-top"
                              alt
                            />
                          </div>
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: 10, left: 10 }}
                          >
                            {catdata.find((v1) => v1.id == v.category)?.name}
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>{v.subname}</h4>
                            <p>{v.subdescription}</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">
                                {v.price}
                              </p>
                              <a
                                href="#"
                                className="btn border border-secondary rounded-pill px-3 text-primary"
                              >
                                <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CircularProgress color="success" style={{ padding: "180px 0" }} />
  );
}

export default Shop;
