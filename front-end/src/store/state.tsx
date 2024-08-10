export type State = {
    newTodoTitle: string;
    activeRequests: number;
    items: Response[];
    deleteConfirmationTarget: number | null;
};