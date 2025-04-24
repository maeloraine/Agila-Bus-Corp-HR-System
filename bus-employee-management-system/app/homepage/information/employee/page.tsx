'use client';

import React from "react";
import styles from './employee.module.css';

export default function EmployeePage() {
  return (
    <div className={styles.base}>
      <div className={styles.employeeContainer}>
        <h1>Employee List</h1>

        <div className={styles.headerSection}>
          <select className={styles.filterDropdown}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Deactivated">Deactivated</option>
          </select>
          <input type="text" placeholder="Search employees..." className={styles.searchBar} />
          <select className={styles.filterDropdown}>
            <option value="">All Departments</option>
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
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>2</td>
                <td>Active</td>
                <td>Juan Dela Cruz</td>
                <td>2023-01-15</td>
                <td>Operations</td>
                <td>Driver</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>3</td>
                <td>On Leave</td>
                <td>Juan Dela Cruz</td>
                <td>2023-01-15</td>
                <td>Operations</td>
                <td>Driver</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>4</td>
                <td>Active</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>5</td>
                <td>Active</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>6</td>
                <td>On Leave</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>7</td>
                <td>On Leave</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>8</td>
                <td>Resigned</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>9</td>
                <td>Active</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>10</td>
                <td>Active</td>
                <td>Maria Batumbakal</td>
                <td>2024-08-12</td>
                <td>Accounting</td>
                <td>Accountant</td>
                <td className={styles.actionCell}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}><img src="/assets/images/delete.png"/></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
