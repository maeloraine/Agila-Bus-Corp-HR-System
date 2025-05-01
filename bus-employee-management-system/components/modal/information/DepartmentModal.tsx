'use client';

import React, { useState, useEffect } from 'react';
import styles from './DepartmentModal.module.css';
import ConfirmMessage from '@/components/modal/ConfirmMessage';

interface DepartmentModalProps {
  isEdit: boolean;
  defaultValue?: string;
  existingDepartments: string[];
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
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
    setSuccess('Department added successfully.');
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
    onSubmit(departmentName.trim());
    setSuccess('Department updated successfully.');
    setError('');

    setTimeout(() => {
      setSuccess('');
      onClose();
    }, 2000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{isEdit ? 'Edit Department' : 'Add Department'}</h2>
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className={styles.inputField}
          placeholder="Enter department name"
        />

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button
            onClick={isEdit ? handleUpdateConfirm : handleSubmit}
            className={styles.submitButton}
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmMessage
          message="Are you sure you want to update?"
          onConfirm={handleConfirmedSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default DepartmentModal;
