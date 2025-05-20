'use client';

import React from "react";
import styles from './candidate.module.css';

export default function CandidateOverview() {
  return (
    <div className={styles.base}>
      <div className={styles.employeeContainer}>
        <h1>Candidate Overview</h1>

        {/* Status Filter */}
        <div className={styles.headerSection}>
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>Applicant Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Hired">Hired</option>
          </select>

          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>Interview Status</option>
            <option value="notScheduled">Not scheduled</option>
            <option value="Scheduled">Scheduled</option>
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

          {/* Position Filter */}
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>Job Position</option>
            <option value="Driver">Driver</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Warehouse Staff">Warehouse Staff</option>
            <option value="Recruiter">Recruiter</option>
          </select>

          <button className={styles.addEmployeeButton}>Add candidate</button>
        </div>

        {/* Employee List Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th className={styles.firstColumn}>No.</th>
                <th>Name</th>
                <th>Desired Position</th>
                <th>Source of Hire</th>
                <th>Application Date</th>
                <th>Department</th>
                <th>Application Status</th>
                <th>Interview Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.firstColumn}>1</td>
                <td>Juan Dela Cruz</td>
                <td>Driver</td>
                <td>Referral</td>
                <td>2023-01-15</td>
                <td>Operations</td>
                <td>Processing</td>
                <td>Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.commentButton}>
                    <img src="/assets/images/comment.png" />
                  </button>
                  <button className={styles.editButton}>
                    <img src="/assets/images/edit.png" />
                  </button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>2</td>
                <td>Mark Reyes</td>
                <td>Supervisor</td>
                <td>Direct sourcing</td>
                <td>2023-03-10</td>
                <td>Human Resource</td>
                <td>Pending</td>
                <td>Not Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.commentButton}>
                    <img src="/assets/images/comment.png" />
                  </button>
                  <button className={styles.editButton}>
                    <img src="/assets/images/edit.png" />
                  </button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>3</td>
                <td>Ana Santos</td>
                <td>Warehouse Staff</td>
                <td>Job boards</td>
                <td>2022-11-05</td>
                <td>Inventory</td>
                <td>Processing</td>
                <td>Not Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.commentButton}>
                    <img src="/assets/images/comment.png" />
                  </button>
                  <button className={styles.editButton}>
                    <img src="/assets/images/edit.png" />
                  </button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>4</td>
                <td>Ramon Cruz</td>
                <td>Dispatcher</td>
                <td>Recruitment Agency</td>
                <td>2024-01-22</td>
                <td>Operations</td>
                <td>Hired</td>
                <td>Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.commentButton}>
                    <img src="/assets/images/comment.png" />
                  </button>
                  <button className={styles.editButton}>
                    <img src="/assets/images/edit.png" />
                  </button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>5</td>
                <td>Elaine Torres</td>
                <td>Recruiter</td>
                <td>Job fair</td>
                <td>2023-06-18</td>
                <td>Human Resource</td>
                <td>Pending</td>
                <td>Not Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.commentButton}>
                    <img src="/assets/images/comment.png" />
                  </button>
                  <button className={styles.editButton}>
                    <img src="/assets/images/edit.png" />
                  </button>
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
