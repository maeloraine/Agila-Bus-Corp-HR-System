'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useNewPasswordLogic() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const employeeId = searchParams.get('employeeID');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');
    setShowError(false);

    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }

    if (!token && !employeeId) {
      setApiError('Reset token or employee ID not found. Please use the link from your email, or try again.');
      return;
    }

   // Validate scenario
    if (token) {
      // Forgot Password (reset using token)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/reset-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setSuccessMsg('Password reset successfully! Redirecting to login...');
          setTimeout(() => router.push('/authentication/login'), 2000);
        } else {
          setApiError(data.message || 'An error occurred while updating the password.');
        }
      } catch (error) {
        setApiError('An error occurred while updating the password. Please try again later.');
      }
    } else if (employeeId) {
      // First-Time Forced Reset
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/first-password-reset`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employeeId, newPassword }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setSuccessMsg('Password set successfully! Redirecting to login...');
          setTimeout(() => router.push('/authentication/login'), 2000);
        } else {
          setApiError(data.message || 'An error occurred while updating the password.');
        }
      } catch (error) {
        setApiError('An error occurred while updating the password. Please try again later.');
      }
    } else {
      setApiError('Invalid password reset link. Please use the link from your email or contact support.');
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

