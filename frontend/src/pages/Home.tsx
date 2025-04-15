import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to CodeWit
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Master Data Structures and Algorithms through interactive coding challenges and real-time feedback.
      </p>
      <div className="flex gap-4">
        <Link
          to="/topics"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Start Learning
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home; 