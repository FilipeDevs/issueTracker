import API from "../../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTeamMember({
    onClose,
    availableUsers,
    usersDataChanged,
    projectId,
}) {
    const handleAddTeamMember = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newContributors = Array.from(
            form.contributors.selectedOptions,
            (option) => option.value
        );

        try {
            await API.addTeamMember(newContributors, projectId);
            usersDataChanged();
            onClose();
            toast.success("Member(s) added to the project !");
        } catch (error) {
            console.error(
                "Error adding new member to project:",
                error.response.data.message
            );
            toast.error("Error adding new member to project");
        }
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
                            Add member
                        </h3>
                        {availableUsers.length == 0 ? (
                            <span>No available members found...</span>
                        ) : (
                            <form
                                className="space-y-6"
                                onSubmit={handleAddTeamMember}
                            >
                                <div>
                                    <label
                                        htmlFor="contributors"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Available Members
                                    </label>
                                    <select
                                        multiple
                                        name="contributors"
                                        id="contributors"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    >
                                        {availableUsers.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Add Selected Members to Team
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeamMember;
