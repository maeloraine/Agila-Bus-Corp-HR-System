'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: '',
    employeeID: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    role: '',
    employeeID: '',
    password: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      role: '',
      employeeID: '',
      password: '',
      general: ''
    };

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select your role';
      valid = false;
    }

    // Employee ID validation (4-20 chars, alphanumeric + some symbols)
    if (!formData.employeeID) {
      newErrors.employeeID = 'Employee ID is required';
      valid = false;
    } else if (!/^[a-zA-Z0-9@._-]{4,20}$/.test(formData.employeeID)) {
      newErrors.employeeID = 'Employee ID must be 4-20 characters and can contain letters, numbers, @, ., _, or -';
      valid = false;
    }

    // Password validation (8-20 chars, at least one uppercase, one lowercase, one number, one symbol)
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(formData.password)) {
      newErrors.password = 'Password must be 8-20 characters with at least one uppercase, one lowercase, one number, and one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, this would be an API call
      const mockUsers = [
        { role: 'Admin', employeeID: 'admin123', password: 'Password@123' },
        { role: 'HR Manager', employeeID: 'hr123', password: 'Hr@12345' },
        { role: 'Accountant', employeeID: 'accountant123', password: 'Account@123' }
      ];

      const user = mockUsers.find(
        u => u.role === formData.role && 
             u.employeeID === formData.employeeID && 
             u.password === formData.password
      );

      if (user) {
        // Successful login - redirect to homepage (dashboard)
        router.push('/homepage');
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid credentials. Please try again.'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again later.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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