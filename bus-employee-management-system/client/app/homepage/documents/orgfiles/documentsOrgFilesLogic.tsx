import { useState } from 'react';

export const useDocumentsOrgFilesLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [folders, setFolders] = useState<string[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setShowConfirm(true);
    }
  };

  const confirmAddFolder = () => {
    setFolders([...folders, newFolderName.trim()]);
    setNewFolderName('');
    setShowConfirm(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return {
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
  };
};
