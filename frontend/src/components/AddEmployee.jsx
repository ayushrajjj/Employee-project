import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-toastify'; // ✅ Import toast

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    phone: '',
    email: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Fetch employee when editing
  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await EmployeeService.getEmployeeById(id);
          setEmployee(response.data);
        } catch (error) {
          console.error('Error fetching employee:', error);
          toast.error('Error loading employee ❌');
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: '',
      name: '',
      phone: '',
      email: ''
    });
    toast.info('Form cleared 🧹');
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // ✅ Update existing employee
        await EmployeeService.updateEmployee(employee, id);
        toast.success('Employee updated successfully ✏️'); // ✅ Toast for update
      } else {
        // ✅ Add new employee
        await EmployeeService.saveEmployee(employee);
        toast.success('Employee added successfully 🎉'); // ✅ Toast for add
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Error saving employee ❌');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 my-10 rounded-xl shadow-lg py-6 px-8 text-white">
      <h1 className="text-2xl font-semibold text-center mb-6 text-white">
        {id ? 'Edit Employee' : 'Add Employee'}
      </h1>

      <form className="space-y-4" onSubmit={saveEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
          >
            {id ? 'Update' : 'Save'}
          </button>
          <button
            onClick={reset}
            type="button"
            className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-medium"
          >
            Clear
          </button>
          <button
            onClick={() => navigate('/')}
            type="button"
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
