'use client';

import React, { useState } from 'react';
import styles from './resetpassword.module.css';
import Button from '@/components/ui/button';
import Link from 'next/link';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Simulate checking if email exists (for demo lang, ito sample valid emails)
  const existingEmails = ['test@example.com', 'user@gmail.com'];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required.');
    } else if (!validateEmail(email)) {
      setError('Invalid email format.');
    } else if (!existingEmails.includes(email)) {
      setError('Email does not exist.');
    } else {
      setError('');
      // Handle actual submission logic here
      alert('Password reset link sent!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className={styles.base}>
      <div className={styles.resetContainer}>
        <div>
          <h1>Reset Password</h1>
        </div>
        <div>
          <h5>Provide the registered email address.</h5>
        </div>
        <div>
          <label htmlFor="EmailForResetPass">Email: </label>
          <input
            type="text"
            name="EmailForResetPass"
            id="EmailForResetPass"
            placeholder="juandelacruz@gmail.com"
            value={email}
            onChange={handleChange}
          />
          <div>
            {error ? <p className={styles.errorText}>{error}</p> : <div style={{ height: '0.5rem' }} />}
          </div>
        </div>
        <div>
          <Link href="/" className={styles.cancelButton}>
            <Button text="Cancel" />
          </Link>
        </div>
        <div className={styles.submitButton}>
          <Button text="Submit" onClick={handleSubmit} />
        </div>
        <div>
          <Link href="/" className={styles.backLink}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
