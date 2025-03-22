import React, { useState } from 'react';

// Интерфейс для задачи
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Компонент TodoList
const TodoList: React.FC = () => {
    // Состояние для хранения списка задач
    const [todos, setTodos] = useState<Todo[]>([]);
    // Состояние для новой задачи
    const [newTodo, setNewTodo] = useState<string>('');

    // Функция для добавления новой задачи
    const addTodo = () => {
        if (newTodo.trim() === '') return; // Не добавляем пустую задачу
        const todo: Todo = {
            id: Date.now(), // Используем timestamp как уникальный ID
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, todo]); // Добавляем задачу в список
        setNewTodo(''); // Очищаем поле ввода
    };

    // Функция для отметки задачи как выполненной
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Функция для удаления задачи
    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <h1>ToDo List</h1>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Добавьте новую задачу"
                />
                <button onClick={addTodo}>Добавить</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                        >
              {todo.text}
            </span>
                        <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;