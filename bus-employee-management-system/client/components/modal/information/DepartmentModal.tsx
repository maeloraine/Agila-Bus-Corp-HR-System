'use client';

import React from 'react';
import styles from './InformationModal.module.css';
import ConfirmMessage from '@/components/modal/ConfirmMessage';

interface DepartmentModalProps {
  isEdit: boolean;
  departmentName: string;
  setDepartmentName: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  success: string;
  showConfirm: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onConfirm: () => void;
  onCancelConfirm: () => void;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isEdit,
  departmentName,
  setDepartmentName,
  error,
  success,
  showConfirm,
  onClose,
  onSubmit,
  onConfirm,
  onCancelConfirm,
}) => {
  
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
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onSubmit} className={styles.submitButton}>
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmMessage
          message="Are you sure you want to update?"
          onConfirm={onConfirm}
          onCancel={onCancelConfirm}
        />
      )}
    </div>
  );
};

export default DepartmentModal;
