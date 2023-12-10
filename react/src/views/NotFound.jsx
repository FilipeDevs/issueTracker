function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-4xl font-bold mb-4">404 NOT FOUND</h1>
                <p className="text-gray-600">
                    The page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
