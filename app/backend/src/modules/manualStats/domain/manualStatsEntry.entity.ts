export class ManualStatisticEntry {
  private _id: string;
  private _manualStatisticId: string;
  private _quantity: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    manualStatisticId: string,
    quantity: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    if (quantity < 0) throw new Error('La quantité ne peut pas être négative.');

    this._id = id;
    this._manualStatisticId = manualStatisticId;
    this._quantity = quantity;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // --- Getters ---
  get id(): string {
    return this._id;
  }
  get manualStatisticId(): string {
    return this._manualStatisticId;
  }
  get quantity(): number {
    return this._quantity;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  // --- Business logic ---
  updateQuantity(newQuantity: number): void {
    if (newQuantity < 0)
      throw new Error('La quantité ne peut pas être négative.');
    this._quantity = newQuantity;
    this._updatedAt = new Date();
  }

  // --- Utils ---
  toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      manualStatisticId: this._manualStatisticId,
      quantity: this._quantity,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
