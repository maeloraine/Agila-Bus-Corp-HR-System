//ITO INITAL TEMPLATE

// 'use client';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {/* Layout UI */}
//         {/* Place children where you want to render a page or nested layout */}
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }

//SA LOOB NA TO NG SYSTEM
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import '@/styles/style.css';
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className={`app-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <div className="layout-right">
            <Topbar />
            <div className="layout-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}