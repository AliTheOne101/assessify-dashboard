import { Header } from "@/components/Header";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const courses = ["IT312", "IT313", "IT314", "IT315", "ITE26"];

const assessments = [
  { id: 1, title: "Prelim Exam", timeLimit: 90, course: "IT312" },
  { id: 2, title: "Quiz 1", timeLimit: 30, course: "IT312" },
  { id: 3, title: "Midterm Exam", timeLimit: 120, course: "IT313" },
  { id: 4, title: "Quiz 2", timeLimit: 45, course: "IT314" },
  { id: 5, title: "Final Exam", timeLimit: 180, course: "IT315" },
];

const Assessments = () => {
  const navigate = useNavigate();

  const handleTakeAssessment = (id: number) => {
    toast.success("Starting assessment...");
    navigate(`/assessment/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Assessments Available
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Courses Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses</h2>
              <div className="space-y-2">
                {courses.map((course) => (
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
                        Time Limit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assessments.map((assessment) => (
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
                            {assessment.timeLimit} MINS
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleTakeAssessment(assessment.id)}
                            className="btn-primary"
                          >
                            Take Assessment
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

export default Assessments;