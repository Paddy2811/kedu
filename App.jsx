import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StaffList from "./pages/staff/StaffList";
import CreateStaff from "./pages/staff/CreateStaff";
import StaffDetail from "./pages/staff/StaffDetail";
import StudentList from "./pages/students/StudentList";
import StudentDetail from "./pages/students/StudentDetail";
import CourseList from "./pages/courses/CourseList";
import CourseDetail from "./pages/courses/CourseDetail";
import CreateStudent from "./pages/students/CreateStudent";
import FacilityList from "./pages/facilities/FacilityList";
import ClassList from "./pages/classes/ClassList";
import CreateClass from "./pages/classes/CreateClass";
import ClassDetail from "./pages/classes/ClassDetail";
import ClassRegistration from "./pages/enrollment/ClassRegistration";
import AttendanceCheck from "./pages/attendance/AttendanceCheck";
import ProductList from "./pages/products/ProductList";
import CreateNewProduct from "./pages/products/CreateNewProduct";
import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import TransactionList from "./pages/transactions/TransactionList";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/staffs" element={<ProtectedRoute><StaffList /></ProtectedRoute>} />
      <Route path="/staffs/create" element={<ProtectedRoute><CreateStaff /></ProtectedRoute>} />
      <Route path="/staffs/:id/edit" element={<ProtectedRoute><CreateStaff /></ProtectedRoute>} />
      <Route path="/staffs/:id" element={<ProtectedRoute><StaffDetail /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
      <Route path="/students/create" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
      <Route path="/students/:id" element={<ProtectedRoute><StudentDetail /></ProtectedRoute>} />
      <Route path="/students/:id/edit" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
      <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
      <Route path="/classes/create" element={<ProtectedRoute><CreateClass /></ProtectedRoute>} />
      <Route path="/classes/:id/edit" element={<ProtectedRoute><CreateClass /></ProtectedRoute>} />
      <Route path="/classes/:id" element={<ProtectedRoute><ClassDetail /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><ClassRegistration /></ProtectedRoute>} />
      <Route path="/facilities" element={<ProtectedRoute><FacilityList /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AttendanceCheck /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/create" element={<ProtectedRoute><CreateNewProduct /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><TransactionList /></ProtectedRoute>} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BreadcrumbProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster 
            position="bottom-right" 
            richColors 
          />
        </AuthProvider>
      </BreadcrumbProvider>
    </BrowserRouter>
  );
}

export default App;
 