'use client';

import { useState } from 'react';

export function useNewPasswordLogic() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowError(true);
    } else {
      setShowError(false);
      alert('Password successfully updated!');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    showError,
    handleSubmit,
  };
}
