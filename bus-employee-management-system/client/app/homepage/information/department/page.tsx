'use client';

import React from 'react';
import styles from './department.module.css';
import DepartmentModal from '@/components/modal/information/DepartmentModalLogic';
import ConfirmMessage from '@/components/modal/ConfirmMessage';
import MessagePrompt from '@/components/modal/MessagePrompt';
import { DepartmentLogic } from './departmentLogic';

const DepartmentPage = () => {
  const {
    filteredDepartments,
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
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleAdd,
    handleEdit,
    handleDeleteRequest,
    handleDelete,
    showMessagePrompt,
    setShowMessagePrompt,
    promptMessage,
  } = DepartmentLogic();

  return (
    <div className={styles.base}>
      <div className={styles.departmentContainer}>
        <h1>Department List</h1>

        <div className={styles.headerSection}>
          {/* <input type="text" className={styles.searchBar} placeholder="Search department..." />
          <div className={styles.searchButton}>
            <button><img src="/assets/images/search-icon.png" /></button>
          </div> */}

          {/* Search */}
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* No. of Employees Filter */}
          <select
            className={styles.filterDropdown}
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
          >
            <option value="">No. of Employees</option>
            <option value="1-20">1-20</option>
            <option value="21-40">21-40</option>
            <option value="41-60">41-60</option>
            <option value="61-80">61-80</option>
            <option value="81-100">81-100</option>
            <option value="101+">more than 100</option>
          </select>
          <button onClick={() => setShowAddModal(true)} className={styles.addDepartmentButton}>
            Add department
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.departmentTable}>
            <thead>
              <tr>
                <th className={styles.firstColumn}>No.</th>
                <th>Department Name</th>
                <th>No. of Employees</th>
                <th>Time Added</th>
                <th>Time Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((dept, index) => (
                <tr key={dept.name}>
                  <td className={styles.firstColumn}>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.employees}</td>
                  <td>mm-dd-yyyy hh:mm</td>
                  <td>mm-dd-yyyy hh:mm</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.editButton}
                      onClick={() => {
                        setSelectedDept(dept.name);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteRequest(dept.name)}
                    >
                      <img src="/assets/images/delete.png" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <DepartmentModal
            isEdit={false}
            existingDepartments={departments.map((d) => d.name)}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAdd}
          />
        )}

        {showEditModal && (
          <DepartmentModal
            isEdit={true}
            defaultValue={selectedDept}
            existingDepartments={departments.map((d) => d.name)}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEdit}
          />
        )}

        {showDeleteConfirm && (
          <ConfirmMessage
            message="Are you sure you want to delete?"
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
      </div>
    </div>
  );
};

export default DepartmentPage;