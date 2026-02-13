import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../api/employeeService";

import EditEmployeeModal from "../components/EditEmployeeModal";
import DeleteModal from "../components/DeleteModal";

export default function EmployeeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const fetchEmployee = async () => {
        try {
            const data = await getEmployeeById(id);
            setEmployee(data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to fetch employee"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const handleEditSuccess = () => {
        fetchEmployee(); // refresh after edit
        setShowEdit(false);
    };

    const handleDeleteSuccess = () => {
        setShowDelete(false);
        navigate("/"); // go back to dashboard after deletion
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <div>
            <div className="min-h-screen p-6 bg-gradient-to-tr from-digital-blue-50 to-digital-blue-300/80">
                <div className="max-w-6xl mx-auto bg-white/70 shadow-2xl rounded-3xl p-8 backdrop-blur-lg relative">

                    {/* 🔙 Back Arrow */}
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            absolute top-6 left-6
                            text-digital-blue-700
                            hover:text-digital-blue-900
                            text-2xl
                            transition
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8 ml-12">

                        <div className="
                                w-40 h-40
                                rounded-full
                                bg-gradient-to-tr from-digital-blue-500 to-digital-blue-800
                                flex items-center justify-center
                                text-5xl font-bold text-white
                                shadow-xl
                                mr-6
                              ">
                            {employee.firstName.charAt(0)}
                            {employee.lastName.charAt(0)}
                        </div>

                        {/* 📄 Employee Details */}
                        <div className="flex-1 text-center md:text-left">

                            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                                {employee.firstName} {employee.lastName}
                            </h2>

                            <div className="space-y-3 text-lg text-gray-700">
                                <p>
                                    <span className="font-semibold text-digital-blue-700">Employee ID:</span>{" "}
                                    {employee.id}
                                </p>

                                <p>
                                    <span className="font-semibold text-digital-blue-700">Department:</span>{" "}
                                    {employee.department}
                                </p>

                                <p>
                                    <span className="font-semibold text-digital-blue-700">Email:</span>{" "}
                                    {employee.email}
                                </p>

                            </div>

                            <div className="flex justify-start gap-4 mt-10">

                                <button
                                    onClick={() => setShowEdit(true)}
                                    className="
                                        bg-digital-blue-500/80
                                        text-white
                                        font-semibold
                                        backdrop-blur-sm
                                        px-6 py-1 rounded-lg
                                        hover:bg-digital-blue-300/80
                                        transition
                                        shadow
                                    "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setShowDelete(true)}
                                    className="
                                        bg-digital-blue-800
                                        font-semibold
                                        text-white
                                        px-6 py-1 rounded-lg
                                        hover:bg-red-600
                                        transition
                                        shadow
                                    "
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {showEdit && (
                <EditEmployeeModal
                    employee={employee}
                    onClose={() => setShowEdit(false)}
                    onSuccess={handleEditSuccess}
                />
            )}

            {showDelete && (
                <DeleteModal
                    employee={employee}
                    onClose={() => setShowDelete(false)}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </div>
    );
}
