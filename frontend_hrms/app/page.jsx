"use client";
import { useState, useEffect } from "react";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchEmployees = async () => {
    if (!API_URL) {
      console.error("API_URL is not defined. Check your .env.local file.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/employees`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ employeeId: "", fullName: "", email: "", department: "" });
      fetchEmployees();
    } else {
      const errData = await res.json();
      alert(errData.message || "Something went wrong");
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      await fetch(`${API_URL}/employees/${id}`, { method: "DELETE" });
      fetchEmployees();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Registration Card */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">New Entry</h2>
          <p className="text-slate-500 text-sm mb-8">
            Add a new member to the organization.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Employee ID
              </label>
              <input
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800"
                placeholder="e.g. EMP-001"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Full Name
              </label>
              <input
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Department
              </label>
              <select
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
              >
                <option value="">Choose Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform active:scale-95">
              Confirm Registration
            </button>
          </form>
        </div>
      </div>

      {/* Directory Table */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">
              Employee Directory
            </h3>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-4 font-black">Member</th>
                  <th className="px-8 py-4 font-black">Dept</th>
                  <th className="px-8 py-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="group hover:bg-slate-50/80 transition-all"
                  >
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-700">
                        {emp.fullName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {emp.email} • {emp.employeeId}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => deleteEmployee(emp._id)}
                        className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 font-bold text-xs transition-all uppercase tracking-tighter"
                      >
                        Terminate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {employees.length === 0 && (
              <div className="p-20 text-center text-slate-400 italic">
                No records found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
