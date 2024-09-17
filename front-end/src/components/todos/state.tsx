import { type } from "os";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

type State = {
    todos: Todo[];
    newTodo: string;
};

const initialState: State = {
    todos: [],
    newTodo: ''
};

enum ActionTypes {
    AddTodos = 'addTodos',
    AddTodo = 'addTodo',
    ChangeNewTodo = 'changeNewTodo',
    ToggleTodo = 'toggleTodo'
};

type AddTodoAction = { type: ActionTypes.AddTodo, payload: Todo };

type ChangeNewTodoAction = { type: ActionTypes.ChangeNewTodo, payload: string };

type AddTodosAction = { type: ActionTypes.AddTodos, payload: Todo[] };

type ToggleTodo = { type: ActionTypes.ToggleTodo, payload: number };

type Action =
    | AddTodosAction
    | AddTodoAction
    | ChangeNewTodoAction
    | ToggleTodo;

const addTodos = (payload: Todo[]): AddTodosAction => ({ type: ActionTypes.AddTodos, payload });

const addTodo = (payload: Todo): AddTodoAction => ({ type: ActionTypes.AddTodo, payload });

const changeNewTodo = (payload: string): ChangeNewTodoAction => ({ type: ActionTypes.ChangeNewTodo, payload });

const toggleTodo = (id: number): Action => ({ type: ActionTypes.ToggleTodo, payload: id });

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.AddTodos:
            return { ...state, todos: action.payload };
        case ActionTypes.AddTodo:
            return {
                ...state,
                newTodo: '',
                todos: [action.payload, ...state.todos]
            };
        case ActionTypes.ChangeNewTodo:
            return { ...state, newTodo: action.payload };
        case ActionTypes.ToggleTodo:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload) return todo;
                    return { ...todo, completed: !todo.completed };
                })
            };
        default:
            return state;
    }
};

export { reducer, initialState, addTodos, addTodo, changeNewTodo, toggleTodo };
export type { Todo, State };