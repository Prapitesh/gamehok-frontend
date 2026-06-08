import { useState, useEffect } from "react";
import api from "../api/axios";
import { Gamepad2, Trophy, RefreshCw } from "lucide-react";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [resultData, setResultData] = useState({
    winner: "",
    score: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");

  const fetchMatches = async () => {
    setFetching(true);
    try {
      const response = await api.get("/api/matches");
      setMatches(response.data.content || response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMatch) return;

    setLoading(true);
    setMessage("");

    try {
      await api.post(`/api/matches/${selectedMatch}/result`, resultData);
      setMessage("Match result submitted successfully!");
      setResultData({ winner: "", score: "" });
      setSelectedMatch(null);
      fetchMatches();
    } catch (error) {
      setMessage(
        "Error submitting result: " +
          (error.response?.data?.message || error.message),
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Matches</h1>
          </div>
          <button
            onClick={fetchMatches}
            disabled={fetching}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <RefreshCw
              className={`h-5 w-5 ${fetching ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Submit Match Result</span>
            </h2>

            {message && (
              <div
                className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleResultSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Match
                </label>
                <select
                  value={selectedMatch || ""}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="">Choose a match</option>
                  {matches.map((match) => (
                    <option key={match.id} value={match.id}>
                      {match.team1} vs {match.team2} - {match.date}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Winner
                </label>
                <input
                  type="text"
                  value={resultData.winner}
                  onChange={(e) =>
                    setResultData({ ...resultData, winner: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter winning team"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score
                </label>
                <input
                  type="text"
                  value={resultData.score}
                  onChange={(e) =>
                    setResultData({ ...resultData, score: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter score (e.g., 2-1)"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Result"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Matches</h2>

            {matches.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No matches available
              </p>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {match.team1} vs {match.team2}
                    </h3>
                    <p className="text-sm text-gray-600">Date: {match.date}</p>
                    <p className="text-sm text-gray-600">
                      Status: {match.status || "Scheduled"}
                    </p>
                    {match.result && (
                      <p className="text-sm font-medium text-green-600">
                        Result: {match.result}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
