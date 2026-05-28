import { Link } from 'react-router-dom';
import { Trophy, Users, Gamepad2, GitBranch, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Tournaments',
      description: 'Create and manage gaming tournaments',
      link: '/tournaments',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Teams',
      description: 'Register and manage teams',
      link: '/teams',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gamepad2,
      title: 'Matches',
      description: 'View matches and submit results',
      link: '/matches',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: GitBranch,
      title: 'Brackets',
      description: 'Generate tournament brackets',
      link: '/brackets',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageSquare,
      title: 'Kafka',
      description: 'Send messages via Kafka',
      link: '/kafka',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to GameHok</h1>
          <p className="text-xl text-gray-300">Your ultimate tournament management platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="flex items-center text-accent group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
            <p className="text-gray-300 mb-6">
              Create an account to start managing your tournaments, teams, and matches.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
