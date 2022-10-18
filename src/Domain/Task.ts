export class Task {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public responsable: string,
    public dueDate: Date,
    public registredDay: Date,
    public done: boolean
  ) {}
}
