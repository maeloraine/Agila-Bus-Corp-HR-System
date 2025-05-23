'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

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

    if (!formData.role) {
      newErrors.role = 'Please select your role';
      valid = false;
    }

    if (!formData.employeeID) {
      newErrors.employeeID = 'Employee ID is required';
      valid = false;
    } else if (!/^[a-zA-Z0-9@._-]{4,20}$/.test(formData.employeeID)) {
      newErrors.employeeID = 'Employee ID must be 4-20 characters and can contain letters, numbers, @, ., _, or -';
      valid = false;
    }

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
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log('Using API base:', API_BASE_URL);
    try {
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/homepage');
      } else {
        const errorData = await response.json();
        setErrors(prev => ({
          ...prev,
          general: errorData.message || 'Invalid credentials. Please try again.'
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again later.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginForm
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}