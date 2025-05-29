import { useState, useMemo } from 'react';
import JSZip from 'jszip';

export interface UploadedItem {
  file: File;
  path: string;
}

export interface Entry {
  name: string;
  type: 'folder' | 'file';
  items: UploadedItem[];
}

export const useDocumentsOrgFilesLogic = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Organization Files');
  const [dragging, setDragging] = useState(false);
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // Actions
  const handleSearch = () => console.log('Searching for:', searchTerm);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).map(f => ({
      file: f,
      path: (f as any).webkitRelativePath || f.name,
    }));
    setUploadedItems(prev => [...prev, ...dropped]);
  };

  // ← new: accept File[] instead of ChangeEvent
  const handleFileInputChange = (files: File[]) => {
    const items = files.map(f => ({ file: f, path: f.name }));
    setUploadedItems(prev => [...prev, ...items]);
  };

  const handleFolderInputChange = (files: File[]) => {
    const items = files.map(f => ({
      file: f,
      path: (f as any).webkitRelativePath || f.name,
    }));
    setUploadedItems(prev => [...prev, ...items]);
  };

  const removeFile = (idx: number) =>
    setUploadedItems(prev => prev.filter((_, i) => i !== idx));

  const viewFile = (item: UploadedItem) => {
    const url = URL.createObjectURL(item.file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  const downloadFile = (item: UploadedItem) => {
    const url = URL.createObjectURL(item.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Build current-folder entries
  const entries: Entry[] = useMemo(() => {
    const map = new Map<string, UploadedItem[]>();
    uploadedItems.forEach(item => {
      const parts = item.path.split('/');
      if (!currentPath.every((p, i) => p === parts[i])) return;
      const next = parts[currentPath.length];
      if (!map.has(next)) map.set(next, []);
      map.get(next)!.push(item);
    });
    const arr: Entry[] = [];
    map.forEach((items, name) => {
      const isFolder =
        items.some(i => i.path.split('/').length > currentPath.length + 1);
      arr.push({ name, type: isFolder ? 'folder' : 'file', items });
    });
    arr.sort((a, b) =>
      a.type !== b.type
        ? a.type === 'folder'
          ? -1
          : 1
        : a.name.localeCompare(b.name)
    );
    return arr;
  }, [uploadedItems, currentPath]);

  const downloadAll = async () => {
    if (!entries.length) return;
    const zip = new JSZip();
    entries.forEach(e => {
      if (e.type === 'file') {
        zip.file(e.items[0].path, e.items[0].file);
      } else {
        e.items.forEach(i => zip.file(i.path, i.file));
      }
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    // you can uncomment and use file-saver:
    // saveAs(blob, 'download.zip');
  };

  const navigateToFolder = (name: string) =>
    setCurrentPath(prev => [...prev, name]);
  const goToBreadcrumb = (idx: number) =>
    setCurrentPath(prev => prev.slice(0, idx));

  return {
    // state
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    dragging,
    setDragging,
    uploadedItems,
    currentPath,
    entries,
    // actions
    handleSearch,
    handleDrop,
    handleFileInputChange,
    handleFolderInputChange,
    removeFile,
    viewFile,
    downloadFile,
    downloadAll,
    navigateToFolder,
    goToBreadcrumb,
  };
};
