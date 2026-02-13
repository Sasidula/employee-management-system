import { useNavigate } from "react-router-dom";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto">
            <div className="space-y-4">

                {/* ===== TABLE HEADER BOX ===== */}
                <div className=" backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                        <tr className="text-left text-digital-blue-800 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 pr-8 font-semibold">Name</th>
                            <th className="p-4 pr-10 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Department</th>
                            <th className="p-4 pr-8 text-left font-semibold">Actions</th>
                        </tr>
                        </thead>
                    </table>
                </div>

                {/* ===== TABLE BODY BOX ===== */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden mb-2">
                    <table className="w-full">
                        <tbody>
                        {employees.map((emp) => (
                            <tr
                                key={emp.id}
                                onClick={() => navigate(`/employee/${emp.id}`)}
                                className="
                                  border-b border-white/20
                                  hover:bg-digital-blue-50
                                  transition
                                  cursor-pointer
                                "
                            >
                                <td className="p-4 text-gray-800 font-medium">{emp.id}</td>
                                <td className="p-4 text-gray-900 font-semibold">
                                    {emp.firstName} {emp.lastName}
                                </td>
                                <td className="p-4 ml-16 text-gray-700">{emp.email}</td>
                                <td className="p-4 text-digital-blue-700 font-medium">
                                    {emp.department}
                                </td>
                                <td className="p-4 ml-8  text-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(emp);
                                        }}
                                        className="
                                          bg-digital-blue-500/80
                                          text-white
                                          font-semibold
                                          backdrop-blur-sm
                                          px-4 py-1 rounded-lg
                                          hover:bg-digital-blue-300/80
                                          transition
                                          shadow
                                          mr-4
                                        "
                                    >
                                        <div className="flex items-center gap-2 p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            Edit
                                        </div>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(emp);
                                        }}
                                        className="
                                          bg-digital-blue-800
                                          font-semibold
                                          text-white
                                          px-3 py-1 rounded-lg
                                          hover:bg-red-600
                                          transition
                                          shadow
                                          ml-8
                                        "
                                    >
                                        <div className="flex items-center gap-2 p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Delete
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-6 text-gray-600">
                                    No employees found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}
