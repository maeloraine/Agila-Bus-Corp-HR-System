'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      newErrors.employeeID = 'Employee ID must be 4-20 characters and can contain letters, numbers, @, ., _, or -'; //pakichange ng error prompt for Employee ID
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
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        marginTop: '50px',
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '64rem',
        }}
      >
        <div style={{ flex: 1 }}></div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '25rem',
            gap: '0.75rem',
            textAlign: 'left',
            color: '#000',
            marginTop: 0,
          }}
        >
          <img
            src="/assets/images/agila logo.png"
            alt="Agila Bus Corporation Logo"
            width={150}
            height={150}
            style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '0rem' }}
          />

          <h2
            style={{
              color: '#8b1c1c',
              fontWeight: 670,
              fontSize: '1.75rem',
              textAlign: 'center',
              marginBottom: '0.25rem',
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            AGILA Bus Transportation
          </h2>
          <p
            style={{
              fontSize: '0.75rem',
              textAlign: 'center',
              marginBottom: '1rem',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            Login your credentials
          </p>

          {errors.general && (
            <div
              style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                padding: '0.5rem',
                backgroundColor: '#fee2e2',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}
            >
              {errors.general}
            </div>
          )}

          <label
            htmlFor="role"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4b5563',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{
              border: errors.role ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              fontFamily: 'Arial, sans-serif',
              outline: 'none',
              transition: 'box-shadow 0.2s ease',
              marginBottom: errors.role ? '0.25rem' : '0.60rem',
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px #8b1c1c';
              e.currentTarget.style.borderColor = '#8b1c1c';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = errors.role ? '#ef4444' : '#d1d5db';
            }}
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Admin">Admin</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Accountant">Accountant</option>
          </select>
          {errors.role && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              {errors.role}
            </p>
          )}

          <label
            htmlFor="employeeID"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4b5563',
              fontFamily: 'Arial, sans-serif',
            }}
          >
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
            style={{
              border: errors.employeeID ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              fontFamily: 'Arial, sans-serif',
              outline: 'none',
              transition: 'box-shadow 0.2s ease',
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px #8b1c1c';
              e.currentTarget.style.borderColor = '#8b1c1c';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = errors.employeeID ? '#ef4444' : '#d1d5db';
            }}
          />
          {errors.employeeID && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              {errors.employeeID}
            </p>
          )}

          <label
            htmlFor="password"
            style={{
              marginTop: '0.60rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4b5563',
              fontFamily: 'Arial, sans-serif',
            }}
          >
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
            style={{
              border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              fontFamily: 'Arial, sans-serif',
              outline: 'none',
              transition: 'box-shadow 0.2s ease',
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px #8b1c1c';
              e.currentTarget.style.borderColor = '#8b1c1c';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = errors.password ? '#ef4444' : '#d1d5db';
            }}
          />
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              {errors.password}
            </p>
          )}

          <Link href="/authentication/reset-password" passHref>
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280',
                textAlign: 'right',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                userSelect: 'none',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Reset password?
            </div>
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#cbd5e1' : '#8b1c1c',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 300,
              borderRadius: '0.375rem',
              padding: '0.5rem 0',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              fontFamily: 'Arial, sans-serif',
            }}
            onMouseEnter={e => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#6b1212';
              }
            }}
            onMouseLeave={e => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#8b1c1c';
              }
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}