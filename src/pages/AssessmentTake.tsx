import { Header } from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Question {
  id: number;
  type: "multiple_choice" | "text" | "true_false";
  question: string;
  options?: string[];
}

const mockAssessment = {
  id: 1,
  title: "Prelim Exam",
  course: "IT312",
  description: "Introduction to Programming",
  semester: "First Semester",
  schoolYear: "2023-2024",
  timeLimit: 90,
  questions: [
    {
      id: 1,
      type: "multiple_choice",
      question: "What is the primary purpose of a variable in programming?",
      options: [
        "To store data",
        "To create functions",
        "To style web pages",
        "To connect to databases"
      ]
    },
    {
      id: 2,
      type: "text",
      question: "Define what an algorithm is in your own words."
    },
    {
      id: 3,
      type: "true_false",
      question: "Python is a compiled programming language.",
      options: ["True", "False"]
    }
  ]
};

const AssessmentTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(mockAssessment.timeLimit * 60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          toast.error("Time's up! Assessment will be submitted automatically.");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setShowCompletion(true);
    // Here you would typically submit the answers to a backend
    console.log("Submitted answers:", answers);
  };

  const handleReturnHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in space-y-8">
          {/* Assessment Header */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {mockAssessment.title}
              </h1>
              <div className="text-xl font-semibold text-gray-700">
                Time Remaining: {formatTime(timeRemaining)}
              </div>
            </div>
            
            <Progress value={(timeRemaining / (mockAssessment.timeLimit * 60)) * 100} />
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Course: {mockAssessment.course}</div>
              <div>Subject: {mockAssessment.description}</div>
              <div>Semester: {mockAssessment.semester}</div>
              <div>School Year: {mockAssessment.schoolYear}</div>
            </div>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            {mockAssessment.questions.map((question, index) => (
              <Card key={question.id} className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {index + 1}. {question.question}
                </h3>

                {question.type === "multiple_choice" && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="text-gray-900 focus:ring-gray-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                )}

                {question.type === "true_false" && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="text-gray-900 focus:ring-gray-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Submit Assessment
            </Button>
          </div>
        </div>
      </main>

      {/* Completion Dialog */}
      <Dialog open={showCompletion} onOpenChange={setShowCompletion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              You have completed {mockAssessment.title}!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-center text-gray-600">
              <p>Course: {mockAssessment.course}</p>
              <p>Subject: {mockAssessment.description}</p>
              <p>Semester: {mockAssessment.semester}</p>
              <p>School Year: {mockAssessment.schoolYear}</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleReturnHome}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentTake;