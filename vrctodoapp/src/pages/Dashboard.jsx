import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from '../components/NavBar';

const Dashboard = () => {
    const werkTodo = () => {
        const storedWerkTodos = localStorage.getItem('werktodos');
        return storedWerkTodos ? JSON.parse(storedWerkTodos) : [];
    };

    const persoonlijkTodo = () => {
        const storedPersoonlijkTodos = localStorage.getItem('persoonlijktodos');
        return storedPersoonlijkTodos ? JSON.parse(storedPersoonlijkTodos) : [];
    };

    const vrijeTijdTodo = () => {
        const storedVrijeTijdTodos = localStorage.getItem('vrijetijdtodos');
        return storedVrijeTijdTodos ? JSON.parse(storedVrijeTijdTodos) : [];
    };

    const [inputValue, setInputValue] = useState("");
    const [category, setCategory] = useState("Werk");
    const [werkTodos, setWerkTodos] = useState(werkTodo());
    const [persoonlijkTodos, setPersoonlijkTodos] = useState(persoonlijkTodo());
    const [vrijeTijdTodos, setVrijeTijdTodos] = useState(vrijeTijdTodo());

    useEffect(() => {
        localStorage.setItem('werktodos', JSON.stringify(werkTodos));
        localStorage.setItem('persoonlijktodos', JSON.stringify(persoonlijkTodos));
        localStorage.setItem('vrijetijdtodos', JSON.stringify(vrijeTijdTodos));
    }, [werkTodos, persoonlijkTodos, vrijeTijdTodos]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCheckTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = !updatedTodos[index].done;
        if (category === "Werk") {
            setWerkTodos(updatedTodos);
        } else if (category === "Persoonlijk") {
            setPersoonlijkTodos(updatedTodos);
        } else if (category === "VrijeTijd") {
            setVrijeTijdTodos(updatedTodos);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newTodo = { todoItem: inputValue };

            if (category === "Werk") {
                setWerkTodos([...werkTodos, newTodo]);
            } else if (category === "Persoonlijk") {
                setPersoonlijkTodos([...persoonlijkTodos, newTodo]);
            } else if (category === "VrijeTijd") {
                setVrijeTijdTodos([...vrijeTijdTodos, newTodo]);
            }

            setInputValue(""); 
        }
    };

    const handleRemoveTodo = (index) => {
        if (category === "Werk") {
            const updatedWerkTodos = werkTodos.filter((_, i) => i !== index);
            setWerkTodos(updatedWerkTodos);
        } else if (category === "Persoonlijk") {
            const updatedPersoonlijkTodos = persoonlijkTodos.filter((_, i) => i !== index);
            setPersoonlijkTodos(updatedPersoonlijkTodos);
        } else if (category === "VrijeTijd") {
            const updatedVrijeTijdTodos = vrijeTijdTodos.filter((_, i) => i !== index);
            setVrijeTijdTodos(updatedVrijeTijdTodos);
        }
    };

    const getTodosByCategory = () => {
        if (category === "Werk") return werkTodos;
        if (category === "Persoonlijk") return persoonlijkTodos;
        if (category === "VrijeTijd") return vrijeTijdTodos;
        return [];
    };

    const todos = getTodosByCategory();

    function animateTodoItems() {
        const todoItems = document.querySelectorAll(".todoItem:not(.done)");
        todoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("animate");
            }, index * 100);
        });
    }

    useEffect(() => {
        animateTodoItems();
    }, [todos]);

    return (
        <div>
            <header><NavBar /></header>
            <div className="body">
                <div className="categoryWrapper">
                    <ul className="categoryList">
                        <li onClick={() => setCategory("Werk") && animateTodoItems()}>Werk</li>
                        <li onClick={() => setCategory("Persoonlijk") && animateTodoItems()}>Persoonlijk</li>
                        <li onClick={() => setCategory("VrijeTijd") && animateTodoItems()}>Vrije Tijd</li>
                    </ul>
                </div>

                <div className="todoWrapper">
                    <h3>{category}</h3>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="dropdown"
                    >
                        <option value="Werk">Werk</option>
                        <option value="Persoonlijk">Persoonlijk</option>
                        <option value="VrijeTijd">Vrije Tijd</option>
                    </select>

                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index} className={`todoItem ${todo.done ? 'done' : ''}`}>
                                {todo.todoItem}
                                <div>
                                    <button className="chbutton" onClick={() => handleCheckTodo(index)}>DONE</button>
                                    <button className="rmButton" onClick={() => handleRemoveTodo(index)}>REMOVE</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleFormSubmit} className="commitForm">
                        <input
                            className="inputField"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Voeg een todo toe..."
                        />
                        <button type="submit">COMMIT</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
