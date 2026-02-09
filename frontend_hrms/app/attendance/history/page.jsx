"use client";
import { useState, useEffect } from "react";

export default function AttendanceHistory() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Load employee list for the dropdown
  useEffect(() => {
    fetch(`${API_URL}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error:", err));
  }, [API_URL]);

  // Fetch history when an employee is selected
  const handleFetchHistory = async (empId) => {
    if (!empId) {
      setHistory([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/attendance/${empId}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            Attendance Logs
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Review and track employee consistency.
          </p>
        </div>

        <div className="w-full md:w-72">
          <select
            className="w-full p-4 bg-slate-50 border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none transition-all text-slate-700 font-bold"
            value={selectedEmp}
            onChange={(e) => {
              setSelectedEmp(e.target.value);
              handleFetchHistory(e.target.value);
            }}
          >
            <option value="">Select Employee...</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.employeeId}>
                {emp.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* History Table Section */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              Retrieving Data...
            </p>
          </div>
        ) : selectedEmp === "" ? (
          <div className="p-20 text-center text-slate-400 italic">
            Please select an employee from the dropdown above to view records.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-10 py-5">Date of Record</th>
                  <th className="px-10 py-5">Status</th>
                  <th className="px-10 py-5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-indigo-50/30 transition-colors"
                  >
                    <td className="px-10 py-6 font-bold text-slate-700 text-sm">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-10 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          item.status === "Present"
                            ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                            : "bg-rose-100 text-rose-600 border border-rose-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span className="text-[10px] text-slate-300 font-mono">
                        {item._id.substring(0, 8)}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {history.length === 0 && (
              <div className="p-20 text-center text-slate-400">
                No attendance found for this user in our records.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
