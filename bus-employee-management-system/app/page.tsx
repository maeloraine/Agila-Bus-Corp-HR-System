'use client';

import Link from "next/link";

// app/page.tsx -> landing page which is yung login
export default function LoginPage() {
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
            required
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              fontFamily: 'Arial, sans-serif',
              outline: 'none',
              transition: 'box-shadow 0.2s ease',
              marginBottom: '0.60rem',

            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px #8b1c1c';
              e.currentTarget.style.borderColor = '#8b1c1c';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <option disabled selected>
              Select your role
            </option>
            <option>Admin</option>
            <option>HR Manager</option>
            <option>Accountant</option>
          </select>

          <label
            htmlFor="username"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4b5563',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username here..."
            required
            style={{
              border: '1px solid #d1d5db',
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
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          />

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
            placeholder="Password here..."
            required
            style={{
              border: '1px solid #d1d5db',
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
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          />

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

          <button
            type="submit"
            style={{
              backgroundColor: '#8b1c1c',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 300,
              borderRadius: '0.375rem',
              padding: '0.5rem 0',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              fontFamily: 'Arial, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#6b1212';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#8b1c1c';
            }}
            // onClick={() => {
            //   console.log('Login button clicked');
            // }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
