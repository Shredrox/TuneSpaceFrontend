export default interface Band {
  name: string;
  description?: string;
  genre?: string;
  coverImage?: Uint8Array;
  country?: string;
  city?: string;
  userId: string;
}
