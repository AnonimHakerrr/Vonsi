
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h3 className="text-2xl font-bold">VONSI RESORT</h3>
        </div>
        <p className="text-muted-foreground mb-6">© 2025 VONSI RESORT. Всі права захищені.</p>
        <div className="flex justify-center gap-8">
          <a href="/privacy" className="!text-yellow-400 transition-colors !no-underline">Політика конфіденційності</a>
          <a href="/terms" className="!text-yellow-400 transition-colors !no-underline">Умови використання</a>
        </div>
      </div>
    </footer>
  );
}
