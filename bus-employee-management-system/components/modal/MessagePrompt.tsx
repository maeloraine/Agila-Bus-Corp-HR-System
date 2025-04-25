'use client';

import React from 'react';
import styles from './MessagePrompt.module.css';

interface MessagePromptProps {
  message: string;
  onClose: () => void;
}

const MessagePrompt: React.FC<MessagePromptProps> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>
          &times;
        </button>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default MessagePrompt;