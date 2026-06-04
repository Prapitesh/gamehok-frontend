import { useState, useEffect } from "react";
import api from "../api/axios";
import { Users, RefreshCw } from "lucide-react";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchTeams = async () => {
    setFetching(true);

    try {
      const response = await api.get("/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">
              Teams
            </h1>
          </div>

          <button
            onClick={fetchTeams}
            disabled={fetching}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                fetching ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            All Teams
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="border rounded-lg p-4 shadow"
              >
                {team.logoUrl && (
                  <img
                    src={team.logoUrl}
                    alt={team.teamName}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                )}

                <h3 className="font-bold text-lg">
                  {team.teamName}
                </h3>

                <p>Team ID: {team.id}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Teams;