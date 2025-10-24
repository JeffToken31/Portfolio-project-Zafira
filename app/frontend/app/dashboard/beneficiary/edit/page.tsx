'use client';

import {useState, useEffect} from 'react';
import {Mail, Save, Trash2} from 'lucide-react';
import {fetchUser, logout} from '@/lib/api/auth';
import {getUserById, updateUser, deleteUser, UserDto} from '@/lib/api/user';
import toast from 'react-hot-toast';

export default function EditProfilBeneficiaire() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const me = await fetchUser();
        if (!me?.user?.id)
          throw new Error("Impossible de récupérer l'utilisateur");

        const fullUser = await getUserById(me.user.id);
        setUser(fullUser);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError(null);

      await updateUser(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      setSuccessMessage('Modifications enregistrées !');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (
      !confirm(
        'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
      )
    )
      return;

    try {
      await deleteUser(user.id);
      await logout();
      toast.success('Compte supprimé avec succès');
      window.location.href = '/';
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erreur lors de la suppression du compte';
      toast.error(message);
    }
  };

  if (loading)
    return <div className="p-8 text-center">Chargement du profil...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-text mb-6 text-center">
        Modifier mon profil
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Prénom */}
        <div className="flex items-center gap-3">
          <Save className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={user.firstName || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Nom */}
        <div className="flex items-center gap-3">
          <Save className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={user.lastName || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-4 mt-4 flex-col md:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="bg-[var(--color-accent)] text-black py-3 rounded-full hover:text-red-600 hover:bg-yellow-200 transition flex-1"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-3 rounded-full hover:bg-red-600 hover:text-accent transition flex-1 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" /> Supprimer mon compte
          </button>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <p className="text-green-600 mt-4 text-center font-medium">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}
