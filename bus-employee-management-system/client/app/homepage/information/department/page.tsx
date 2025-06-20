'use client';

import React from 'react';
import styles from './department.module.css';
import "@/styles/filters.css"
import PaginationComponent from '@/components/ui/pagination';
import DepartmentModal from '@/components/modal/information/DepartmentModalLogic';
import { DepartmentLogic } from './departmentLogic';

const DepartmentPage = () => {
  const {
    filteredDepartments,
    paginatedDepartments,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
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
    handleAdd,
    handleEdit,
    handleDeleteRequest,
  } = DepartmentLogic();

  return (
    <div className={styles.base}>
      <div className={styles.departmentContainer}>
        <h1 className={styles.title}>Department List</h1>

        <div className={styles.headerSection}>

          {/* Search */}
          <div className={styles.search}>
            <i className='ri-search-line'/>
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


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
            <i className='ri-add-line'/>
            Add Department
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
              {paginatedDepartments.map((dept, index) => (
                <tr key={dept.name}>
                  <td className={styles.firstColumn}>{(currentPage - 1) * pageSize + index + 1}</td>
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
                    > <i className='ri-edit-2-line'/>
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteRequest(dept.name)}
                    > <i className='ri-delete-bin-line' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1); // reset to page 1 when size changes
          }}
        />

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
      </div>
    </div>
  );
};

export default DepartmentPage;