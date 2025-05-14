'use client';

import React from "react";
import styles from './employee.module.css';

export default function EmployeePage() {
  return (
    <div className={styles.base}>
      <div className={styles.employeeContainer}>
        <h1>Employee List</h1>

        {/* Status Filter */}
        <div className={styles.headerSection}>
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
          </select>

          {/* Search */}
          <input type="text" className={styles.searchBar} placeholder="Search employees..."/>
          <div className={styles.searchButton}>
          <button><img src="/assets/images/search-icon.png" /></button>
          </div>
          
          {/* Department Filter */}
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>All Departments</option>
            <option value="Accounting">Accounting</option>
            <option value="HR">Human Resource</option>
            <option value="Inventory">Inventory</option>
            <option value="Operational">Operational</option>
          </select>
          <button className={styles.addEmployeeButton}>Add employee</button>
          <button className={styles.importButton}>Import</button>
        </div>

        {/* Employee List Table */}
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
              <tr>
                <td className={styles.firstColumn}>1</td>
                <td>Active</td>
                <td>Juan Dela Cruz</td>
                <td>2023-01-15</td>
                <td>Operations</td>
                <td>Driver</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>2</td>
                <td>On Leave</td>
                <td>Mark Reyes</td>
                <td>2023-03-10</td>
                <td>Human Resource</td>
                <td>Supervisor</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>3</td>
                <td>Active</td>
                <td>Ana Santos</td>
                <td>2022-11-05</td>
                <td>Inventory</td>
                <td>Warehouse Staff</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>4</td>
                <td>On Leave</td>
                <td>Ramon Cruz</td>
                <td>2024-01-22</td>
                <td>Operations</td>
                <td>Dispatcher</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>5</td>
                <td>Resigned</td>
                <td>Elaine Torres</td>
                <td>2023-06-18</td>
                <td>Human Resource</td>
                <td>Recruiter</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>6</td>
                <td>Active</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Auditor</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              {/* Keep or update remaining rows if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
