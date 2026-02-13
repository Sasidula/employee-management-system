import { useState } from "react";
import { createEmployee } from "../api/employeeService";

export default function AddEmployeeModal({ onClose, onSuccess }) {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: ""
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {

        // Client validation
        if (!form.email) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(form.email)) {
            setError("Invalid email format");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await createEmployee(form);

            onSuccess();   // refresh table
            onClose();     // close modal

        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-gradient-to-tr from-digital-blue-50 to-digital-blue-300 p-6 rounded-xl w-full max-w-md">
                <div className="content-center mb-2">
                    <h2 className="text-2xl font-bold">Add Employee</h2>
                    <h2 className="text-lg font-semibold mb-4">Create a New Employee.</h2>

                    {error && (
                        <div className="bg-white text-red-600 p-2 rounded mb-3 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                <div className="max-w-6xl mx-auto bg-digital-blue-50 shadow-xl rounded-2xl p-6 backdrop-blur-md">
                    <div className="space-y-2">
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="w-full border border-digital-blue-800 p-2 rounded-xl
                                hover:border-digital-blue-600 focus:outline-none focus:ring-2 focus:ring-digital-blue-400 transition
                                hover:bg-blue-50
                            "
                            placeholder="First Name"

                        />

                        <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full border border-digital-blue-800 p-2 rounded-xl
                                hover:border-digital-blue-600 focus:outline-none focus:ring-2 focus:ring-digital-blue-400 transition
                                hover:bg-blue-50
                            "
                            placeholder="Last Name"
                        />

                        <div className="relative w-full">
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-digital-blue-800 p-2 rounded-xl
                                hover:border-digital-blue-600 focus:outline-none focus:ring-2 focus:ring-digital-blue-400 transition
                                hover:bg-blue-50
                                px-10 py-2.5
                            "
                            placeholder="Email"
                        />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                 className="
                                      absolute left-3 top-1/2
                                      -translate-y-1/2
                                      size-5               /* slightly smaller than 6 to fit nicely */
                                      text-digital-blue-600
                                      pointer-events-none  /* so it doesn't block clicks */
                                    "
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>

                        </div>

                        <div className="relative w-full">
                        <input
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full border border-digital-blue-800 p-2 rounded-xl
                                hover:border-digital-blue-600 focus:outline-none focus:ring-2 focus:ring-digital-blue-400 transition
                                hover:bg-blue-50
                                px-10 py-2.5
                            "
                            placeholder="Department"
                        />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                 className="
                                  absolute left-3 top-1/2
                                  -translate-y-1/2
                                  size-5
                                  text-digital-blue-600
                                  pointer-events-none
                                "
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                            </svg>

                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
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
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-xl
                                font-semibold
                                border border-white
                                hover:border-digital-blue-800
                            "
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
