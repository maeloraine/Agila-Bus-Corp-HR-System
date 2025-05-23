'use client';

import React, { useState, useEffect } from 'react';
import DepartmentModalUI from '@/components/modal/information/DepartmentModal';

interface DepartmentModalLogicProps {
  isEdit: boolean;
  defaultValue?: string;
  existingDepartments: string[];
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const DepartmentModalLogic: React.FC<DepartmentModalLogicProps> = ({
  isEdit,
  defaultValue = '',
  existingDepartments,
  onClose,
  onSubmit,
}) => {
  const [departmentName, setDepartmentName] = useState(defaultValue);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setDepartmentName(defaultValue);
    setError('');
    setSuccess('');
  }, [defaultValue]);

  const validateInput = () => {
    const trimmed = departmentName.trim();

    if (!trimmed) {
      setError('Department name is required.');
      setSuccess('');
      return false;
    }

    const isDuplicate = existingDepartments
      .filter((name) => name !== defaultValue)
      .some((name) => name.toLowerCase() === trimmed.toLowerCase());

    if (isDuplicate) {
      setError('Department name already exists.');
      setSuccess('');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    onSubmit(departmentName.trim());
    setSuccess(isEdit ? 'Department updated successfully.' : 'Department added successfully.');
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
    handleSubmit();
  };

  return (
    <DepartmentModalUI
      isEdit={isEdit}
      departmentName={departmentName}
      setDepartmentName={setDepartmentName}
      error={error}
      success={success}
      showConfirm={showConfirm}
      onClose={onClose}
      onSubmit={isEdit ? handleUpdateConfirm : handleSubmit}
      onConfirm={handleConfirmedSubmit}
      onCancelConfirm={() => setShowConfirm(false)}
    />
  );
};

export default DepartmentModalLogic;
