import { useEffect, useState } from "react";
import API from "../../utils/API";
import Loading from "../Loading";

function Comments({ ticket_id, formatTimestamp }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Pagination Logic
    const indexOfLastComment = currentPage * itemsPerPage;
    const indexOfFirstComment = indexOfLastComment - itemsPerPage;
    const currentComments = comments.slice(
        indexOfFirstComment,
        indexOfLastComment
    );

    const handleOnSubmit = async (e) => {
        e.preventDefault();
    };

    const handleNextPage = () => {
        if (indexOfLastComment < comments.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstComment > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const commentsData = await API.getTicketComments(ticket_id);
                setComments(commentsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [ticket_id]);

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    return (
        <div className="">
            {currentComments.map((comment) => (
                <div key={comment.id} className="border p-2 my-2">
                    <p className="font-bold">
                        {comment.author_name} -{" "}
                        {formatTimestamp(comment.created_at)}
                    </p>
                    <p>{comment.comment}</p>
                </div>
            ))}
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={indexOfFirstComment === 0}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfFirstComment === 0 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={indexOfLastComment >= comments.length}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastComment >= comments.length
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                >
                    Next
                </button>
            </div>
            <form onSubmit={handleOnSubmit} className="p-10">
                <div>
                    <label htmlFor="chat" className="ml-4 font-medium">
                        Add a comment
                    </label>
                    <div className="flex items-center rounded-lg bg-gray-50 dark:bg-gray-700">
                        <textarea
                            id="chat"
                            rows="1"
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your comment..."
                        ></textarea>
                        <button
                            type="submit"
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                            >
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Comments;
