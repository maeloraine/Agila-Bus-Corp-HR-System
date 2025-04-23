'use client';

import Link from "next/link";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        marginTop: '100px',
        color: '#000'
      }}
      >
      <h1>This is the Home Page</h1>
      <Link href="/authentication/login">Login</Link>
      {/* Just your page content */}
    </div>
  );
}