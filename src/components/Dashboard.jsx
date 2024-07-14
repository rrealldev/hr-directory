import { Link } from "react-router-dom";

function Dashboard() {
  const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];

  return (
    <>
      <h2>Dashboard | Employee List:</h2>
      {employeeList.length === 0 ? (
        // Render message when employeeList is empty
        <div style={{ margin: "0.5rem" }}>
          Employee list is empty. Add an employee using the link below.
        </div>
      ) : (
        // Render employee list when employeeList is not empty
        <div style={{ overflow: "scroll", height: "100px" }}>
          {employeeList.map((employee, index) => (
            <div key={index}>
              <Link to={`/employee/${employee.name}`}>{employee.name}</Link>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/add-employee">Add Employee</Link>
      </div>
    </>
  );
}

export default Dashboard;
