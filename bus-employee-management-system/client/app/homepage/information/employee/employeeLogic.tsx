import { useState } from 'react';

interface Employee {
  status: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  contact: string;
  dateHired: string;
  department: string;
  position: string;
  email: string;
  address: string;
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
  const [isReadOnlyView, setIsReadOnlyView] = useState(false);


  const [employees, setEmployees] = useState<Employee[]>([
    {
      status: 'Active',
      firstName: 'Juan',
      middleName: 'Cruz',
      lastName: 'Dela',
      birthdate: '1995-05-10',
      contact: '09171234567',
      dateHired: '2023-01-15',
      department: 'Operations',
      position: 'Driver',
      email: 'juan.dela@example.com',
      address: '123 Main Street'
    },
    {
      status: 'On Leave',
      firstName: 'Mark',
      middleName: 'Antonio',
      lastName: 'Reyes',
      birthdate: '1990-02-20',
      contact: '09181234567',
      dateHired: '2023-03-10',
      department: 'Human Resource',
      position: 'Supervisor',
      email: 'mark.reyes@example.com',
      address: '456 Second Street'
    },
    {
      status: 'Active',
      firstName: 'Ana',
      middleName: 'Liza',
      lastName: 'Santos',
      birthdate: '1992-08-12',
      contact: '09221234567',
      dateHired: '2022-11-05',
      department: 'Inventory',
      position: 'Warehouse Staff',
      email: 'analiza@gmail.com',
      address: '199 Commonwealth Quezon City'
    },
    {
      status: "Active",
      firstName: "Roberto",
      middleName: "Sy",
      lastName: "Chua",
      birthdate: "1993-08-14",
      contact: "09179988776",
      dateHired: "2023-05-20",
      department: "Operations",
      position: "Dispatcher",
      email: "robertochua1@gmail.com",
      address: "Villonco St. Quezon City"
    },
    {
      status: "Active",
      firstName: "Theresa",
      middleName: "Reyes",
      lastName: "Cruz",
      birthdate: "1991-02-28",
      contact: "09201234567",
      dateHired: "2022-11-01",
      department: "Accounting",
      position: "Billing Clerk",
      email: "thescruz0228@gmail.com",
      address: "Tandang Sora. Quezon City"
    },
    {
      status: "Active",
      firstName: "Daniel",
      middleName: "Perez",
      lastName: "Mercado",
      birthdate: "1987-06-05",
      contact: "09998765432",
      dateHired: "2021-09-15",
      department: "Inventory",
      position: "Warehouse Manager",
      email: "daniel_mercado@gmail.com",
      address: "Visayas Ave. Quezon City"
    },
    {
      status: "On Leave",
      firstName: "Joyce",
      middleName: "Lim",
      lastName: "Santos",
      birthdate: "1996-04-18",
      contact: "09185544332",
      dateHired: "2024-01-01",
      department: "Human Resource",
      position: "Recruitment Specialist",
      email: "j0ycesant05@gmail.com",
      address: "Cabuyao, Laguna"
    },
    {
      "status": "Active",
      "firstName": "Mark",
      "middleName": "Gonzales",
      "lastName": "David",
      "birthdate": "1989-12-03",
      "contact": "09176789012",
      "dateHired": "2020-07-25",
      "department": "Operations",
      "position": "Logistics Coordinator",
      email: "markdavid@gmail.com",
      address: "5th Ave. Cubao, Quezon City"
    }
  ]);

  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`.toLowerCase();
    return (
      (!statusFilter || emp.status === statusFilter) &&
      (!departmentFilter || emp.department === departmentFilter) &&
      (!positionFilter || emp.position === positionFilter) &&
      (!searchTerm || fullName.includes(searchTerm.toLowerCase()))
    );
  });

  const handleAdd = (newEmployee: Employee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  const handleEdit = (updatedEmployee: Employee) => {
    if (!selectedEmployee) return;

    const updatedList = employees.map(emp =>
      emp.firstName === selectedEmployee.firstName &&
      emp.middleName === selectedEmployee.middleName &&
      emp.lastName === selectedEmployee.lastName
        ? updatedEmployee
        : emp
    );

    setEmployees(updatedList);
  };

  const handleDeleteRequest = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!selectedEmployee) return;

    const updatedList = employees.filter(emp =>
      emp.firstName !== selectedEmployee.firstName ||
      emp.middleName !== selectedEmployee.middleName ||
      emp.lastName !== selectedEmployee.lastName
    );
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
    handleDelete,
    isReadOnlyView,
    setIsReadOnlyView
  };
};
