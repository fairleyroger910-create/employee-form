import React, { useState, useEffect } from 'react';

function EmployeeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [employees, setEmployees] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load employees from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);

  // Save employees to localStorage on change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !role) {
      setError('All fields are required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Edit mode
    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = { name, email, role };
      setEmployees(updated);
      setEditingIndex(null);
      setSuccess('Employee updated successfully!');
    } else {
      // Add new employee
      setEmployees([...employees, { name, email, role }]);
      setSuccess('Employee added successfully!');
    }

    setName('');
    setEmail('');
    setRole('');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  const startEdit = (index) => {
    const emp = employees[index];
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
    setEditingIndex(index);
  };

  return (
    <div>
      <h2>New Employee Form</h2>

      {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <button type="submit">
          {editingIndex !== null ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {employees.map((emp, index) => (
          <li key={index} className="employee-card">
            <strong>{emp.name}</strong>
            <br />
            {emp.email}
            <br />
            {emp.role}
            <div className="employee-actions">
              <button onClick={() => startEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeForm;
