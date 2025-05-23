'use client';

import React from 'react';
import styles from './InformationModal.module.css';
import ConfirmMessage from '@/components/modal/ConfirmMessage';
import { useEmployeeModal, Employee } from './EmployeeModalLogic';

interface EmployeeModalProps {
  isEdit: boolean;
  isReadOnly?: boolean;
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
        <h1>{props.isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
        <h3>Employee Details</h3>

        <div className='basicInfo'>
          <h4>Basic Information</h4>

          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id='lastName'
            name='lastName'
            className={styles.inputField}
            type="text"
            value={employee.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            disabled={props.isReadOnly}
          />

          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id='firstName'
            name='firstName'
            className={styles.inputField}
            type="text"
            value={employee.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            disabled={props.isReadOnly}
          />

          <label htmlFor="middleName" className={styles.label}>
            Middle Name
          </label>
          <input
            id='middleName'
            name='middleName'
            className={styles.inputField}
            type="text"
            value={employee.middleName}
            onChange={(e) => handleChange('middleName', e.target.value)}
            placeholder="Enter middle name"
            disabled={props.isReadOnly}
          />

          <label htmlFor="birthdate" className={styles.label}>
            Birthdate
          </label>
          <input
            id='birthdate'
            name='birthdate'
            className={styles.inputField}
            type="date"
            value={employee.birthdate}
            onChange={(e) => handleChange('birthdate', e.target.value)}
            disabled={props.isReadOnly}
          />
        </div>

        <div className='contactInfo'>
          <h4>Contact Information</h4>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id='email'
            name='email'
            className={styles.inputField}
            type="text"
            value={employee.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
            disabled={props.isReadOnly}
          />

          <label htmlFor="contactNo" className={styles.label}>
            Contact no.
          </label>
          <input
            id='contactNo'
            name='contactNo'
            className={styles.inputField}
            type="text"
            value={employee.contact}
            onChange={(e) => handleChange('contact', e.target.value)}
            placeholder="Enter 11-digit contact number"
            disabled={props.isReadOnly}
          />

          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            id='address'
            name='address'
            className={styles.inputField}
            type="text"
            value={employee.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter your address"
            disabled={props.isReadOnly}
          />
        </div>

        <div className='workInfo'>
          <h4>Work Information</h4>

          <select className={styles.inputField} value={employee.status} onChange={(e) => handleChange('status', e.target.value)} disabled={props.isReadOnly}>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
          </select>

          <label htmlFor="dateHired" className={styles.label}>
              Date hired
            </label>
          <input
            id='dateHired'
            name='dateHired'
            className={styles.inputField}
            type="date"
            value={employee.dateHired}
            onChange={(e) => handleChange('dateHired', e.target.value)}
            disabled={props.isReadOnly}
          />

          <select className={styles.inputField} value={employee.department} onChange={(e) => handleChange('department', e.target.value)} disabled={props.isReadOnly}>
            <option value="">Select department</option>
            <option value="Accounting">Accounting</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Inventory">Inventory</option>
            <option value="Operations">Operations</option>
          </select>

          <label htmlFor="jobPosition" className={styles.label}>
            Position
          </label>
          <input
            id='jobPosition'
            name='jobPosition'
            className={styles.inputField}
            type="text"
            value={employee.position}
            onChange={(e) => handleChange('position', e.target.value)}
            placeholder="Enter position"
            disabled={props.isReadOnly}
          />
        </div>

        <h3>Related Forms/ Requests</h3>
        <div className='relatedForms'>
          <h4>Exit Details</h4>
          <div className={styles.tableWrapper}></div>
            <table className={styles.exitDetailsTable}>
              <thead>
              <tr>
                <th className={styles.firstColumn}>No.</th>
                <th>Date Hired</th>
                <th>Department</th>
                <th>Position</th>
                <th>Request Date</th>
                <th>Last Day of Work</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>1</td>
                  <td>2019-02-20</td>
                  <td>Operations</td>
                  <td>Driver</td>
                  <td>2024-04-15</td>
                  <td>2024-05-15</td>
                </tr>
              </tbody>
            </table>

          <h4>Leave Requests</h4>
          <div className={styles.tableWrapper}></div>
            <table className={styles.leaveRequestTable}>
              <thead>
                <tr>
                  <th className={styles.firstColumn}>No.</th>
                  <th>Date Hired</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Request Date</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2021-03-10</td>
                  <td>Operations</td>
                  <td>Driver</td>
                  <td>2024-03-01</td>
                  <td>Vacation Leave</td>
                  <td>2024-06-10</td>
                  <td>2024-06-17</td>
                </tr>
              </tbody>
            </table>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.buttonGroup}>
          {props.isReadOnly ? (
            <button onClick={props.onClose} className={styles.cancelButton}>Close</button>
          ) : (
            <>
              <button onClick={props.onClose} className={styles.cancelButton}>Cancel</button>
              <button onClick={props.isEdit ? handleUpdateConfirm : handleSubmit} className={styles.submitButton}>
                {props.isEdit ? 'Update' : 'Add'}
              </button>
            </>
          )}
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
