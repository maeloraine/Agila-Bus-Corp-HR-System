'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useNewPasswordLogic() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError('');
    setShowError(false);

    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }

    const token = searchParams.get('token');
    const employeeId = searchParams.get('employeeID');

    if (!token && !employeeId) {
      setApiError('Reset token or employee ID not found. Please use the link from your email, or try again.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            token
              ? { token, newPassword }
              : { employeeId, newPassword }
          ),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert('Password successfully updated!');
        setNewPassword('');
        setConfirmPassword('');
        router.push('/authentication/login');
      } else {
        setApiError(data.message || 'An error occurred while updating the password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setApiError('An error occurred while updating the password. Please try again later.');
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    showError,
    handleSubmit,
    apiError,
  };
}
// This code is a custom hook for managing the logic of a "New Password" page in a React application.

