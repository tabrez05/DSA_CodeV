import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Topic, TopicCategory, TOPIC_CATEGORIES } from '../types/models';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Mock data for testing
export const MOCK_TOPICS: Topic[] = [
  {
    id: "1",
    name: "Strings",
    description: "Sequences of characters used to represent text.",
    difficulty: "Easy",
    maxScore: 10,
    successRate: 95.5,
    videoUrl: "https://www.youtube.com/watch?v=WLbdMMPFHMo",
    category: "Arrays & Strings"
  },
  {
    id: "2",
    name: "Two Pointers Technique",
    description: "Utilizing two indices to traverse data structures efficiently.",
    difficulty: "Medium",
    maxScore: 15,
    successRate: 85.2,
    videoUrl: "https://www.youtube.com/watch?v=VEPCm3BCtik",
    category: "Arrays & Strings"
  },
  {
    id: "3",
    name: "Sliding Window",
    description: "Optimizing problems involving subarrays or substrings.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 78.4,
    videoUrl: "https://www.youtube.com/watch?v=dOonV4byDEg",
    category: "Arrays & Strings"
  },
  {
    id: "4",
    name: "Prefix Sum",
    description: "Precomputing cumulative sums for efficient range queries.",
    difficulty: "Easy",
    maxScore: 12,
    successRate: 92.1,
    videoUrl: "https://www.youtube.com/watch?v=pVS3yhlzrlQ",
    category: "Arrays & Strings"
  },
  {
    id: "5",
    name: "Singly Linked List",
    description: "Nodes connected in a single forward direction.",
    difficulty: "Easy",
    maxScore: 15,
    successRate: 89.3,
    videoUrl: "https://www.youtube.com/watch?v=HB7TcYklBHY",
    category: "Linked Lists"
  },
  {
    id: "6",
    name: "Doubly Linked List",
    description: "Nodes connected both forward and backward.",
    difficulty: "Medium",
    maxScore: 18,
    successRate: 82.7,
    videoUrl: "https://www.youtube.com/watch?v=e9NG_a6Z0mg",
    category: "Linked Lists"
  },
  {
    id: "7",
    name: "Circular Linked List",
    description: "Last node points back to the first, forming a circle.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 79.5,
    videoUrl: "https://www.youtube.com/watch?v=gztwNv4o_9E",
    category: "Linked Lists"
  },
  {
    id: "8",
    name: "Skip List",
    description: "Layered linked list for faster search operations.",
    difficulty: "Hard",
    maxScore: 25,
    successRate: 68.9,
    videoUrl: "https://www.youtube.com/watch?v=hqHwQUdTgLM",
    category: "Linked Lists"
  },
  {
    id: "9",
    name: "Stack (LIFO)",
    description: "Last-In-First-Out data structure.",
    difficulty: "Easy",
    maxScore: 12,
    successRate: 94.2,
    videoUrl: "https://www.youtube.com/watch?v=KInG04mAjO0",
    category: "Stacks & Queues"
  },
  {
    id: "10",
    name: "Queue (FIFO)",
    description: "First-In-First-Out data structure.",
    difficulty: "Easy",
    maxScore: 12,
    successRate: 93.8,
    videoUrl: "https://www.youtube.com/watch?v=nqXaPZi99JI",
    category: "Stacks & Queues"
  },
  {
    id: "11",
    name: "Deque",
    description: "Double-Ended Queue - Insertion and deletion at both ends.",
    difficulty: "Medium",
    maxScore: 15,
    successRate: 85.6,
    videoUrl: "https://www.youtube.com/watch?v=OBftGLwEdEw",
    category: "Stacks & Queues"
  },
  {
    id: "12",
    name: "Hash Table",
    description: "Key-value pair storage for efficient lookup.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 86.5,
    videoUrl: "https://www.youtube.com/watch?v=shs0KM3wKv8",
    category: "Hashing"
  },
  {
    id: "13",
    name: "Open Addressing",
    description: "Collision resolution by probing.",
    difficulty: "Hard",
    maxScore: 25,
    successRate: 75.8,
    videoUrl: "https://www.youtube.com/watch?v=rvdJDijO2Ro",
    category: "Hashing"
  },
  {
    id: "14",
    name: "Separate Chaining",
    description: "Collision resolution using linked lists.",
    difficulty: "Hard",
    maxScore: 25,
    successRate: 77.2,
    videoUrl: "https://www.youtube.com/watch?v=0M_kIqhwbFo",
    category: "Hashing"
  },
  {
    id: "15",
    name: "Binary Tree Traversal",
    description: "Inorder, Preorder, and Postorder traversal techniques for binary trees.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 84.5,
    videoUrl: "https://www.youtube.com/watch?v=86g8jAQug04",
    category: "Trees"
  },
  {
    id: "16",
    name: "Binary Search Tree",
    description: "A binary tree data structure with ordered nodes for efficient searching.",
    difficulty: "Medium",
    maxScore: 25,
    successRate: 82.3,
    videoUrl: "https://www.youtube.com/watch?v=9Jry5-82I68",
    category: "Trees"
  },
  {
    id: "17",
    name: "Segment Tree",
    description: "A tree data structure for efficient range queries and updates.",
    difficulty: "Hard",
    maxScore: 30,
    successRate: 75.8,
    videoUrl: "https://www.youtube.com/watch?v=ZBHKZF5w4YU",
    category: "Trees"
  },
  {
    id: "18",
    name: "Breadth-First Search",
    description: "Level by level traversal of graphs and trees.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 86.4,
    videoUrl: "https://www.youtube.com/watch?v=0u78hx-66Xk",
    category: "Graphs"
  },
  {
    id: "19",
    name: "Depth-First Search",
    description: "Exploring paths to their depths in graphs and trees.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 85.7,
    videoUrl: "https://www.youtube.com/watch?v=Qzf1a--rhp8",
    category: "Graphs"
  },
  {
    id: "20",
    name: "Dijkstra's Algorithm",
    description: "Finding shortest paths in weighted graphs.",
    difficulty: "Hard",
    maxScore: 30,
    successRate: 78.2,
    videoUrl: "https://www.youtube.com/watch?v=XB4MIexjvY0",
    category: "Graphs"
  },
  {
    id: "21",
    name: "Merge Sort",
    description: "Efficient divide-and-conquer sorting algorithm.",
    difficulty: "Medium",
    maxScore: 20,
    successRate: 88.5,
    videoUrl: "https://www.youtube.com/watch?v=JSceec-wEyw",
    category: "Sorting & Searching"
  },
  {
    id: "22",
    name: "Quick Sort",
    description: "Fast, in-place sorting algorithm using partitioning.",
    difficulty: "Medium",
    maxScore: 25,
    successRate: 86.9,
    videoUrl: "https://www.youtube.com/watch?v=COk73cpQbFQ",
    category: "Sorting & Searching"
  }
];

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>(MOCK_TOPICS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Arrays & Strings');

  const filteredTopics = topics.filter(topic => topic.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Data Structures & Algorithms</h1>
      <p className="text-gray-600 mb-8">Master the fundamentals with our curated topics</p>
      
      {/* Category Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {TOPIC_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`/tutorial/${topic.id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {topic.name}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {topic.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  Max Score: {topic.maxScore}
                </span>
                <span className="text-sm text-gray-500">
                  Success: {topic.successRate}%
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {topic.description}
              </p>
              <div className="flex justify-end">
                <span className="inline-flex items-center text-blue-600 group-hover:translate-x-1 transition-transform">
                  Solve Challenge
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No topics available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Topics; 