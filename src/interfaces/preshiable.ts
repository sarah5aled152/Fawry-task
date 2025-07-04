export interface Perishable {
  expirationDate: Date;
  isExpired(): boolean;
}
