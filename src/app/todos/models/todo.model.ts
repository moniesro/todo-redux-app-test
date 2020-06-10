export class Todo {
    public id: number;
    public text: string;
    public isComplete: boolean;

    constructor(texto: string) {
        this.text = texto;

        this.id = Math.random();
        this.isComplete = false;
    }
}
