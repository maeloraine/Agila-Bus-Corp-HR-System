'use client';

import { useState } from 'react';

export interface Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  email: string;
  contact: string;
  address:string;
  status: string;
  dateHired: string;
  department: string;
  position: string;
}


// Age Validation
const isAtLeast18 = (birthdate: string) => {
  const birth = new Date(birthdate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  return age > 18 || (age === 18 && m >= 0);
};

// Format Validation
const isValidEmail = (email: string) => /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
const isValidContact = (contact: string) => /^\d{11}$/.test(contact);
const isValidPhilippineContact = (contact: string) => /^(09)\d{9}$/.test(contact);
const isValidDateHired = (date: string) => new Date(date) <= new Date();

export const useEmployeeModal = (
  isEdit: boolean,
  defaultValue: Employee | undefined,
  existingEmployees: Employee[],
  onSubmit: (employee: Employee) => void,
  onClose: () => void
) => {
  const [employee, setEmployee] = useState<Employee>({
    status: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: '',
    contact: '',
    dateHired: '',
    department: '',
    position: '',
    email:'',
    address:'',
    ...defaultValue,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const validateInput = () => {
    if (!employee.firstName.trim() || !employee.lastName.trim() ||
        !employee.status || !employee.birthdate || !employee.contact || !employee.address ||
        !employee.dateHired || !employee.department || !employee.position.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!isAtLeast18(employee.birthdate)) {
      setError('Employee must be at least 18 years old.');
      return false;
    }

    if (!isValidEmail(employee.email)) {
      setError('Invalid email format');
      return false;
    }

    if (!isValidContact(employee.contact)) {
      setError('Contact number must be 11 digits.');
      return false;
    }

    if (!isValidPhilippineContact(employee.contact)) {
      setError('Invalid contact number format.');
      return false;
    }

    if (!isValidDateHired(employee.dateHired)) {
      setError('Date hired cannot be a future date.');
      return false;
    }
    return true;
  };

  const handleChange = (field: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const fullName = `${employee.firstName.toLowerCase()} ${employee.middleName.toLowerCase()} ${employee.lastName.toLowerCase()}`;
    const isDuplicate = existingEmployees.some(emp =>
      `${emp.firstName.toLowerCase()} ${emp.middleName.toLowerCase()} ${emp.lastName.toLowerCase()}` === fullName &&
      (!isEdit || `${emp.firstName} ${emp.middleName} ${emp.lastName}` !== `${defaultValue?.firstName} ${defaultValue?.middleName} ${defaultValue?.lastName}`)
    );

    if (isDuplicate) {
      setError('Employee already exists.');
      setSuccess('');
      return;
    }

    onSubmit(employee);
    setSuccess(isEdit ? 'Employee updated successfully.' : 'Employee added successfully.');
    setError('');

    setTimeout(() => {
      setSuccess('');
      onClose();
    }, 2000);
  };

  const handleUpdateConfirm = () => {
    if (!validateInput()) return;
    setShowConfirm(true);
  };

  const handleConfirmedSubmit = () => {
    setShowConfirm(false);

    if (!validateInput()) return;

    onSubmit(employee);
    setSuccess('Employee updated successfully.');
    setError('');

    setTimeout(() => {
      setSuccess('');
      onClose();
    }, 2000);
  };

  return {
    employee,
    error,
    success,
    showConfirm,
    handleChange,
    handleSubmit,
    handleUpdateConfirm,
    handleConfirmedSubmit,
    setShowConfirm,
  };
};
