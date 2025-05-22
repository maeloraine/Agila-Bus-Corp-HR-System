import { useState } from 'react';


interface Employee {
  status: string;
  name: string;
  dateHired: string;
  department: string;
  position: string;
}

export const EmployeeLogic = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const [employees, setEmployees] = useState([
    { status: 'Active', name: 'Juan Dela Cruz', dateHired: '2023-01-15', department: 'Operations', position: 'Driver' },
    { status: 'On Leave', name: 'Mark Reyes', dateHired: '2023-03-10', department: 'Human Resource', position: 'Supervisor' },
    { status: 'Active', name: 'Ana Santos', dateHired: '2022-11-05', department: 'Inventory', position: 'Warehouse Staff' },
    { status: 'On Leave', name: 'Ramon Cruz', dateHired: '2024-01-22', department: 'Operations', position: 'Dispatcher' },
    { status: 'Resigned', name: 'Elaine Torres', dateHired: '2023-06-18', department: 'Human Resource', position: 'Recruiter' },
    { status: 'Active', name: 'Maria Batumbakal', dateHired: '2024-08-12', department: 'Accounting', position: 'Auditor' },
  ]);

  const filteredEmployees = employees.filter(emp => {
    return (
      (!statusFilter || emp.status === statusFilter) &&
      (!departmentFilter || emp.department === departmentFilter) &&
      (!positionFilter || emp.position === positionFilter) &&
      (!searchTerm || emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Add employee
  const handleAdd = (newEmployee: Employee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };


  // Edit employee
  const handleEdit = (updatedEmployee: Employee) => {
    if (!selectedEmployee) return;

    const exists = employees.some(emp =>
      emp.name.toLowerCase() === updatedEmployee.name.toLowerCase() &&
      emp.name !== selectedEmployee.name
    );

    const updatedList = employees.map(emp =>
      emp.name === selectedEmployee.name ? updatedEmployee : emp
    );

    setEmployees(updatedList);
  };



  const handleDeleteRequest = (employee: Employee) => {
  setSelectedEmployee(employee);
  setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!selectedEmployee) return;

    const updatedList = employees.filter(emp => emp.name !== selectedEmployee.name);
    setEmployees(updatedList);
    setShowDeleteConfirm(false);
    setPromptMessage('Employee deleted successfully!');
    setShowMessagePrompt(true);
  };

  return {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showMessagePrompt,
    setShowMessagePrompt,
    promptMessage,
    selectedEmployee,
    setSelectedEmployee,
    employees,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    positionFilter,
    setPositionFilter,
    handleAdd,
    handleEdit,
    handleDeleteRequest,
    handleDelete
  };
};
