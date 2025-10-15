import Footer from "@/components/layout/Footer";

export default function TestFooterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--color-bg)] text-[var(--color-text)]">
      
      {/* Contenu fictif au-dessus du footer */}
      <main className="flex-grow flex items-center justify-center text-gray-500">
        <p>Contenu fictif pour tester le footer</p>
      </main>

      {/* Footer réel */}
      <Footer />
    </div>
  );
}
