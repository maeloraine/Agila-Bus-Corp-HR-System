'use client';

import React from 'react';
import styles from './InformationModal.module.css';
import ConfirmMessage from '@/components/modal/ConfirmMessage';
import { useEmployeeModal, Employee } from './EmployeeModalLogic';

interface EmployeeModalProps {
  isEdit: boolean;
  defaultValue?: Employee;
  existingEmployees: Employee[];
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = (props) => {
  const {
    employee,
    error,
    success,
    showConfirm,
    handleChange,
    handleSubmit,
    handleUpdateConfirm,
    handleConfirmedSubmit,
    setShowConfirm,
  } = useEmployeeModal(
    props.isEdit,
    props.defaultValue,
    props.existingEmployees,
    props.onSubmit,
    props.onClose
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{props.isEdit ? 'Edit Employee' : 'Add Employee'}</h2>

        <select className={styles.inputField} value={employee.status} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Resigned">Resigned</option>
        </select>

        <input
          className={styles.inputField}
          type="text"
          value={employee.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter employee name"
        />

        <input
          className={styles.inputField}
          type="date"
          value={employee.dateHired}
          onChange={(e) => handleChange('dateHired', e.target.value)}
        />

        <select className={styles.inputField} value={employee.department} onChange={(e) => handleChange('department', e.target.value)}>
          <option value="">Select department</option>
          <option value="Accounting">Accounting</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Inventory">Inventory</option>
          <option value="Operations">Operations</option>
        </select>

        <input
          className={styles.inputField}
          type="text"
          value={employee.position}
          onChange={(e) => handleChange('position', e.target.value)}
          placeholder="Enter position"
        />

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.buttonGroup}>
          <button onClick={props.onClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={props.isEdit ? handleUpdateConfirm : handleSubmit} className={styles.submitButton}>
            {props.isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmMessage
          message="Are you sure you want to update this employee?"
          onConfirm={handleConfirmedSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default EmployeeModal;
