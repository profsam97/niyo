export interface ITask {
  owner: number;
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateTaskParams {
  id: string;
}

export interface GetTaskI {
  taskId: string;
}
