import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-toastify'; // ✅ Import toast

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Failed to fetch employees ❌");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
   
  const deleteEmployee = async (id) => {
    try {
      await EmployeeService.deleteEmployeeById(id);
      setEmployees(employee.filter((emp) => emp.id !== id));
      toast.info("Employee deleted successfully 🗑️"); // ✅ Toast on delete
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee ❌");
    }
  };

  const navigate = useNavigate();

  return (
    <div className='container mx-auto my-8'> 
      <div>
        <button 
          onClick={() => navigate("/AddEmployee")} 
          className='bg-slate-600 hover:bg-green-500 my-12 font-semibold px-20 py-2 rounded text-white'
        >
          Add Employee
        </button>
      </div>

      <div>
        <table className='shadow w-full border border-slate-700'>
          <thead className='bg-slate-500 text-white'>
            <tr>
              <th className='px-6 py-3 uppercase tracking-wide'>Name</th>
              <th className='px-6 py-3 uppercase tracking-wide'>Phone</th>
              <th className='px-6 py-3 uppercase tracking-wide'>Email</th>
              <th className='px-6 py-3 uppercase tracking-wide'>Actions</th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {employee.length > 0 ? (
                employee.map((emp) => (
                  <tr key={emp.id} className=' hover:bg-slate-500 hover:text-white'>
                    <td className='px-6 py-4'>{emp.name}</td>
                    <td className='px-6 py-4'>{emp.phone}</td>
                    <td className='px-6 py-4'>{emp.email}</td>
                    <td className='px-6 py-4'>
                      <a 
                        href="#"  
                          onClick={() => navigate(`/edit-employee/${emp.id}`)}
                          className="text-blue-400 hover:text-blue-600 mr-4"
                      >
                        Edit
                      </a>
                      <a 
                        href="#" 
                        onClick={() => deleteEmployee(emp.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No employees found 😔
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Hero;
