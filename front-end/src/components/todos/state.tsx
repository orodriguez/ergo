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
    ChangeNewTodo = 'changeNewTodo'
};

type AddTodoAction = { type: ActionTypes.AddTodo, payload: Todo };

type ChangeNewTodoAction = { type: ActionTypes.ChangeNewTodo, payload: string };

type AddTodosAction = { type: ActionTypes.AddTodos, payload: Todo[] };

type Action =
    | AddTodosAction
    | AddTodoAction
    | ChangeNewTodoAction;

const addTodos = (payload: Todo[]): AddTodosAction => ({ type: ActionTypes.AddTodos, payload });

const addTodo = (payload: Todo): AddTodoAction => ({ type: ActionTypes.AddTodo, payload });

const changeNewTodo = (payload: string): ChangeNewTodoAction => ({ type: ActionTypes.ChangeNewTodo, payload });

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
        default:
            return state;
    }
};

export { reducer, initialState, addTodos, addTodo, changeNewTodo }
export type { Todo, State };