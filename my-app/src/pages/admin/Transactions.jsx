export default function Transactions() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-5xl font-serif text-[#7b5800]">Transactions & Withdrawals</h1>
        <p className="mt-3 text-lg text-stone-600 max-w-2xl">
          Manage financial ledgers, oversee class payments, and process tutor withdrawal requests.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#efefd7] p-8 rounded">
            <p className="text-xs uppercase tracking-widest text-stone-500">Total Disbursed (MTD)</p>
            <h3 className="mt-4 text-5xl font-serif text-[#7b5800]">₫45,200,000</h3>
            <p className="mt-3 text-sm text-stone-500">+12% from last month</p>
          </div>

          <div className="bg-[#efefd7] p-8 rounded">
            <p className="text-xs uppercase tracking-widest text-stone-500">Withdrawal Queue</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-serif">12</span>
              <span className="text-stone-500">Pending Requests</span>
            </div>
            <button className="mt-6 w-full bg-[#e1aa36] text-[#5b4000] py-3 rounded">
              Process Batch
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-8 rounded">
          <h2 className="text-3xl font-serif mb-6">Pending Withdrawals</h2>
          <div className="space-y-4">
            {[
              ["Nguyen Van Linh", "Techcombank • ****4920", "₫2,500,000"],
              ["Tran Thi Hoa", "Vietcombank • ****1182", "₫1,200,000"],
              ["Pham Quang Minh", "MB Bank • ****8831", "₫4,800,000"],
            ].map(([name, bank, amount]) => (
              <div key={name} className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-[#fbfbe2] rounded">
                <div>
                  <h4 className="font-medium">{name}</h4>
                  <p className="text-xs uppercase tracking-wider text-stone-500 mt-1">{bank}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-serif text-xl text-[#7b5800]">{amount}</p>
                    <span className="text-xs bg-slate-200 px-2 py-1 rounded">Pending</span>
                  </div>
                  <button className="bg-[#7b5800] text-white px-4 py-2 rounded">Process</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 bg-[#efefd7] rounded p-8 overflow-x-auto">
          <h2 className="text-3xl font-serif mb-6">General Ledger</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-stone-500 border-b">
                <th className="py-4 text-left">Date / Time</th>
                <th className="text-left">Reference ID</th>
                <th className="text-left">Type</th>
                <th className="text-left">Description</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4">Oct 24, 2023 14:30</td>
                <td>TXN-99281-A</td>
                <td>Class Payment</td>
                <td>Advanced Calculus Group B</td>
                <td className="text-right text-[#7b5800] font-serif">₫800,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-4">Oct 23, 2023 16:45</td>
                <td>WDL-11029-X</td>
                <td>Withdrawal</td>
                <td>Tutor Payout (Processed)</td>
                <td className="text-right text-red-600 font-serif">-₫3,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}