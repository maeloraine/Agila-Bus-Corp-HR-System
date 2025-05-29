'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './NewPassword.module.css';
import { useNewPasswordLogic } from './NewPasswordLogic';

export default function NewPasswordPage() {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    showError,
    handleSubmit,
    apiError,
  } = useNewPasswordLogic();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get('first') === 'true';

 return (
    <div className={styles.base}>
      <div className={styles.resetContainer}>
        <h1>
          {isFirstTime ? 'Set Your Password' : 'Reset Your Password'}
        </h1>
        <h5>
          {isFirstTime
            ? 'Welcome! Please set your password for your first login.'
            : 'Please enter and confirm your new password.'}
        </h5>
        <br /><br />

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New Password"
            className={styles.input}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          {showError && (
            <p className={styles.errorText}>Passwords do not match.</p>
          )}
          {apiError && (
            <p className={styles.errorText}>{apiError}</p>
          )}

          <div className={styles.cancelButton}>
            <button
              type="button"
              onClick={() => router.push('/authentication/login')}
            >
              Cancel
            </button>
          </div>

          <div className={styles.submitButton}>
            <button type="submit">Submit</button>
          </div>
        </form>

        <a
          onClick={() => router.push('/authentication/login')}
          className={styles.backLink}
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
