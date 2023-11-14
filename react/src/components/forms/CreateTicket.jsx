import API from "../../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTicket({ onClose, ticketsDataChanged, users, project_id }) {
    const handleCreateTicket = async (e) => {
        e.preventDefault();
        const form = e.target;
        const ticket = {
            name: form.name.value,
            description: form.description.value,
            assignee: form.contributors.value,
            time_estimate: form.timeEstimate.value,
            type: form.type.value,
            priority: form.priority.value,
            status: form.status.value,
            project_id,
        };

        try {
            await API.createTicket(ticket);
            ticketsDataChanged();
            onClose();
            toast.success("New ticket created!");
        } catch (error) {
            console.error(
                "Error creating new ticket!",
                error.response.data.message
            );
            toast.error(error.response.data.message);
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
                            Create a new ticket
                        </h3>
                        <form
                            className="space-y-6"
                            onSubmit={handleCreateTicket}
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ticket Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                ></input>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Descritpion
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    htmlFor="contributors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Assignee
                                </label>
                                <select
                                    name="contributors"
                                    id="contributors"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    required
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label
                                        htmlFor="timeEstimate"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time Estimate (in hours)
                                    </label>
                                    <input
                                        type="number"
                                        name="timeEstimate"
                                        id="timeEstimate"
                                        min="1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="type"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        id="type"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    >
                                        <option value="bug">Bug</option>
                                        <option value="feature">Feature</option>
                                        <option value="issue">Issue</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        id="priority"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    >
                                        <option value="immediate">
                                            Immediate
                                        </option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    >
                                        <option value="new">New</option>
                                        <option value="in progress">
                                            In Progress
                                        </option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
