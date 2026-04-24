import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions().then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Transactions & Withdrawals
      </h1>

      <div className="bg-white p-6 rounded shadow">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between p-4 border-b"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">{item.bank}</p>
            </div>

            <div>{item.amount}</div>

            <button className="bg-yellow-600 text-white px-3 py-1 rounded">
              Process
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}