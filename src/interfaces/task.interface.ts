export interface ITask {
  owner: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateTaskParams {
  id: string;
}
