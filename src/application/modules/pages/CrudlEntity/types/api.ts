export type IBaseEntityApiUrls = Record<string, string>;

export interface IBaseEntityApiMethods
  extends Record<string, (...args: any[]) => any> {
  create: AbstractGetFunction;
  read: AbstractGetFunction;
  update: AbstractGetFunction;
  delete: AbstractGetFunction;
  list: AbstractGetFunction;
}

export type AbstractGetFunction = () => void;

export type IBaseEntityApiHost = string;
