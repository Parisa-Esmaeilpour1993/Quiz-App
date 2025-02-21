interface Question {
  question: string;
  correct_answer: string;
}

interface ModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  modalType: string;
  unansweredQuestions: Question[];
  incorrectQuestions: Question[];
  selectedAnswers: { [key: number]: string };
  quizList: Question[];
}

export default function ResultModal({
  showModal,
  handleCloseModal,
  modalType,
  unansweredQuestions,
  incorrectQuestions,
  selectedAnswers,
  quizList,
}: ModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl h-5/6 w-full overflow-y-auto max-h-max">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          {modalType === "unanswered"
            ? "Unanswered Questions"
            : "Incorrect Answers"}
        </h2>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleCloseModal}
        >
          Close
        </button>
        {/* Display unanswered questions */}
        {modalType === "unanswered" && (
          <>
            {unansweredQuestions.length > 0 ? (
              unansweredQuestions.map((question, index) => (
                <div
                  key={index}
                  className="mb-4 border p-4 rounded-md text-black"
                >
                  <p className="font-bold mb-3">
                    Question:{" "}
                    <span className="font-semibold">{question.question}</span>
                  </p>
                  <p className="text-green-700 font-bold">
                    Correct Answer:{" "}
                    <span className="font-medium text-green-500">
                      {question.correct_answer}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 h-5/6">
                There is no unanswered questions.
              </div>
            )}
          </>
        )}
        {/* Display incorrect questions */}
        {modalType === "incorrect" && (
          <>
            {incorrectQuestions.length > 0 ? (
              incorrectQuestions.map((question, index) => (
                <div
                  key={index}
                  className="mb-4 border p-4 rounded-md text-black"
                >
                  <p className="font-bold mb-3">
                    Question:{" "}
                    <span className="font-semibold">{question.question}</span>
                  </p>
                  <p className="text-green-700 font-bold">
                    Correct Answer:{" "}
                    <span className="text-green-500 font-medium">
                      {question.correct_answer}
                    </span>
                  </p>
                  <p className="text-red-700 font-bold">
                    Your Answer:{" "}
                    <span className="text-red-500 font-medium">
                      {selectedAnswers[quizList.indexOf(question)]}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 h-5/6">
                There is no question with incorrect answer.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
