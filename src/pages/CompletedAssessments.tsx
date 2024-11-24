import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const completedAssessments = [
  { id: 1, title: "Prelim Exam", timeLimit: 90, course: "IT312", score: "85/100" },
  { id: 2, title: "Quiz 1", timeLimit: 30, course: "IT312", score: "28/30" },
  { id: 3, title: "Midterm Exam", timeLimit: 120, course: "IT313", score: "92/100" },
];

const CompletedAssessments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Completed Assessments
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Courses Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses</h2>
              <div className="space-y-2">
                {["IT312", "IT313", "IT314", "IT315", "ITE26"].map((course) => (
                  <div
                    key={course}
                    className="p-2 rounded hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Assessments Table */}
            <div className="md:col-span-3">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assessment Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {completedAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {assessment.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {assessment.course}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {assessment.score}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/completed-assessment/${assessment.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompletedAssessments;