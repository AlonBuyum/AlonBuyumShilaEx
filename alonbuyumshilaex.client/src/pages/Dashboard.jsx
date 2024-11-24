import React, { useState, useEffect } from "react";
import { fetchEmployees, createEmployee, deleteEmployee } from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchEmployee from "../components/SearchEmployee";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response.data);
        setSearchResults(response.data); 
      } catch (err) {
        console.error(err);
      }
    };
    loadEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await createEmployee(newEmployee);
      setEmployees([...employees, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSearch = (query) => {
    const filtered = employees.filter((emp) =>
      emp.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <SearchEmployee onSearch={handleSearch} />
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <EmployeeList employees={searchResults} onDeleteEmployee={handleDeleteEmployee} />
    </div>
  );
};

export default Dashboard;