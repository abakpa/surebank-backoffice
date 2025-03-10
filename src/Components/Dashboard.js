const cardData = [
  { title: "Total DS Contribution", amount: 5000, bgColor: "bg-blue-100", textColor: "text-blue-800" },
  { title: "Total SB Contribution", amount: 5000, bgColor: "bg-green-100", textColor: "text-green-800" },
  { title: "Total Contribution", amount: 5000, bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
  { title: "Total DS Daily Contribution", amount: 5000, bgColor: "bg-red-100", textColor: "text-red-800" },
  { title: "Total SB Daily Contribution", amount: 5000, bgColor: "bg-purple-100", textColor: "text-purple-800" },
  { title: "Total Daily Contribution", amount: 5000, bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
  { title: "Total DS Withdraw", amount: 5000, bgColor: "bg-pink-100", textColor: "text-pink-800" },
  { title: "Total DS Package", amount: 5000, bgColor: "bg-teal-100", textColor: "text-teal-800" },
  { title: "Total SB Package", amount: 2000, bgColor: "bg-orange-100", textColor: "text-orange-800" },
  { title: "Total Package", amount: 2000, bgColor: "bg-gray-100", textColor: "text-gray-800" },
  { title: "DS Income", amount: 2000, bgColor: "bg-cyan-100", textColor: "text-cyan-800" },
  { title: "SB Income", amount: 2000, bgColor: "bg-lime-100", textColor: "text-lime-800" },
  { title: "Total Income", amount: 2000, bgColor: "bg-rose-100", textColor: "text-rose-800" },
  { title: "Expenditure", amount: 2000, bgColor: "bg-emerald-100", textColor: "text-emerald-800" },
  { title: "Net Balance", amount: 2000, bgColor: "bg-sky-100", textColor: "text-sky-800" },
];

const Dashboard = () => {
  const handleButtonClick = (title) => {
    console.log(`Fetching data for ${title}`);
  };

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 mt-8 text-center">Admin Dashboard</h1>
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${card.textColor}`}>{card.title}</h3>
          <p className={`text-xl font-bold ${card.textColor}`}>{card.amount || "N/A"}</p>
          <div className="flex flex-col gap-2 mt-2">
            <select className="p-2 border rounded-md">
              <option value="all">Select All</option>
              <option value="branch1">Branch 1</option>
              <option value="branch2">Branch 2</option>
            </select>
            <input type="date" className="p-2 border rounded-md" />
            <button
              onClick={() => handleButtonClick(card.title)}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Fetch Data
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;
