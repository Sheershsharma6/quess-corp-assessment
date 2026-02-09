"use client";
import { useState, useEffect } from "react";

export default function MarkAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch employees to populate the dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees`);
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };
    fetchEmployees();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmp) return alert("Please select an employee");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: selectedEmp,
          date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
          status: status,
        }),
      });

      if (res.ok) {
        alert("Attendance recorded successfully!");
        setSelectedEmp("");
      } else {
        alert("Error marking attendance");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100/50 border border-slate-100">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Daily Attendance
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Log daily presence for your team members.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Employee Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-indigo-500 ml-1">
              Select Employee
            </label>
            <select
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all text-slate-700 font-bold appearance-none cursor-pointer"
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
              required
            >
              <option value="">Choose from directory...</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {emp.fullName} — {emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-indigo-500 ml-1">
              Status
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus("Present")}
                className={`py-5 rounded-2xl font-black transition-all border-b-4 ${
                  status === "Present"
                    ? "bg-emerald-500 border-emerald-700 text-white shadow-lg shadow-emerald-200 translate-y-[-2px]"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                }`}
              >
                PRESENT
              </button>
              <button
                type="button"
                onClick={() => setStatus("Absent")}
                className={`py-5 rounded-2xl font-black transition-all border-b-4 ${
                  status === "Absent"
                    ? "bg-rose-500 border-rose-700 text-white shadow-lg shadow-rose-200 translate-y-[-2px]"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                }`}
              >
                ABSENT
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-slate-200"
          >
            {loading ? "Processing..." : "Submit Records"}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
          <p className="text-xs font-bold text-emerald-600 uppercase">
            Pro Tip
          </p>
          <p className="text-sm text-emerald-800 mt-1">
            Attendance records are final once submitted.
          </p>
        </div>
        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
          <p className="text-xs font-bold text-indigo-600 uppercase">
            System Date
          </p>
          <p className="text-sm text-indigo-800 mt-1">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
