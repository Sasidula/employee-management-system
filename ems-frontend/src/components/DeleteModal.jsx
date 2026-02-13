import { useState } from "react";
import { deleteEmployee } from "../api/employeeService";

export default function DeleteModal({ employee, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            setLoading(true);
            setError(null);

            await deleteEmployee(employee.id);

            onSuccess(); // refresh table
            onClose();   // close modal
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to delete employee"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-gradient-to-tr from-digital-blue-50 to-digital-blue-300 p-6 rounded-xl w-full max-w-md">
                <div className="content-center mb-2">
                    <h2 className="text-2xl font-bold">Confirm Delete</h2>
                    <h2 className="text-lg font-semibold mb-4">Permenetly delete a Employee.</h2>

                    {error && (
                        <div className="bg-white text-red-600 p-2 rounded mb-3 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                <div className="max-w-6xl mx-auto bg-digital-blue-50 shadow-xl rounded-2xl p-6 backdrop-blur-md">

                    <p>Are you sure you want to delete <strong>{employee.firstName} {employee.lastName}</strong>?</p>

                    <div className="flex justify-end gap-2 mt-4">

                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-xl
                                    font-semibold
                                    border border-white
                                    hover:border-digital-blue-800
                                "
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
