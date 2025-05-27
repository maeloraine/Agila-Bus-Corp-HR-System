'use client';

import { useRouter } from 'next/navigation';
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
  } = useNewPasswordLogic();

  const router = useRouter();

  return (
    <div className={styles.base}>
      <div className={styles.resetContainer}>
        <h1>Set New Password</h1>
        <h5>Enter and confirm your new password.</h5><br/><br/>

                 <form onSubmit={handleSubmit} noValidate>
   <label htmlFor="newPassword" className={styles.label}>
     New Password
       </label>
           <input
             id="newPassword"
             type="password"
             placeholder="New Password"
             className={styles.input}
           />
  <label htmlFor="confirmPassword" className={styles.label}>
        Confirm Password
       </label>
           <input
             id="confirmPassword"
             type="password"
             placeholder="Confirm Password"
             className={styles.input}
           />

           {showError && (
             <p className={styles.errorText}>Passwords do not match.</p>
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
