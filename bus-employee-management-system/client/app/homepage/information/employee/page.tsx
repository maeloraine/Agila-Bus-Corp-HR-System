'use client';

import React from "react";
import styles from './employee.module.css';
import { EmployeeLogic } from './employeeLogic';
import EmployeeModal from '@/components/modal/information/EmployeeModal';
import ConfirmMessage from '@/components/modal/ConfirmMessage';
import MessagePrompt from '@/components/modal/MessagePrompt';

export default function EmployeePage() {
  const {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    selectedEmployee,
    setSelectedEmployee,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleAdd,
    handleEdit,
    handleDeleteRequest,
    handleDelete,
    showMessagePrompt,
    setShowMessagePrompt,
    isReadOnlyView,
    setIsReadOnlyView,
    promptMessage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    positionFilter,
    setPositionFilter,
    filteredEmployees,
    employees
  } = EmployeeLogic();

  return (
    <div className={styles.base}>
      <div className={styles.employeeContainer}>
        <h1>Employee List</h1>

        <div className={styles.headerSection}>
          <select
            className={styles.filterDropdown}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
          </select>

          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className={styles.filterDropdown}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Accounting">Accounting</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Inventory">Inventory</option>
            <option value="Operations">Operations</option>
          </select>

          <select
            className={styles.filterDropdown}
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="Driver">Driver</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Warehouse Staff">Warehouse Staff</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Auditor">Auditor</option>
          </select>

          <button className={styles.addEmployeeButton} onClick={() => setShowAddModal(true)}>Add employee</button>
          <button className={styles.importButton}>Import</button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th className={styles.firstColumn}>No.</th>
                <th>Status</th>
                <th>Name</th>
                <th>Date Hired</th>
                <th>Department</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={`${emp.firstName}-${emp.lastName}-${index}`}>
                  <td className={styles.firstColumn}>{index + 1}</td>
                  <td>{emp.status}</td>
                  <td>{`${emp.firstName} ${emp.middleName} ${emp.lastName}`}</td>
                  <td>{emp.dateHired}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.viewButton}
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsReadOnlyView(true);
                        setShowEditModal(true);
                      }}
                    >
                      View
                    </button>

                    <button
                      className={styles.editButton}
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsReadOnlyView(false);
                        setShowEditModal(true);
                      }}
                    >
                      <img src="/assets/images/edit.png" />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteRequest(emp)}
                    >
                      <img src="/assets/images/delete.png" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {showAddModal && (
          <EmployeeModal
            isEdit={false}
            existingEmployees={employees}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAdd}
          />
        )}

        {showEditModal && selectedEmployee && (
          <EmployeeModal
            isEdit={true}
            defaultValue={selectedEmployee}
            existingEmployees={employees}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEdit}
          />
        )}

        {showDeleteConfirm && (
          <ConfirmMessage
            message="Are you sure you want to delete this employee?"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}

        {showMessagePrompt && (
          <MessagePrompt
            message={promptMessage}
            onClose={() => setShowMessagePrompt(false)}
          />
        )}

        {showEditModal && selectedEmployee && (
          <EmployeeModal
            isEdit={!isReadOnlyView}
            isReadOnly={isReadOnlyView}
            defaultValue={selectedEmployee}
            existingEmployees={employees}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEdit}
          />
        )}
        
      </div>
    </div>
  );
}
