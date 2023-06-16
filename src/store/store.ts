import { makeAutoObservable } from 'mobx';
import { TTodo, TTodoList, TFilters } from '../types';
import { generateId } from '../utils/utils';
import { todosTemplate } from '../utils/data';

export class Store {
  todoList: TTodoList;
  currentFilter: TFilters = 'all';

  constructor(initTodoList?: TTodoList) {
    makeAutoObservable(this);
    this.todoList = initTodoList ?? [];
  }

  get itemsList() {
    if (this.currentFilter === 'active') {
      return this.todoList.filter((i) => i.isDone === false);
    }
    if (this.currentFilter === 'completed') {
      return this.todoList.filter((i) => i.isDone === true);
    }
    return this.todoList;
  }

  get itemsLeft() {
    const filteredArr = this.todoList.filter((i) => i.isDone === false);
    return filteredArr.length;
  }

  get checkboxState() {
    const arr = this.itemsList;
    let done = 0;
    let notDone = 0;
    for (let i = 0; i < arr.length; i++) {
      if (done > 0 && notDone > 0) break;
      arr[i].isDone ? done++ : notDone++;
    }

    return {
      checked: notDone === 0 && done > 0,
      indeterminate: done > 0 && notDone > 0,
    };
  }

  setCurrentFilter = (value: TFilters) => {
    this.currentFilter = value;
  };

  clearCompleted = () => {
    const filteredArr = this.todoList.filter((i) => i.isDone === false);
    this.todoList = filteredArr;
  };

  changeAllStatuses = () => {
    const arr = this.itemsList;
    const state = this.checkboxState;
    if (state.indeterminate) {
      arr.forEach((i) => {
        this.changeTodoStatus(i.id, true);
      });
    }
    if (state.checked) {
      arr.forEach((i) => {
        this.changeTodoStatus(i.id, false);
      });
    }
    if (!state.checked) {
      arr.forEach((i) => {
        this.changeTodoStatus(i.id, true);
      });
    }
  };

  addTodo = (todoText: string) => {
    const todo: TTodo = { id: generateId(), text: todoText, isDone: false };
    this.todoList = [todo, ...this.todoList];
  };

  deleteTodo = (id: string) => {
    const ind = this.todoList.findIndex((i) => i.id === id);
    this.todoList.splice(ind, 1);
  };

  changeTodoStatus = (id: string, value?: boolean) => {
    const ind = this.todoList.findIndex((i) => i.id === id);
    const todo = this.todoList[ind];
    this.todoList.splice(ind, 1, { ...todo, isDone: value ?? !todo.isDone });
  };
}

const store = new Store(todosTemplate);
export default store;
