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
    AddTodo = 'addTodo',
    ChangeNewTodo = 'changeNewTodo'
};

type AddTodoAction = { type: ActionTypes.AddTodo, payload: Todo };

type ChangeNewTodoAction = { type: ActionTypes.ChangeNewTodo, payload: string };

type Action =
    | AddTodoAction
    | ChangeNewTodoAction;

const addTodo = (payload: Todo): AddTodoAction => ({ type: ActionTypes.AddTodo, payload });

const changeNewTodo = (payload: string): ChangeNewTodoAction => ({ type: ActionTypes.ChangeNewTodo, payload });

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                newTodo: '',
                todos: [action.payload, ...state.todos]
            };
        case 'changeNewTodo':
            return { ...state, newTodo: action.payload };
        default:
            return state;
    }
};

export { reducer, initialState, addTodo, changeNewTodo }
export type { Todo, State };