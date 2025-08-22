export interface AuthContextType {
  userId: string | null;
  loading: boolean;
  error: string | null;
  setUserId: (userId: string | null) => void;
  refetch: () => Promise<void>;
  userName: string | null;
}