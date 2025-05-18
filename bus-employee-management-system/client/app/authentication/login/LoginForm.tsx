'use client';

import Link from "next/link";
import styles from "./login.module.css";

interface LoginFormProps {
  formData: {
    role: string;
    employeeID: string;
    password: string;
  };
  errors: {
    role: string;
    employeeID: string;
    password: string;
    general: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
}: LoginFormProps) {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div style={{ flex: 1 }}></div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <img
            src="/assets/images/agila logo.png"
            alt="Agila Bus Corporation Logo"
            width={150}
            height={150}
            className={styles.logo}
          />
          <h2 className={styles.title}>
            AGILA Bus Transportation
          </h2>
          <p className={styles.subtitle}>
            Login your credentials
          </p>
          {errors.general && (
            <div className={styles.errorMessage}>
              {errors.general}
            </div>
          )}
          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={`${styles.input} ${errors.role ? styles.inputError : ''}`}
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Admin">Admin</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Accountant">Accountant</option>
          </select>
          {errors.role && (
            <p className={styles.errorText}>
              {errors.role}
            </p>
          )}
          <label htmlFor="employeeID" className={styles.label}>
            Employee ID
          </label>
          <input
            type="text"
            id="employeeID"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            placeholder="Employee ID here..."
            required
            className={`${styles.input} ${errors.employeeID ? styles.inputError : ''}`}
          />
          {errors.employeeID && (
            <p className={styles.errorText}>
              {errors.employeeID}
            </p>
          )}
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password here..."
            required
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          />
          {errors.password && (
            <p className={styles.errorText}>
              {errors.password}
            </p>
          )}
          <Link href="/authentication/reset-password" passHref>
            <div className={styles.resetPassword}>
              Reset password?
            </div>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}