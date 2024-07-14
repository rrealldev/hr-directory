import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

function EmployeeInfo() {
  // Retrieve the "employeeName" parameter from the URL
  const { employeeName } = useParams();

  // Convert the name to lowercase for comparison
  const lowercaseName = employeeName.toLowerCase();

  // Retrieve the employee list from localStorage
  const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];

  // Find the index of the employee in the list
  const employeeIndex = employeeList.findIndex(
    (entry) => entry.name.toLowerCase() === lowercaseName
  );

  // If the employee does not exist in the list, render the NotFound component
  if (employeeIndex === -1) {
    return <NotFound />;
  } else {
    // If the employee exists, render the employee info
    return (
      <>
        <h2>Employee Info:</h2>
        <p>Name: {employeeList[employeeIndex].name}</p>
        <p>Role: {employeeList[employeeIndex].role}</p>
        <p>Email: {employeeList[employeeIndex].email}</p>
        <p>
          Emergency Contact Person:{" "}
          {employeeList[employeeIndex].emergencyPerson}
        </p>
        <p>
          Emergency Contact Number:{" "}
          {employeeList[employeeIndex].emergencyPersonNumber}
        </p>
        <Link to="/">Back to Dashboard</Link>
      </>
    );
  }
}

export default EmployeeInfo;
