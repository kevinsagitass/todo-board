import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => ({
    lists: [
      {
        id: 1,
        title: 'Todo',
        items: [
          {
            id: 1,
            name: 'Walk the Dog',
            status: 'todo',
            dueDate: '31-Aug-2022',
            priority: 2,
          },
          {
            id: 3,
            name: 'Create a Website',
            status: 'todo',
            dueDate: '1-Sep-2023',
            priority: 3,
          },
        ],
      },
      {
        id: 2,
        title: 'In Progress',
        items: [
          {
            id: 2,
            name: 'Buy Groceries',
            status: 'inProgress',
            dueDate: '30-Aug-2022',
            priority: 1,
          },
        ],
      },
      {
        id: 4,
        title: 'Complete',
        items: [
          {
            id: 5,
            name: 'Meditate',
            status: 'done',
            dueDate: '30-Aug-2022',
            priority: 2,
          },
        ],
      },
      {
        id: 3,
        title: 'Canceled',
        items: [
          {
            id: 4,
            name: 'Get a Haircut',
            status: 'canceled',
            dueDate: '31-Aug-2022',
            priority: 3,
          },
        ],
      },
    ],
    todoId: 6
  }),
  actions: {
    getLists() {
      return this.lists;
    },
  },
});
