import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
      >
        Go back Home
      </Link>
    </div>
  );
}
