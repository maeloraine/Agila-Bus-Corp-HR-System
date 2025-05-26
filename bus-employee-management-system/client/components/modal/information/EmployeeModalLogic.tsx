'use client';

import { useState } from 'react';

export interface Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  email: string;
  contact: string;
  address: string;
  status: string;
  dateHired: string;
  department: string;
  position: string;
}

const isAtLeast18 = (birthdate: string) => {
  const birth = new Date(birthdate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  return age > 18 || (age === 18 && m >= 0);
};

const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
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
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: '',
    email: '',
    contact: '',
    address: '',
    status: '',
    dateHired: '',
    department: '',
    position: '',
    ...defaultValue,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key in keyof Employee]?: string }>({});

  const validateInput = () => {
    const errors: typeof fieldErrors = {};

    if (!employee.firstName.trim()) errors.firstName = 'This field is required.';
    if (!employee.lastName.trim()) errors.lastName = 'This field is required.';
    if (!employee.birthdate) errors.birthdate = 'This field is required.';
    if (!employee.status) errors.status = 'This field is required.';
    if (!employee.contact) errors.contact = 'This field is required.';
    if (!employee.address) errors.address = 'This field is required.';
    if (!employee.dateHired) errors.dateHired = 'This field is required.';
    if (!employee.department) errors.department = 'This field is required.';
    if (!employee.position.trim()) errors.position = 'This field is required.';

    if (!employee.email || !isValidEmail(employee.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!isValidContact(employee.contact) || !isValidPhilippineContact(employee.contact)) {
      errors.contact = 'Invalid contact number.';
    }

    if (!isAtLeast18(employee.birthdate)) {
      errors.birthdate = 'Employee must be at least 18 years old.';
    }

    if (!isValidDateHired(employee.dateHired)) {
      errors.dateHired = 'Date hired cannot be a future date.';
    }

    setFieldErrors(errors);
    setError(Object.keys(errors).length > 0 ? 'All fields are required. Please fill highlighted fields.' : '');
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
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
      return;
    }

    onSubmit(employee);
    setSuccess(isEdit ? 'Employee updated successfully.' : 'Employee added successfully.');
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
    setTimeout(() => {
      setSuccess('');
      onClose();
    }, 2000);
  };

  return {
    employee,
    error,
    success,
    fieldErrors,
    showConfirm,
    handleChange,
    handleSubmit,
    handleUpdateConfirm,
    handleConfirmedSubmit,
    setShowConfirm,
  };
};
