import { ManualStatisticType } from './manualStatsType.enum';
import { ManualStatisticEntry } from './manualStatsEntry.entity';

export class ManualStatistic {
  private _id: string;
  private _type: ManualStatisticType;
  private _entries: ManualStatisticEntry[];

  constructor(
    id: string,
    type: ManualStatisticType,
    entries: ManualStatisticEntry[] = [],
  ) {
    this._id = id;
    this._type = type;
    this._entries = entries;
    // plus besoin de recalc total, le getter le fait automatiquement
  }

  // --- Getters ---
  get id(): string {
    return this._id;
  }

  get type(): ManualStatisticType {
    return this._type;
  }

  get entries(): ManualStatisticEntry[] {
    return this._entries;
  }

  /** Total calculé dynamiquement à partir des entrées */
  get totalQuantity(): number {
    return this._entries.reduce((acc, e) => acc + e.quantity, 0);
  }

  // --- Business logic ---

  /** Ajoute une nouvelle entrée */
  addEntry(entry: ManualStatisticEntry): void {
    if (entry.quantity <= 0)
      throw new Error('La quantité doit être supérieure à 0.');

    this._entries.push(entry);
  }

  /** Modifie une entrée existante */
  updateEntry(entryId: string, newQuantity: number): void {
    if (newQuantity < 0)
      throw new Error('La quantité ne peut pas être négative.');

    const entry = this._entries.find((e) => e.id === entryId);
    if (!entry) throw new Error('Entrée introuvable.');

    entry.updateQuantity(newQuantity);
  }

  /** Supprime une entrée */
  removeEntry(entryId: string): void {
    const index = this._entries.findIndex((e) => e.id === entryId);
    if (index === -1) throw new Error('Entrée introuvable.');
    this._entries.splice(index, 1);
  }

  // --- Utils ---
  toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      type: this._type,
      totalQuantity: this.totalQuantity,
      entries: this._entries.map((e) => e.toJSON()),
    };
  }
}
