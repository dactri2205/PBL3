export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h2 className="text-5xl font-serif text-[#1b1d0e]">Overview</h2>
        <p className="mt-2 text-lg text-stone-600">
          A summary of active scholarly engagements and institutional financial health.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded">
          <p className="text-xs uppercase tracking-widest text-stone-500">Registered Tutors</p>
          <h3 className="mt-4 text-5xl text-[#7b5800] font-serif">2,450</h3>
          <p className="mt-3 text-sm text-stone-500">+12% this semester</p>
        </div>

        <div className="bg-white p-8 rounded">
          <p className="text-xs uppercase tracking-widest text-stone-500">Active Scholars</p>
          <h3 className="mt-4 text-5xl text-[#7b5800] font-serif">5,120</h3>
          <p className="mt-3 text-sm text-stone-500">+8% this semester</p>
        </div>

        <div className="bg-white p-8 rounded">
          <p className="text-xs uppercase tracking-widest text-stone-500">Total Revenue</p>
          <h3 className="mt-4 text-5xl text-[#7b5800] font-serif">₫125,000,000</h3>
          <p className="mt-3 text-sm text-stone-500">Cleared funds</p>
        </div>
      </section>
    </div>
  );
}