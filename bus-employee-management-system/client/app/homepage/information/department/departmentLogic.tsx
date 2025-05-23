import { useState } from 'react';

export const DepartmentLogic = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDept, setSelectedDept] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');

    const [departments, setDepartments] = useState([
    { name: 'Accounting', employees: 12 },
    { name: 'Human Resource', employees: 25 },
    { name: 'Inventory', employees: 48 },
    { name: 'Operations', employees: 67 },
    ]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deptToDelete, setDeptToDelete] = useState('');

    const [showMessagePrompt, setShowMessagePrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');

    const handleAdd = (newName: string) => {
    setDepartments([...departments, { name: newName, employees: 0 }]);
    };

    const handleEdit = (updatedName: string) => {
    setDepartments((prev) =>
        prev.map((dept) =>
        dept.name === selectedDept ? { ...dept, name: updatedName } : dept
        )
    );
    };

    const handleDeleteRequest = (deptName: string) => {
    const dept = departments.find((d) => d.name === deptName);
    if (dept && dept.employees > 0) {
        setPromptMessage('This department cannot be deleted because it still contains employees.');
        setShowMessagePrompt(true);
        setShowDeleteConfirm(false);
        return;
    }
    setDeptToDelete(deptName);
    setShowDeleteConfirm(true);
    };

    const handleDelete = () => {
    setDepartments((prev) => prev.filter((d) => d.name !== deptToDelete));
    setShowDeleteConfirm(false);
    setPromptMessage('Department deleted successfully.');
    setShowMessagePrompt(true);
    };

    const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = true;

    if (employeeFilter) {
    const [min, max] = employeeFilter === '101+'
        ? [101, Infinity]
        : employeeFilter.split('-').map(Number);
    matchesFilter = dept.employees >= min && dept.employees <= max;
    }

    return matchesSearch && matchesFilter;
    });


    return {
    searchTerm,
    setSearchTerm,
    employeeFilter,
    setEmployeeFilter,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    selectedDept,
    setSelectedDept,
    departments,
    filteredDepartments,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deptToDelete,
    handleAdd,
    handleEdit,
    handleDeleteRequest,
    handleDelete,
    showMessagePrompt,
    setShowMessagePrompt,
    promptMessage,
    };
};