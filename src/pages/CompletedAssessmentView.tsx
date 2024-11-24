import { Header } from "@/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockCompletedAssessment = {
  id: 1,
  title: "Prelim Exam",
  course: "IT312",
  description: "Introduction to Programming",
  semester: "First Semester",
  schoolYear: "2023-2024",
  score: "85/100",
  questions: [
    {
      id: 1,
      type: "multiple_choice",
      question: "What is the primary purpose of a constructor?",
      options: ["To destroy objects", "To initialize objects", "To copy objects", "To compare objects"],
      userAnswer: "To copy objects",
      correctAnswer: "To initialize objects",
    },
    {
      id: 2,
      type: "text",
      question: "Define encapsulation in your own words.",
      userAnswer: "Hiding implementation details",
      correctAnswer: "Bundling of data and the methods that operate on that data within a single unit or object",
    },
    {
      id: 3,
      type: "true_false",
      question: "Java is a purely object-oriented programming language.",
      userAnswer: "true",
      correctAnswer: "false",
    },
  ],
};

const CompletedAssessmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const renderAnswer = (question: any) => {
    const isCorrect = question.userAnswer === question.correctAnswer;
    const answerClass = isCorrect ? "text-green-600" : "text-red-600";

    return (
      <div className="space-y-2">
        <div className={answerClass}>
          <p className="font-semibold">Your Answer:</p>
          <p>{question.userAnswer}</p>
        </div>
        {!isCorrect && (
          <div className="text-green-600">
            <p className="font-semibold">Correct Answer:</p>
            <p>{question.correctAnswer}</p>
          </div>
        )}
      </div>
    );
  };

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
              {mockCompletedAssessment.title}
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Course: {mockCompletedAssessment.course}</p>
                <p className="text-gray-600">Subject: {mockCompletedAssessment.description}</p>
              </div>
              <div>
                <p className="text-gray-600">Semester: {mockCompletedAssessment.semester}</p>
                <p className="text-gray-600">School Year: {mockCompletedAssessment.schoolYear}</p>
              </div>
            </div>
            <div className="text-xl font-semibold text-gray-900">
              Final Score: {mockCompletedAssessment.score}
            </div>
          </div>

          <div className="space-y-8">
            {mockCompletedAssessment.questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Question {index + 1}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {question.question}
                  </h3>
                </div>

                {question.type === "multiple_choice" && (
                  <div className="space-y-2 mb-4">
                    {question.options.map((option: string, i: number) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${
                          option === question.correctAnswer
                            ? "bg-green-50 border border-green-200"
                            : option === question.userAnswer
                            ? "bg-red-50 border border-red-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}

                {renderAnswer(question)}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompletedAssessmentView;