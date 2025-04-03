import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Counter from "./admin/container/counter/Counter";
import { Provider } from "react-redux";
import { store } from "./admin/container/redux/store";

function App() {
  return (
   <Provider store={store}>
    <Routes>
      <Route path='/*' element={<UserRoutes />} />
      <Route path='/admin/*' element={<AdminRoutes />}/>
      <Route path="/counter" element={<Counter />}/>
    </Routes>
   </Provider>
  );
}

export default App;
