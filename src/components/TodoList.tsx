import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types';

function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNote, setEditNote] = useState(todo.note);
  const [editCategory, setEditCategory] = useState(todo.category);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    updateTodo(todo.id, editTitle.trim(), editNote.trim(), editCategory);
    setIsEditing(false);
  };

  const categoryColors = {
    personal: 'bg-purple-100 text-purple-800',
    work: 'bg-blue-100 text-blue-800',
    shopping: 'bg-green-100 text-green-800',
    other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <textarea
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-20 resize-none"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-md"
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`p-1 rounded-md transition-colors ${
                  todo.completed ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <Check size={18} />
              </button>
              <div className="space-y-1 flex-1">
                <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.title}
                </h3>
                {todo.note && (
                  <p className="text-sm text-gray-600">{todo.note}</p>
                )}
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${categoryColors[todo.category as keyof typeof categoryColors]}`}>
                  {todo.category}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <time className="text-xs text-gray-400">
            {new Date(todo.createdAt).toLocaleDateString()}
          </time>
        </div>
      )}
    </div>
  );
}

export function TodoList() {
  const { todos } = useTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      if (categoryFilter === 'all') return true;
      return todo.category === categoryFilter;
    });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 py-8">No tasks found</p>
        )}
      </div>
    </div>
  );
}