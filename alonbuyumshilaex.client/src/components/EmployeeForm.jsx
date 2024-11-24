import React, { useState } from "react";

const EmployeeForm = ({ onAddEmployee }) => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddEmployee(formData);
		setFormData({ fullName: "", email: "" });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="fullName"
				placeholder="Full Name"
				value={formData.fullName}
				onChange={handleChange}
				required
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<button type="submit">Add Employee</button>
		</form>
	);
};

export default EmployeeForm;