import { useState, useEffect } from "react";
import api from "../api/axios";
import { Trophy } from "lucide-react";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  const fetchTournaments = async () => {
    try {
      const response = await api.get("/api/tournaments");
      setTournaments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center space-x-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">
            Tournaments
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {tournament.bannerUrl && (
                <img
                  src={tournament.bannerUrl}
                  alt={tournament.name}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  {tournament.name}
                </h2>

                <p className="text-gray-600">
                  Game: {tournament.game}
                </p>

                <p className="text-gray-600">
                  Mode: {tournament.mode}
                </p>

                <p className="text-green-600 font-semibold">
                  Prize Pool ₹{tournament.prizePool}
                </p>

                <p className="text-blue-600">
                  {tournament.status}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tournaments;