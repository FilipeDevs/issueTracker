import { toast } from "react-toastify";
import API from "../../utils/API";
import { useState } from "react";

function UpdateProject({ onClose, projectData, projectDataChanged }) {
    const [formData, setFormData] = useState({
        name: projectData.name,
        description: projectData.description,
    });

    const handleUpdateProject = async (e) => {
        e.preventDefault();

        try {
            const updatedProject = {
                ...projectData,
                ...formData,
            };
            await API.updateProject(updatedProject);
            projectDataChanged();
            onClose();
            toast.success("Project was updated!");
        } catch (error) {
            console.error(
                "Error updating project:",
                error.response.data.message
            );
            toast.error(error.response.data.message);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-h-full">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Update project
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Project name
                                </label>
                                <input
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleUpdateProject}
                                    className="my-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Update
                                </button>
                                <button className="w-full text-white bg-red-700 hover:bg-red-800 focus-ring-4 focus-outline-none focus-ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-red-600 dark-hover-bg-red-700 dark-focus-ring-red-800">
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProject;
