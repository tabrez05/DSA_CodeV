import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-8 animate-fade-in">
            Master DSA with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              CodeWit
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Your journey to mastering Data Structures and Algorithms starts here. 
            Practice with interactive challenges, learn from detailed explanations, 
            and track your progress in real-time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/topics"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Learning
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 border-2 border-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Create Free Account
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-2xl mb-3">📚</div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">Progress through carefully curated topics and challenges</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-2xl mb-3">💻</div>
              <h3 className="text-xl font-semibold mb-2">Interactive Practice</h3>
              <p className="text-gray-600">Write and test code directly in your browser</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-2xl mb-3">📈</div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your learning journey with detailed analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 