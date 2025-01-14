import { useState } from "react";

const CustomerAccountDashboard = () => {
  // Mock data for customer and accounts
  const customer = {
    name: "John Doe",
    accountNumber: "123456789",
    accounts: [
      { type: "Savings", number: "SA-001", balance: 1500 },
      { type: "Current", number: "CA-001", balance: 500 },
      { type: "Fixed Deposit", number: "FD-001", balance: 10000 },
    ],
  };

  const transactionHistory = {
    "SA-001": [
      { date: "2025-01-01", description: "Deposit", amount: 500, balance: 1500 },
      { date: "2024-12-20", description: "Withdrawal", amount: -200, balance: 1000 },
    ],
    "CA-001": [
      { date: "2024-12-22", description: "Deposit", amount: 300, balance: 500 },
    ],
    "FD-001": [
      { date: "2024-12-01", description: "Fixed Deposit Creation", amount: 10000, balance: 10000 },
    ],
  };

  // State for selected account
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Customer Account Dashboard</h1>
        <p className="text-gray-700">
          <strong>Name:</strong> {customer.name}
        </p>
        <p className="text-gray-700">
          <strong>Account Number:</strong> {customer.accountNumber}
        </p>
        <p className="text-gray-700">
          <strong>Total Balance:</strong> $
          {customer.accounts.reduce((sum, account) => sum + account.balance, 0)}
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Accounts</h2>
          <ul className="space-y-4">
            {customer.accounts.map((account) => (
              <li
                key={account.number}
                className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md"
              >
                <div>
                  <p className="font-medium">{account.type} Account</p>
                  <p className="text-sm text-gray-600">No: {account.number}</p>
                  <p className="text-sm text-gray-600">Balance: ${account.balance}</p>
                </div>
                <button
                  onClick={() => setSelectedAccount(account.number)}
                  className="text-blue-600 hover:underline"
                >
                  View Transactions
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel - Transaction History */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Transaction History</h2>
          {selectedAccount ? (
            <div>
              <h3 className="text-md font-semibold mb-2">
                Account: {selectedAccount}
              </h3>
              <ul className="space-y-2">
                {transactionHistory[selectedAccount]?.map((transaction, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded"
                  >
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        transaction.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount}
                    </p>
                    <p className="text-sm text-gray-600">Bal: ${transaction.balance}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">Select an account to view transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountDashboard;
