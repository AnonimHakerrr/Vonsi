export default function StatsSection() {
  const stats = [
    { value: "15", label: "Лижних трас" },
    { value: "120", label: "Номерів готелю" },
    { value: "5", label: "Зірок сервісу" },
    { value: "24/7", label: "Підтримка гостей" },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ">
        {stats.map((stat, i) => (
          <div key={i} className="hover:scale-[1.05] transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 border-4 border-yellow-400 rounded-full inline-block px-4 py-2 ">
              {stat.value}
            </div>
            <div className="text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
