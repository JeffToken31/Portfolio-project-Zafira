export interface CreateActionDto {
  title: string;
  description: string;
  imageUrl?: string;
  published?: boolean;
}

// Create
export async function createAction(action: CreateActionDto) {
  const res = await fetch('http://localhost:3001/actions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(action),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erreur lors de la création de l’action');
  }

  return res.json();
}

// Get all
export async function getActions() {
  const res = await fetch('http://localhost:3001/actions', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération des actions');
  return res.json();
}

// Get by ID
export async function getActionById(id: string) {
  const res = await fetch(`http://localhost:3001/actions/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Action non trouvée');
  return res.json();
}

// PArial update (patch)
export interface UpdateActionDto {
  title?: string;
  description?: string;
  imageUrl?: string;
  published?: boolean;
}

export async function patchAction(id: string, dto: UpdateActionDto) {
  const res = await fetch(`http://localhost:3001/actions/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || 'Erreur lors de la mise à jour de l’action'
    );
  }
  return res.json();
}

// Delete
export async function deleteAction(id: string) {
  const res = await fetch(`http://localhost:3001/actions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || 'Erreur lors de la suppression de l’action'
    );
  }
  return res.json();
}
