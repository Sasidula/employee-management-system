import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import DeleteModal from "../components/DeleteModal";
import { getEmployees } from "../api/employeeService";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees({
                page,
                size,
                search: search || undefined,
                department: department || undefined,
            });

            setEmployees(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, [page, search, department]);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-tr from-digital-blue-50 to-digital-blue-300/80">

        {/* Header */}
            <div className="w-full flex flex-col items-center p-6 mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
                    Employee Management
                </h1>
                <p className="text-gray-600 text-center text-lg font-semibold md:text-xl max-w-2xl mt-1 drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]">
                    Manage all employees in one place. Add, edit, delete, and view them across your platform effortlessly.
                </p>
            </div>

            <div className="max-w-6xl mx-auto bg-white/80 shadow-xl rounded-2xl p-6 backdrop-blur-md">

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-6 mb-4 items-start md:items-center">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => {
                            setPage(0);
                            setSearch(e.target.value);
                        }}
                        className="border border-digital-blue-200 rounded-xl mt-1 mb-1 px-4 py-2 w-full md:w-1/3
                            bg-digital-blue-50
                            font-semibold
                            hover:border-digital-blue-800
                            hover:bg-digital-blue-50 hover:text-digital-blue-800
                            transition
                        "
                    />

                    <select
                        value={department}
                        onChange={(e) => {
                            setPage(0);
                            setDepartment(e.target.value);
                        }}
                        className="border border-digital-blue-200 rounded-xl px-4 py-2 w-full md:w-1/4
                            bg-digital-blue-50
                            font-semibold
                            hover:border-digital-blue-800
                            hover:bg-digital-blue-100 hover:text-digital-blue-800
                            transition
                        "
                    >
                        <option value="">All Departments</option>
                        <option>IT</option>
                        <option>HR</option>
                        <option>Finance</option>
                    </select>

                    <button
                        onClick={() => setShowAdd(true)}
                        className="
                            font-semibold
                            bg-gradient-to-tr from-digital-blue-500 to-digital-blue-800
                            text-white
                            border border-white
                            px-4 py-2
                            rounded-xl
                            hover:border-digital-blue-800
                            hover:from-digital-blue-50 hover:to-digital-blue-100
                            hover:text-digital-blue-800
                            transition
                            md:ml-auto
                        "
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="text-sm">Add Employee</span>
                        </div>
                    </button>
                </div>

                {/* Table */}
                <EmployeeTable
                    employees={employees}
                    onEdit={(employee) => {
                        setSelectedEmployee(employee);
                        setShowEdit(true);
                    }}
                    onDelete={(employee) => {
                        setSelectedEmployee(employee);
                        setShowDelete(true);
                    }}
                />

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-6">

                    {/* Page Buttons */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md">

                        {/* Prev */}
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                            className="
                                px-3 py-1 rounded-lg
                                bg-digital-blue-600 text-white
                                disabled:opacity-40
                                hover:bg-digital-blue-700
                                transition
                              "
                        >
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Prev
                            </div>
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i)
                            .filter((p) =>
                                p >= Math.max(0, page - 1) &&
                                p <= Math.min(totalPages - 1, page + 1)
                            )
                            .map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`
                                    px-3 py-1 rounded-lg transition
                                    ${
                                        p === page
                                            ? "bg-digital-blue-800 text-white shadow-md"
                                            : "bg-white/40 hover:bg-white/70 text-gray-800"
                                    }
                                `}
                                >
                                    {p + 1}
                                </button>
                            ))}

                        {/* Next */}
                        <button
                            disabled={page + 1 === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="
                                px-3 py-1 rounded-lg
                                bg-digital-blue-600 text-white
                                disabled:opacity-40
                                hover:bg-digital-blue-700
                                transition
                              "
                        >
                            <div className="flex items-center gap-1">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    {/* Jump to Page */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-700">Go to page:</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const value = Number(e.target.value);
                                    if (value >= 1 && value <= totalPages) {
                                        setPage(value - 1);
                                    }
                                }
                            }}
                            className="
                                w-20 px-2 py-1
                                rounded-lg
                                bg-white/40
                                backdrop-blur-md
                                border border-digital-blue-300
                                focus:outline-none
                                focus:ring-2 focus:ring-digital-blue-500
                            "
                        />
                    </div>

                </div>

            </div>

            {showAdd && (
                <AddEmployeeModal
                    onClose={() => setShowAdd(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}

            {showEdit && (
                <EditEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setShowEdit(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}

            {showDelete && (
                <DeleteModal
                    employee={selectedEmployee}
                    onClose={() => setShowDelete(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}

        </div>
    );
}
