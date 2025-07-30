type Activity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  category: string;
  isCanceled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  date: Date | string;
  hostId: string
};
type CreateActivityInput = {
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  date: string | Date;
  latitude: number;
  longitude: number;
};
type UseFetchingDataResult<T> = {
  data: T | undefined;
  statusUI: JSX.Element | null;
  query: UseQueryResult<T>;
};

type FormType = "view" | "create" | "close" | "edit";
