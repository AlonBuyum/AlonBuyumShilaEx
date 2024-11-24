import React from "react";

const EmployeeList = ({ employees, onDeleteEmployee }) => {
  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.fullName} ({employee.email}){" "}
          <button onClick={() => onDeleteEmployee(employee.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;