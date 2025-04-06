import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ListTodo } from 'lucide-react';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
              <ListTodo size={32} />
              <h1 className="text-3xl font-bold">TaskMaster</h1>
            </div>
            <p className="text-gray-600">Organize your tasks and notes in one place</p>
          </div>
          <TodoForm />
          <TodoList />
          <footer className="text-center text-gray-500 text-sm pt-8">
            Developed by Noel Regis
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;