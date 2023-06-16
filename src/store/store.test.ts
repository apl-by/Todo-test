import { todosTemplate } from '../utils/data';
import { Store } from './store';

const store = new Store(todosTemplate);

describe('testing storage methods', () => {
  it('should return the initial todoList', () => {
    expect(store.todoList).toEqual(todosTemplate);
  });

  it('should add a new task to the beginning of todo', () => {
    const text = 'Test todo';
    const length = store.todoList.length;

    store.addTodo(text);
    expect(store.todoList.length).toBe(length + 1);
    expect(store.todoList[0].text).toBe(text);
    expect(store.todoList[0].isDone).toBe(false);
    expect(typeof store.todoList[0].id).toBe('string');
  });

  it('should delete the third task of the todoList', () => {
    const length = store.todoList.length;
    const thirdTodo = store.todoList[2];
    store.deleteTodo(thirdTodo.id);

    expect(store.todoList.length).toBe(length - 1);
    expect(store.todoList).not.toContain(thirdTodo);
  });

  it('should change the status of the first todo in the todoList', () => {
    const currStatus = store.todoList[0].isDone;

    store.changeTodoStatus(store.todoList[0].id);
    expect(store.todoList[0].isDone).toBe(!currStatus);

    const newCurrStatus = store.todoList[0].isDone;

    store.changeTodoStatus(store.todoList[0].id, !newCurrStatus);
    expect(store.todoList[0].isDone).toBe(!newCurrStatus);
  });

  it('should check filtering', () => {
    const allTodos = store.todoList;
    const activeTodos = store.todoList.filter((i) => i.isDone === false);
    const completedTodos = store.todoList.filter((i) => i.isDone === true);

    store.setCurrentFilter('all');
    expect(store.currentFilter).toBe('all');
    expect(store.itemsList).toEqual(allTodos);

    store.setCurrentFilter('active');
    expect(store.currentFilter).toBe('active');
    expect(store.itemsList).toEqual(activeTodos);

    store.setCurrentFilter('completed');
    expect(store.currentFilter).toBe('completed');
    expect(store.itemsList).toEqual(completedTodos);
  });

  it('should check the change of all checkbox statuses', () => {
    store.setCurrentFilter('all');
    expect(store.currentFilter).toBe('all');

    // установить половину todo в active, другую в completed
    const halfLength = Math.ceil(store.todoList.length / 2);
    store.todoList.forEach((i, ind) => {
      if (ind < halfLength) {
        i.isDone = false;
        return;
      }
      i.isDone = true;
    });

    const checkboxIndeterminate = {
      checked: false,
      indeterminate: true,
    };
    const checkboxChecked = {
      checked: true,
      indeterminate: false,
    };
    const checkboxNotChecked = {
      checked: false,
      indeterminate: false,
    };

    expect(store.checkboxState).toEqual(checkboxIndeterminate);

    store.changeAllStatuses();

    expect(store.checkboxState).toEqual(checkboxChecked);

    store.changeAllStatuses();

    expect(store.checkboxState).toEqual(checkboxNotChecked);
  });

  it('should check the deletion of all completed todos', () => {
    store.setCurrentFilter('all');
    expect(store.currentFilter).toBe('all');

    // установить половину todo в active, другую в completed
    const halfLength = Math.ceil(store.todoList.length / 2);
    store.todoList.forEach((i, ind) => {
      if (ind < halfLength) {
        i.isDone = false;
        return;
      }
      i.isDone = true;
    });

    const completedTodos = store.todoList.filter((i) => i.isDone === true);

    store.clearCompleted();

    expect(store.todoList).toEqual(expect.not.arrayContaining(completedTodos));
  });
});
