export default function ATSScore({ score }) {
  return (
    <div className="bg-gray-800 p-4 rounded mb-4 text-center">
      <p className="text-sm text-gray-400">ATS Score</p>
      <h2 className="text-3xl font-bold text-green-400">{score}/100</h2>
    </div>
  );
}
