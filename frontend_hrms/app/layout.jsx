import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "HRMS Lite",
  description: "Modern Employee Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              HRMS Lite
            </span>
            <div className="flex gap-8 font-semibold text-slate-600">
              <div className="flex gap-8 font-semibold text-slate-600">
                <Link href="/" className="...">
                  Employees
                </Link>
                <Link href="/attendance" className="...">
                  Mark Attendance
                </Link>
                <Link href="/attendance/history" className="...">
                  View Records
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
