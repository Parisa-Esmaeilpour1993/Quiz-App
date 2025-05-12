interface EmojiFeedbackProps {
  percentage: number;
}

export default function EmojiFeedback({ percentage }: EmojiFeedbackProps) {
  if (percentage < 25)
    return (
      <div>
        😢 <p className="text-xl text-red-500 mt-3 mb-8">Try More...</p>
      </div>
    );
  if (percentage >= 25 && percentage < 50)
    return (
      <div>
        😕
        <p className="text-xl text-yellow-500 mt-3 mb-8">You Can be Better!</p>
      </div>
    );
  if (percentage >= 50 && percentage < 75)
    return (
      <div>
        🙂 <p className="text-xl text-orange-700 mt-3 mb-8">It's Good!</p>
      </div>
    );
  if (percentage >= 75)
    return (
      <div>
        😄 <p className="text-xl text-green-400 mt-3 mb-8">Excellent!</p>
      </div>
    );
  return null;
}
