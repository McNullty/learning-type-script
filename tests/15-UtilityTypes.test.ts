describe('Examples for Utility types', () => {

    it('Partial type', () => {
        interface Todo {
            title: string;
            description: string;
        }

        function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
            return { ...todo, ...fieldsToUpdate };
        }

        const todo1 = {
            title: 'organize desk',
            description: 'clear clutter',
        };

        const todo2 = updateTodo(todo1, {
            description: 'throw out trash',
        })

        expect(todo2).toStrictEqual({
            title: 'organize desk',
            description: 'throw out trash',});
    });

    it('Readonly type', () => {
        interface Todo {
            title: string;
        }

        const todo: Readonly<Todo> = {
            title: 'Delete inactive users',
        };

        // todo.title = 'Hello'; // Error: cannot reassign a readonly property
    });

    it('Record type', () => {
        interface PageInfo {
            title: string;
        }

        type Page = 'home' | 'about' | 'contact';

        const x: Record<Page, PageInfo> = {
            about: { title: 'about' },
            contact: { title: 'contact' },
            home: { title: 'home' },
        };

        expect(x).not.toBeNull();
    });

    it('Pick type', () => {
        interface Todo {
            title: string;
            description: string;
            completed: boolean;
        }

        const todo0: Todo = {
            title: 'Clean room',
            completed: false,
            description: 'Task',
        };

        type TodoPreview = Pick<Todo, 'title' | 'completed'>;

        const todo: TodoPreview = {
            title: 'Clean room',
            completed: false,
        };

        expect(todo).not.toBeNull();

        const todo2:TodoPreview = todo0;

        // description is not available
        // expect(todo2.description).not.toBeNull();

        // No conversion from TodoPreview to Todo
        // const todo3: Todo = todo2
    });

    it('Omit type', () => {
        interface Todo {
            title: string;
            description: string;
            completed: boolean;
        }

        const todo0: Todo = {
            title: 'Clean room',
            completed: false,
            description: 'Task',
        };


        type TodoPreview = Omit<Todo, 'description'>;

        const todo: TodoPreview = {
            title: 'Clean room',
            completed: false,
        };

        expect(todo).not.toBeNull();

        const todo2:TodoPreview = todo0;

        // description is not available
        // expect(todo2.description).not.toBeNull();

        // No conversion from TodoPreview to Todo
        // const todo3: Todo = todo2
    });

})