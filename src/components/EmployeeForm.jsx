import { useState } from "react";
import { Link } from "react-router-dom";

function EmployeeForm() {
  const formFields = [
    { label: "Name:", type: "text", name: "name", placeholder: "John Doe" },
    {
      label: "Email:",
      type: "email",
      name: "email",
      placeholder: "abc@gmail.com",
    },
    { label: "Role:", type: "text", name: "role", placeholder: "CEO" },
    {
      label: "Emergency Contact Person:",
      type: "text",
      name: "emergencyPerson",
      placeholder: "Jane Doe",
    },
    {
      label: "Emergency Contact Number:",
      type: "text",
      name: "emergencyPersonNumber",
      placeholder: "09123456789",
    },
  ];

  // State for form data and errors
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      //Store employee data to local storage
      const success = addToLocalStorage(formData);
      if (success) {
        // If data is added successfully, show the success alert
        setTimeout(() => alert("Form submitted successfully!"), 250);
        // Clear form data
        setFormData({});
        // Clear errors
        setErrors({});
      }
    } else {
      // If there are errors, update state to display them
      setErrors(validationErrors);
    }
  };

  // Function to add the employee data to local storage
  const addToLocalStorage = (formData) => {
    // Check if the employee already exists in the employee list
    const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
    const existingEntryIndex = employeeList.findIndex(
      (entry) => entry.name === formData.name
    );

    if (existingEntryIndex === -1) {
      // If the employee doesn't exist, push the employee data to the array of objects
      employeeList.push(formData);

      // Store the updated array of objects back into local storage
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      return true; // Return true indicating success
    } else {
      // If the employee already exists, display a message to the user
      alert(`${formData.name} is already an employee in this company!`);
      return false; // Return false indicating failure
    }
  };

  // Function to validate form data
  const validateForm = (data) => {
    const errors = {};
    // Check if fields are empty
    formFields.forEach((field) => {
      if (!data[field.name] || data[field.name].trim() === "") {
        errors[field.name] = "This field is required.";
      }
    });
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
    // Check role length
    if (data.role && data.role.length < 3) {
      errors.role = "Role must be at least 3 characters long.";
    }
    // Check emergency contact number format
    const phoneRegex = /^\d{11}$/;
    if (
      data.emergencyPersonNumber &&
      !phoneRegex.test(data.emergencyPersonNumber)
    ) {
      errors.emergencyPersonNumber =
        "Please enter a valid 11-digit phone number.";
    }
    return errors;
  };

  return (
    <>
      <h2>Employee Information Form</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>
              {field.label}
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                style={{ marginLeft: "0.275rem", marginTop: "0.45rem" }}
              />
            </label>
            {errors[field.name] && (
              <span style={{ color: "#FF2353", marginLeft: "0.275rem" }}>
                {errors[field.name]}
              </span>
            )}
            <br />
          </div>
        ))}
        <button type="submit" style={{ marginTop: "0.525rem" }}>
          Submit
        </button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/">Back to Dashboard</Link>
      </div>
    </>
  );
}

export default EmployeeForm;
