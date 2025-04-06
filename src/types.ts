export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  note: string;
  category: string;
  createdAt: Date;
}

export type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string, note: string, category: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, note: string, category: string) => void;
};