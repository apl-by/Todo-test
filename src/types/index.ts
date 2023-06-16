export type TTodo = {
  id: string;
  text: string;
  isDone: boolean;
};

export type TTodoList = Array<TTodo>;

export type TFilters = 'all' | 'active' | 'completed';
