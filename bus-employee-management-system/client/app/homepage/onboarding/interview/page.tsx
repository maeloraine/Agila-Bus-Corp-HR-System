'use client';

import React from "react";
import styles from './interview.module.css';

export default function InterviewScheduling() {
  return (
    <div className={styles.base}>
      <div className={styles.employeeContainer}>
        <h1>Interview Schedules</h1>

        {/* Status Filter */}
        <div className={styles.headerSection}>
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
          
          {/* Interview Date Filter */}
          <select className={styles.filterDropdown}>
            <option value="" defaultChecked disabled>Date</option>
          </select>

          <button className={styles.addEmployeeButton}>Schedule Interview</button>
        </div>

        {/* Employee List Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th className={styles.firstColumn}>No.</th>
                <th>Name</th>
                <th>Desired Position</th>
                <th>Interview Date</th>
                <th>Interview Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.firstColumn}>1</td>
                <td>Juan Dela Cruz</td>
                <td>Driver</td>
                <td>2023-01-15</td>
                <td>Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>2</td>
                <td>Mark Reyes</td>
                <td>Supervisor</td>
                <td>2023-03-10</td>
                <td>Not Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>3</td>
                <td>Ana Santos</td>
                <td>Warehouse Staff</td>
                <td>2022-11-05</td>
                <td>Not Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>4</td>
                <td>Ramon Cruz</td>
                <td>Dispatcher</td>
                <td>2024-01-22</td>
                <td>Scheduled</td>
                <td className={styles.actionCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>
                    <img src="/assets/images/delete.png" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.firstColumn}>5</td>
                <td>Elaine Torres</td>
                <td>Recruiter</td>
                <td>2023-06-18</td>
                <td>Not Scheduled</td>
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
