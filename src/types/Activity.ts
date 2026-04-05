export type Activity = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
  createdAt: string;
};

// (Data Transfer Object): a typed object that defines the shape of data used 
// to send or receive information between layers
export type CreateActivityDTO = Omit<
  Activity,
  "id" | "createdAt" | "completed"
>;
