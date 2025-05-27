'use client';

import React from 'react';
import styles from './documents.module.css';
import { useDocumentsOrgFilesLogic } from './documentsOrgFilesLogic';

export default function DocumentsPage() {
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleAddFolder,
    newFolderName,
    setNewFolderName,
    folders,
    activeTab,
    setActiveTab,
    showConfirm,
    setShowConfirm,
    confirmAddFolder,
    handleDrop,
    dragging,
    setDragging,
    uploadedFiles,
    removeFile,
  } = useDocumentsOrgFilesLogic();

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toUpperCase() || '';
    return <span className="file-icon">{ext}</span>;
  };

  return (
    <div className={styles.base}>
      <div className={styles.tabs}>
        {['Organization Files', 'Employee Files', 'Folders', 'Forms and Templates'].map((tab) => (
          <div
            key={tab}
            className={`${styles.tabItem} ${activeTab === tab ? styles.tabItemActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={styles.documentsContainer}>
        <div className={styles.headerSection}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.actionButtons}>
            <button className={styles.buttonIcon} onClick={handleSearch}>🔍</button>
            <button className={styles.buttonIcon}>⚙️</button>
            <button className={styles.buttonIcon}>➕</button>
            <button className={styles.buttonIcon}>⋯</button>
          </div>
        </div>

        <div
          className={styles.filesPlaceholder}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
        >
          <div className={styles.placeholderBox}></div>
          <input
            type="text"
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button className={styles.addFolderButton} onClick={handleAddFolder}>Add Folder</button>
          <ul>
            {folders.map((folder, idx) => (
              <li key={idx}>{folder}</li>
            ))}
          </ul>

          {uploadedFiles.length > 0 && (
            <div className={styles.uploadedFiles}>
              <ul>
                {uploadedFiles.map((file, idx) => (
                  <li key={idx}>
                    <div className="file-info">
                      {getFileIcon(file.name)}
                      <span>{file.name}</span>
                    </div>
                    <button className="delete-btn" onClick={() => removeFile(idx)}>✕</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {showConfirm && (
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to add the folder "{newFolderName}"?</p>
              <button onClick={confirmAddFolder}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
