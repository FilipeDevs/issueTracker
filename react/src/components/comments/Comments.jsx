import { useEffect, useState } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../../contexts/ContextProvider";

function Comments({ ticket_id, formatTimestamp }) {
    const [comments, setComments] = useState([]);
    const { user } = useStateContext();
    const [commentsDataChanaged, setCommentsDataChanaged] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [commentText, setCommentText] = useState("");

    const handleEditComment = (commentId) => {
        const commentToEdit = comments.find(
            (comment) => comment.id === commentId
        );
        setEditingCommentId(commentId);
        setCommentText(commentToEdit.comment);
    };

    const handleSaveComment = async (commentId, updatedComment) => {
        try {
            const payload = {
                id: commentId,
                comment: updatedComment,
            };
            await API.updateCommentOnTicket(payload);
            setCommentsDataChanaged(!commentsDataChanaged);
            // Reset editing state
            setEditingCommentId(null);
            toast.success("Comment updated successfully!");
        } catch (error) {
            console.error("Error updating comment:", error);
            toast.error("Error updating comment!");
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null); // Reset editing state
    };

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                setEditingCommentId(null); // Reset editing state
            }
        };

        window.addEventListener("keydown", handleEscKey);

        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, []);

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

    const handlePostComment = async (e) => {
        e.preventDefault();
        const commentText = e.target.elements.body.value;

        const comment = {
            comment: commentText,
            ticket_id: ticket_id,
        };

        try {
            await API.postCommentOnTicket(comment);
            setCommentsDataChanaged(!commentsDataChanaged);
            toast.success("Comment posted with success !");
        } catch (error) {
            console.error(
                "Error creating new ticket!",
                error.response.data.message
            );
            toast.error("Error posting new comment !");
        }
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
                const commentsData = await API.getTicketComments(ticket_id);
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [ticket_id, commentsDataChanaged]);

    return (
        <div className="">
            <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
                <h3 className="font-bold text-2xl">Comments</h3>
                {currentComments.length === 0 ? (
                    <p className="text-gray-500 py-10 mx-6 text-lg">
                        No comments yet...
                    </p>
                ) : (
                    currentComments.map((comment) => (
                        <div key={comment.id} className="flex flex-col">
                            <div className="border rounded-md p-3 ml-3 my-3 flex items-center">
                                <div className="gap-3 flex-grow">
                                    <h3 className="font-bold">
                                        {comment.author_name}
                                        {user.id === comment.author_id &&
                                            " (Me)"}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        Posted on:{" "}
                                        {formatTimestamp(comment.created_at)}
                                    </p>
                                    {editingCommentId === comment.id ? (
                                        <div className="items-center">
                                            <div className="items-center">
                                                <input
                                                    className="border rounded-md mt-2"
                                                    type="text"
                                                    value={commentText}
                                                    onChange={handleInputChange}
                                                    autoFocus
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSaveComment(
                                                            comment.id,
                                                            commentText
                                                        )
                                                    }
                                                    className="text-blue-700 ml-2 underline text-sm"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancelEdit}
                                                    className="text-red-600 ml-2 underline text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-2">
                                            {comment.comment}
                                        </p>
                                    )}
                                </div>
                                {user.id == comment.author_id && (
                                    <svg
                                        className="w-4 h-4 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 18"
                                        onClick={() =>
                                            handleEditComment(comment.id)
                                        }
                                    >
                                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))
                )}

                <div className="flex items-center px-3">
                    <button
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={indexOfFirstComment === 0}
                        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                            indexOfFirstComment === 0
                                ? "cursor-not-allowed"
                                : ""
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
                <form onSubmit={handlePostComment}>
                    <div className="w-full px-3 my-2 mt-5">
                        <textarea
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-40 py-2 px-3 font-medium placeholder-gray-500 focus:outline-none focus:bg-white"
                            name="body"
                            placeholder="Type Your Comment..."
                            required
                        ></textarea>
                    </div>

                    <div className="w-full flex justify-end px-3">
                        <button
                            type="submit"
                            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Post comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Comments;
