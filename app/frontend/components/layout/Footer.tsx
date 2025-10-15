import * as Lucide from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-alt)] text-[var(--color-text)] mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* --- 3 colonnes principales --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-center text-center sm:text-left">
          {/* Zafira Solidaire */}
          <div>
            <h3 className="font-bold text-lg mb-4">Zafira Solidaire</h3>
            <p>Association loi 1901</p>
            <p>Depuis 2020, nous accompagnons les personnes en insertion professionnelle</p>
            <p>en travaillant sur l'image et la confiance.</p>
            <p>Ensemble, redonnons de la dignité par l'image.</p>
          </div>

          {/* Nous contacter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Nous contacter</h3>
            <p>18 rue Charles Gouppy</p>
            <p>93600 Aulnay-sous-Bois, France</p>
            <p>Email : contact@zafira-solidaire.fr</p>
            <p>Tél : +33 1 23 45 67 89</p>
            <p>Lundi au vendredi : 9h - 17h</p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[var(--color-primary)] transition">Accueil</a></li>
              <li><a href="#mission" className="hover:text-[var(--color-primary)] transition">Mission</a></li>
              <li><a href="#temoignages" className="hover:text-[var(--color-primary)] transition">Témoignages</a></li>
              <li><a href="#blog" className="hover:text-[var(--color-primary)] transition">Blog</a></li>
              <li><a href="#faq" className="hover:text-[var(--color-primary)] transition">FAQ</a></li>
              <li><a href="#partenaires" className="hover:text-[var(--color-primary)] transition">Partenaires</a></li>
              <li><a href="#actions" className="hover:text-[var(--color-primary)] transition">Nos actions</a></li>
              <li><a href="#benevoles" className="hover:text-[var(--color-primary)] transition">Devenir bénévole</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-primary)] transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* --- Suivez-nous --- */}
        <div className="mt-12 border-t border-gray-300 pt-6">
          <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
          <ul className="flex flex-wrap gap-6">
            <li><a href="#" className="hover:text-[var(--color-primary)] transition">Facebook</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition">Instagram</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition">X</a></li>
          </ul>
        </div>

        {/* --- Bas du footer --- */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-sm text-gray-500">
          {/* Ligne copyright */}
          <p className="text-center mb-4">© {new Date().getFullYear()} Zafira Solidaire — Tous droits réservés.</p>

          {/* Ligne 4 colonnes pour mentions légales etc. */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-center items-center text-center sm:text-left">
            <a href="/mentions-legales" className="flex items-center justify-center gap-1 hover:text-[var(--color-primary)] transition">
              <Lucide.FileText size={16} /> Mentions légales
            </a>
            <a href="/politique-confidentialite" className="flex items-center justify-center gap-1 hover:text-[var(--color-primary)] transition">
              <Lucide.ShieldCheck size={16} /> Politique de confidentialité
            </a>
            <a href="/cgu" className="flex items-center justify-center gap-1 hover:text-[var(--color-primary)] transition">
              <Lucide.ScrollText size={16} /> CGU
            </a>
            <a href="/statuts" className="flex items-center justify-center gap-1 hover:text-[var(--color-primary)] transition">
              <Lucide.Landmark size={16} /> Statuts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
