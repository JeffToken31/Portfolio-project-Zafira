'use client';

import {useState, useEffect} from 'react';
import {Mail, Save, Lock} from 'lucide-react';
import {fetchUser} from '@/lib/api/auth';
import {getUserById, updateUser, UserDto} from '@/lib/api/user';
import toast from 'react-hot-toast';
import NavDashboard from '@/components/uiStyled/nav-dashboard';


export default function EditProfilBeneficiaire() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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

    if (password && password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }


    try {
      setSaving(true);
      setError(null);

    await updateUser(user.id, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ...(password ? {password} : {}),
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

  if (loading)
    return <div className="p-8 text-center">Chargement du profil...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <NavDashboard />

      <h2 className="text-2xl p-8 font-bold text-text m-10 text-center">
        Modifier mon profil
      </h2>

      <form
        className="max-w-2xl flex flex-col mx-auto gap-8"
        onSubmit={handleSubmit}
      >
        {/* First name */}
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

        {/* Last name */}
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

        {/* mail */}
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

        {/* New pass */}
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="password"
            name="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Confirm */}
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--color-accent)] text-black py-3 rounded-full hover:text-red-600 hover:bg-yellow-200 transition flex-1"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
        {/* Success message */}
        {successMessage && (
          <p className="text-green-600 mt-4 text-center font-medium">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}
