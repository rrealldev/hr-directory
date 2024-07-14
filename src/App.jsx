import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeInfo from "./components/EmployeeInfo";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/add-employee",
    element: <EmployeeForm />,
  },
  {
    path: "/employee/:employeeName",
    element: <EmployeeInfo />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
