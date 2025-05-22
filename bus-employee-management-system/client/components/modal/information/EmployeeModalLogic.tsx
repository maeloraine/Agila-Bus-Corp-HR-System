'use client';

import { useState } from 'react';

export interface Employee {
  status: string;
  name: string;
  dateHired: string;
  department: string;
  position: string;
}

export const useEmployeeModal = (
  isEdit: boolean,
  defaultValue: Employee | undefined,
  existingEmployees: Employee[],
  onSubmit: (employee: Employee) => void,
  onClose: () => void
) => {
  const [employee, setEmployee] = useState<Employee>({
    status: '',
    name: '',
    dateHired: '',
    department: '',
    position: '',
    ...defaultValue,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const validateInput = () => {
    if (!employee.name.trim() || !employee.status || !employee.dateHired || !employee.department || !employee.position.trim()) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleChange = (field: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const isDuplicate = existingEmployees.some(emp =>
      emp.name.toLowerCase() === employee.name.toLowerCase() &&
      (!isEdit || emp.name !== defaultValue?.name)
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

    const isDuplicate = existingEmployees.some(emp =>
      emp.name.toLowerCase() === employee.name.toLowerCase() &&
      (!isEdit || emp.name !== defaultValue?.name)
    );

    if (isDuplicate) {
      setError('Another employee with this name already exists.');
      setSuccess('');
      return;
    }

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
