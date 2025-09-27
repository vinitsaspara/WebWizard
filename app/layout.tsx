// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Student Portal',
  description: 'University Student Portal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Toast notifications */}
        <Toaster position="top-right" />

        {/* Main wrapper */}
        <div className="min-h-screen flex flex-col">
          {/* You can add a global header here */}
          <header className="bg-white shadow p-4">
            <h1 className="text-2xl font-bold">Student Portal</h1>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>

          {/* Optional footer */}
          <footer className="bg-white shadow p-4 text-center">
            © {new Date().getFullYear()} University
          </footer>
        </div>
      </body>
    </html>
  );
}
