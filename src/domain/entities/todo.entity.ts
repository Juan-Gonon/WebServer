export class TodoEntity {
  constructor (public id: number, public text: string, public completedAt?: Date | null) {

  }

  // eslint-disable-next-line @typescript-eslint/space-before-blocks
  get isCompleted (): boolean{
    return !(this.completedAt == null)
  }
}
