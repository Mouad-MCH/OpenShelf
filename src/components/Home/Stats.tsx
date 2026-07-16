const stats = [
  { value: "12k+", label: "Total Volumes", color: "text-primary" },
  { value: "850", label: "Active Readers", color: "text-available" },
  { value: "94%", label: "Satisfaction", color: "text-primary" },
  { value: "24/7", label: "Digital Access", color: "text-borrowed" },
];

const Stats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center py-10 mt-10">
      {stats.map((s) => (
        <div key={s.label} className="border border-border rounded-lg py-10">
          <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-sm text-foreground/60 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
