import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import Home from "./screens/Home";
import PrivateRoute from "./components/PrivateRoute";
import PlantScreen from "./screens/PlantScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/SignupScreen";
import StaffLoginScreen from "./screens/StaffLoginScreen";
import AddressScreen from "./screens/AddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OderScreen";
import Profile from "./screens/Profile";
import MyOrders from "./screens/MyOrders";
import Dashboard from "./screens/Dashboard";
import Orders from "./screens/Orders";
import Admin from "./screens/Admin";
import Plants from "./screens/Plants";
import AdminRoute from "./components/AdminRoute";
import Staff from "./screens/Staff";
import Users from "./screens/Users";
import Categories from "./screens/Categories";
import StaffEdit from "./screens/StaffEdit";
import UserEdit from "./screens/UserEdit";
import StaffAdd from "./screens/StaffAdd";
import PlantEdit from "./screens/PlantEdit";
import PlantAdd from "./screens/PlantAdd";
import CategoryEdit from "./screens/CategoryEdit";
import CustomerDetails from "./screens/CustomerDetails";
import StaffProfile from "./screens/StaffProfile";
import Options from "./screens/Options";
import PickUp from "./screens/PickUp";
import FerScreen from "./screens/FerScreen";
import Tools from "./screens/Tools";
import Services from "./screens/Services";
import Fertilzers from "./screens/Fertilzers";
import EditService from "./screens/EditService";
import AddService from "./screens/AddService";
import AddFertilizer from "./screens/AddFertilizer";
import EditFertilizer from "./screens/EditFertilizer";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/admin" element={<StaffLoginScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/shipping" element={<AddressScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/plant/:id" element={<PlantScreen />} />
        <Route path="/fertilizer/:id" element={<FerScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/options" element={<Options />} />
        <Route path="/pickup" element={<PickUp />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Route>
      <Route path="/" element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<Home />} />
          <Route
            path="/dashboard/counter/plant/:id"
            element={<PlantScreen />}
          />
          <Route
            path="/dashboard/counter/fertilizer/:id"
            element={<FerScreen />}
          />
          <Route path="/dashboard/cart" element={<CartScreen />} />
          <Route path="/dashboard/tools" element={<Tools />} />
          <Route path="/dashboard/services" element={<Services />} />
          <Route path="/dashboard/service/:id" element={<EditService />} />
          <Route path="/dashboard/service/create" element={<AddService />} />
          <Route path="/dashboard/fertilizers" element={<Fertilzers />} />
          <Route
            path="/dashboard/fertilizer/:id"
            element={<EditFertilizer />}
          />
          <Route
            path="/dashboard/fertilizer/create"
            element={<AddFertilizer />}
          />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/plants" element={<Plants />} />
          <Route path="/dashboard/plant/:id" element={<PlantEdit />} />
          <Route path="/dashboard/plant/create" element={<PlantAdd />} />
          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/staff/:id" element={<StaffEdit />} />
          <Route path="/dashboard/staff/create" element={<StaffAdd />} />
          <Route path="/dashboard/user/:id" element={<UserEdit />} />
          <Route path="/dashboard/customer" element={<CustomerDetails />} />
          <Route path="/dashboard/shipping" element={<AddressScreen />} />
          <Route path="/dashboard/payment" element={<PaymentScreen />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/order/:id" element={<OrderScreen />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/category/:id" element={<CategoryEdit />} />
        </Route>
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
