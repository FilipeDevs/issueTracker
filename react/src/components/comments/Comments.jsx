import { useEffect, useState } from "react";
import API from "../../utils/API";
import Loading from "../Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comments({ ticket_id, formatTimestamp }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentsDataChanaged, setCommentsDataChanaged] = useState(false);

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

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    return (
        <div className="">
            <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
                <h3 className="font-bold text-2xl">Comments</h3>
                {currentComments.map((comment) => (
                    <div key={comment.id} className="flex flex-col">
                        <div className="border rounded-md p-3 ml-3 my-3">
                            <div className="gap-3 items-center">
                                <h3 className="font-bold">
                                    {comment.author_name}
                                </h3>
                                <p className="text-sm">
                                    Posted on :{" "}
                                    {formatTimestamp(comment.created_at)}
                                </p>
                            </div>

                            <p className="text-gray-600 mt-2">
                                {comment.comment}
                            </p>
                        </div>
                    </div>
                ))}

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
