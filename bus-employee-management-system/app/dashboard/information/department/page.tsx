'use client';

import React, { useState } from 'react';
import styles from './department.module.css';
import DepartmentModal from '@/components/modal/information/DepartmentModal';
import ConfirmMessage from '@/components/modal/ConfirmMessage';
import MessagePrompt from '@/components/modal/MessagePrompt';

const DepartmentPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  const [departments, setDepartments] = useState([
    { name: 'Accounting', employees: 8 },
    { name: 'Human Resource', employees: 6 },
    { name: 'Inventory', employees: 16 },
    { name: 'Operations', employees: 20 },
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState('');

  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');

  const handleAdd = (newName: string) => {
    setDepartments([
      ...departments,
      {
        name: newName,
        employees: 0,
      },
    ]);
  };

  const handleEdit = (updatedName: string) => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.name === selectedDept ? { ...dept, name: updatedName } : dept
      )
    );
  };

  // Error prompt kapag may employee pa sa Department
  const handleDeleteRequest = (deptName: string) => {
    const dept = departments.find((d) => d.name === deptName);
    if (dept && dept.employees > 0) {
      setPromptMessage('This department cannot be deleted because it still contains employees.');
      setShowMessagePrompt(true);
      setShowDeleteConfirm(false);
      return;
    }
    setDeptToDelete(deptName);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setDepartments((prev) => prev.filter((d) => d.name !== deptToDelete));
    setShowDeleteConfirm(false);
    setPromptMessage('Department deleted successfully.');
    setShowMessagePrompt(true);
  };

  return (
    <div className={styles.base}>
      <div className={styles.departmentContainer}>
        <h1>Department List</h1>

        <div className={styles.headerSection}>
          {/* Search */}
          <input type="text" className={styles.searchBar} placeholder="Search department..." />
          <div className={styles.searchButton}>
            <button><img src="/assets/images/search-icon.png" /></button>
          </div>

          {/* Filter by No. of Employees */}
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>No. of Employees</option>
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
              {departments.map((dept, index) => (
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