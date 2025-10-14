import * as Lucide from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-alt)] text-[var(--color-text)] mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Zafira Solidaire</h3>
          <p>Association loi 1901</p>
          <p>Depuis 2020, nous accompagnons les personnes en insertion </p>
          <p>professionnelle en travaillant sur l'image et la confiance.</p>
          <p>Ensemble, redonnons de la dignité par l'image.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Nous contacter</h3>
          <p>18 rue Charles Gouppy</p>
          <p>93600 Aulnay-sous-Bois, France</p>
          <p>Email : contact@zafira-solidaire.fr</p>
          <p>Tél : +33 1 23 45 67 89</p>
          <p>Lundi au vendredi : 9h - 17h</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[var(--color-primary)]">Accueil</a></li>
            <li><a href="#mission" className="hover:text-[var(--color-primary)]">Mission</a></li>
            <li><a href="#temoignages" className="hover:text-[var(--color-primary)]">Témoignages</a></li>
            <li><a href="#blog" className="hover:text-[var(--color-primary)]">Blog</a></li>
            <li><a href="#faq" className="hover:text-[var(--color-primary)]">FAQ</a></li>
            <li><a href="#partenaires" className="hover:text-[var(--color-primary)]">Partenaires</a></li>
            <li><a href="#actions" className="hover:text-[var(--color-primary)]">Nos actions</a></li>
            <li><a href="#benevoles" className="hover:text-[var(--color-primary)]">Devenir bénévole</a></li>
            <li><a href="#contact" className="hover:text-[var(--color-primary)]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-[var(--color-primary)]">Facebook</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">Instagram</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">X</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Zafira Solidaire — Tous droits réservés.

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a href="/mentions-legales" className="flex items-center gap-1 hover:text-white transition">
            <Lucide.FileText size={16} /> Mentions légales
          </a>
           <a href="/politique-confidentialite" className="flex items-center gap-1 hover:text-white transition">
            <Lucide.ShieldCheck size={16} /> Politique de confidentialité
          </a>
          <a href="/cgu" className="flex items-center gap-1 hover:text-white transition">
            <Lucide.ScrollText size={16} /> CGU
          </a>
          <a href="/statuts" className="flex items-center gap-1 hover:text-white transition">
            <Lucide.Landmark size={16} /> Statuts
          </a>
        </div>
      </div>
    </footer>
  );
}
