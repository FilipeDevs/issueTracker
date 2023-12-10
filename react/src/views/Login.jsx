import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, Link } from "react-router-dom";
import API from "../utils/API";

function Login() {
    const { token, setUser, setToken } = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    if (token) {
        // Prevent auth users to have access to this view
        return <Navigate to={"/dashboard"} />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors(null); // Clear any previous errors

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const data = await API.login(payload);
            setUser({
                name: data.user.name,
                role: data.user.roles[0].name,
                id: data.user.id,
            });
            setToken(data.token);
        } catch (errors) {
            if (errors.response && errors.response.status === 422) {
                const response = errors.response;
                const errorMessages = response.data.errors || {
                    email: [response.data.message],
                    password: [response.data.message],
                };
                setErrors(errorMessages);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto m-10 p-6 bg-white rounded-md shadow-md dark:bg-gray-900">
            <div className="flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-gray-800 dark:text-white mr-2 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 19 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6"
                    />
                </svg>
                <h1 className="block mb-5 text-4xl font-medium text-gray-900 dark:text-white text-center">
                    IssueTracker
                </h1>
            </div>

            <h1 className="block mb-5 text-2xl font-medium text-gray-900 dark:text-white text-center">
                Log in
            </h1>
            <form onSubmit={handleLogin}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email"
                        required
                    ></input>
                    {errors && errors.email && (
                        <p className="text-red-500">{errors.email[0]}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    ></input>
                    {errors && errors.password && (
                        <p className="text-red-500">{errors.password[0]}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Log in
                </button>
                <p className="mt-4 dark:text-white">
                    Don't have an account yet ?
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        {" "}
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
