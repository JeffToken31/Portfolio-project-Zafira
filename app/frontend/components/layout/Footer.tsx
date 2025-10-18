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
            <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
              <Lucide.Mail size={18} />
              <a href="mailto:contact@zafira-solidaire.fr" className="hover:text-[var(--color-primary)] transition">
                contact@zafira-solidaire.fr
              </a>
            </div>
            <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
              <Lucide.Phone size={18} />
              <a href="tel:+33123456789" className="hover:text-[var(--color-primary)] transition">
                +33 1 23 45 67 89
              </a>
            </div>
            <p>Lundi au vendredi : 9h - 17h</p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[var(--color-primary)] transition">Accueil</a></li>
              <li><a href="#mission" className="hover:text-[var(--color-primary)] transition">Mission</a></li>
              <li><a href="#testimonials" className="hover:text-[var(--color-primary)] transition">Témoignages</a></li>
              <li><a href="#blog" className="hover:text-[var(--color-primary)] transition">Blog</a></li>
              <li><a href="#faq" className="hover:text-[var(--color-primary)] transition">FAQ</a></li>
              <li><a href="#partners" className="hover:text-[var(--color-primary)] transition">Partenaires</a></li>
              <li><a href="#actions" className="hover:text-[var(--color-primary)] transition">Nos actions</a></li>
              <li><a href="#participation" className="hover:text-[var(--color-primary)] transition">Devenir bénévole</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-primary)] transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* --- Suivez-nous --- */}
        <div className="mt-12 border-t border-gray-300 pt-6">
          <h3 className="font-bold text-lg mb-4 text-center sm:text-left">Suivez-nous</h3>
          <ul className="flex flex-wrap gap-6 justify-center sm:justify-start">
            <li>
              <a
                href="https://www.facebook.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow hover:bg-blue-500 transition"
              >
                <Lucide.Facebook className="text-blue-600 w-12 h-12 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/accounts/login/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow hover:bg-pink-500 transition"
              >
                <Lucide.Instagram className="text-pink-500 w-12 h-12 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow hover:bg-blue-700 transition"
              >
                <Lucide.Linkedin className="text-blue-700 w-12 h-12 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/i/flow/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow hover:bg-black transition"
              >
                <Lucide.X className="text-black w-12 h-12 hover:text-white" />
              </a>
            </li>
          </ul>
        </div>

        {/* --- Bas du footer --- */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-sm text-gray-500">
          <p className="text-center mb-4">© {new Date().getFullYear()} Zafira Solidaire — Tous droits réservés.</p>

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
