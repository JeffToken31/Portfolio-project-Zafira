import Footer from "@/components/layout/Footer";

export default function TestFooter() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow flex items-center justify-center text-gray-500">
        <p>Contenu fictif pour tester le footer</p>
      </main>
      <Footer />
    </div>
  );
}
