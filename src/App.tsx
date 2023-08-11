import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Root from "./components/app-layout/Root";
import RoleWrapper from "./components/app-layout/RoleWrapper";
import Signin from "./screens/signin";
import AdminDashboard from "./screens/admin/dashboard";
import Account from "./screens/admin/account";
import UserDashboard from "./screens/user/dashboard";
import Size from "./screens/admin/size";
import Category from "./screens/admin/category";
import Stock from "./screens/admin/stock";
import Pos from "./screens/user/pos";
import BarcodeGenerator from "./screens/user/BarcodeGenerator";
import BarcodeScannerComponent from "./screens/user/BarcodeScannerComponent";
import UserInvoices from "./screens/user/user-invoices";
import AdminInvoices from "./screens/admin/admin-invoices";
import BillCart from "./screens/admin/BillCart";
import Signout from "./screens/signout";
import Profile from "./screens/profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<RoleWrapper role="ROLE_ADMIN" />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/signup" element={<Account />} />
        <Route path="/admin/sizes" element={<Size />} />
        <Route path="/admin/categories" element={<Category />} />
        <Route path="/admin/stocks" element={<Stock />} />
        <Route path="/admin/account" element={<Account />} />
        <Route path="/admin/invoices" element={<AdminInvoices />} />
        <Route path="/admin/billcart/:id" element={<BillCart />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Route>
      <Route element={<RoleWrapper role="ROLE_USER" />}>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/user/pos" element={<Pos />} />
        <Route path="/user/pos/:id" element={<Pos />} />
        <Route path="/user/invoices" element={<UserInvoices />} />
        <Route path="/user/profile" element={<Profile />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/scanner" element={<BarcodeScannerComponent />} />
      <Route path="/g" element={<BarcodeGenerator />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
