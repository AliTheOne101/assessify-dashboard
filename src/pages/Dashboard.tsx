import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      setUsername(user);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, {username}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => navigate("/assessments")}
              className="bg-white p-6 rounded-lg shadow-sm card-hover cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Available Assessments</h2>
              <p className="text-gray-600">View and take your pending assessments</p>
            </div>

            <div 
              onClick={() => navigate("/completed-assessments")}
              className="bg-white p-6 rounded-lg shadow-sm card-hover cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Completed Assessments</h2>
              <p className="text-gray-600">Review your completed assessments</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;