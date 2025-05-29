'use client';

import React, { useRef, useState } from 'react';
import styles from './documents.module.css';
import { useDocumentsOrgFilesLogic, Entry } from './documentsOrgFilesLogic';

export default function DocumentsPage() {
  // view / sort / filter state
  const [viewMode, setViewMode] = useState<'list' | 'compact' | 'gallery'>('list');
  const [sortOption, setSortOption] = useState('name');
  const [filterOption, setFilterOption] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // selection state
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // logic hook
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleDrop,
    handleFileInputChange,
    handleFolderInputChange,
    dragging,
    setDragging,
    downloadAll,
    entries,
    currentPath,
    navigateToFolder,
    goToBreadcrumb,
    viewFile,
    downloadFile,
    removeFile,
    activeTab,
    setActiveTab,
  } = useDocumentsOrgFilesLogic();

  // hidden inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // formatting
  const formatSize = (b: number) =>
    b < 1024
      ? `${b} B`
      : b < 1048576
      ? `${(b / 1024).toFixed(1)} KB`
      : `${(b / 1048576).toFixed(1)} MB`;
  const formatDate = (ms: number) =>
    new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(ms));

  // upload dropdown handlers
  const toggleMenu = () => setMenuOpen((o) => !o);
  const onCreateFolder = () => {
    setMenuOpen(false);
    const name = window.prompt('New folder name:');
    if (name) console.log('Create folder:', name);
  };
  const onFilesUpload = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };
  const onFolderUpload = () => {
    setMenuOpen(false);
    folderInputRef.current?.click();
  };

  // selection toggle
  const toggleRow = (i: number) => {
    setSelectedRows((prev) => {
      const c = new Set(prev);
      c.has(i) ? c.delete(i) : c.add(i);
      return c;
    });
  };
  const anySelected = selectedRows.size > 0;

  return (
    <div className={styles.base}>
      {/* Top Tabs */}
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

      {/* Sub-tabs */}
      <div className={styles.subTabs}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`${styles.subTabItem} ${activeSubTab === i ? styles.subTabItemActive : ''}`}
            onClick={() => setActiveSubTab(i)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className={styles.topContent}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span onClick={() => goToBreadcrumb(0)}>My Files</span>
          {currentPath.map((p, i) => (
            <React.Fragment key={i}>
              <span className={styles.sep}>›</span>
              <span onClick={() => goToBreadcrumb(i + 1)}>{p}</span>
            </React.Fragment>
          ))}
        </div>

        <div className={styles.headerSection}>
          {anySelected ? (
            // when rows selected: show Download + Delete
            <>
              <button className={styles.utilityBtn} onClick={() => {
                // download each selected
                selectedRows.forEach(i => downloadFile(entries[i].items[0]));
              }}>
                <i className="ri-download-line" />
              </button>
              <button className={styles.utilityBtn} onClick={() => {
                // delete each selected (in reverse index order)
                Array.from(selectedRows).sort((a,b) => b-a).forEach(i => removeFile(i));
                setSelectedRows(new Set());
              }}>
                <i className="ri-delete-bin-line" />
              </button>
            </>
          ) : (
            // default controls: upload, search, filter
            <>
              {/* + Upload menu */}
              <div className={styles.uploadWrapper}>
                <button className={styles.uploadBtn} onClick={toggleMenu}>
                  <i className="ri-add-line" />
                </button>
                {menuOpen && (
                  <ul className={styles.uploadMenu}>
                    <li onClick={onCreateFolder}>
                      <i className="ri-folder-2-line" /> Add Folder
                    </li>
                    <li onClick={onFilesUpload}>
                      <i className="ri-upload-line" /> Files upload
                    </li>
                    <li onClick={onFolderUpload}>
                      <i className="ri-folder-upload-line" /> Folder upload
                    </li>
                  </ul>
                )}
              </div>

              {/* Search input + button */}
              <input
                className={styles.searchBar}
                type="text"
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles.utilityBtn} onClick={handleSearch}>
                <i className="ri-search-line" />
              </button>

              {/* Filter button */}
              <button className={styles.utilityBtn}>
                <i className="ri-filter-line" />
              </button>
            </>
          )}

          {/* right-side selects always visible */}
          <select
            className={styles.dropdownSelect}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
              {/* Table + Dropzone */}
      <div className={styles.tableWrapper}>
        <table className={styles.driveTable}>
          <thead>
            <tr>
              <th className={styles.checkCell}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(new Set(entries.map((_, i) => i)));
                    } else {
                      setSelectedRows(new Set());
                    }
                  }}
                  checked={selectedRows.size === entries.length && entries.length > 0}
                />
              </th>
              <th>Name</th>
              <th>Modified</th>
              <th>Modified By</th>
              <th>File size</th>
              <th>Sharing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div
                    className={`${styles.filesPlaceholder} ${dragging ? styles.dragging : ''}`}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      handleDrop(e);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onClick={onFilesUpload}
                  >
                    {dragging
                      ? 'Release to upload'
                      : 'Drag & drop files here, or click + to upload'}
                  </div>
                </td>
              </tr>
            ) : (
              entries.map((e: Entry, i) => (
                <tr key={i}>
                  <td className={styles.checkCell}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>
                  <td className={styles.nameCell}>
                    {e.type === 'folder' ? (
                      <i className="ri-folder-2-line" />
                    ) : (
                      <i className="ri-file-text-line" />
                    )}
                    <span
                      className={styles.fileName}
                      onClick={() =>
                        e.type === 'folder' ? navigateToFolder(e.name) : viewFile(e.items[0])
                      }
                    >
                      {e.name}
                    </span>
                  </td>
                  <td>{formatDate(e.items[0].file.lastModified)}</td>
                  <td>You</td>
                  <td>
                    {e.type === 'folder'
                      ? `${e.items.length} items`
                      : formatSize(e.items[0].file.size)}
                  </td>
                  <td>Shared</td>
                  <td className={styles.fileActions}>
                    <i className="ri-eye-line" onClick={() => viewFile(e.items[0])} />
                    <i className="ri-download-line" onClick={() => downloadFile(e.items[0])} />
                    <i className="ri-delete-bin-line" onClick={() => removeFile(i)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Hidden pickers */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => handleFileInputChange(Array.from(e.target.files || []))}
      />
      {/* @ts-ignore */}
      <input
        ref={folderInputRef}
        type="file"
        multiple
        webkitdirectory="true"
        directory="true"
        style={{ display: 'none' }}
        onChange={(e) => handleFolderInputChange(Array.from(e.target.files || []))}
      />
    </div>
  );
}
