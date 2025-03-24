import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/container/Category/Category';
import SubCategory from '../admin/container/Subcategory/SubCategory';
import Productmng from '../admin/container/Productmng/Productmng';

function AdminRoutes(props) {
    return ( 
        <Layout>
            <Routes>
                <Route path='/category' element={<Category />}/>
                <Route path='/subcategory' element={<SubCategory />}/>
                <Route path='/product' element={<Productmng />}/>
            </Routes>
        </Layout>

    );
}

export default AdminRoutes;