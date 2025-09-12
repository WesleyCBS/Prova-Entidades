export class ConsoleVideogame {
    private _id: number;
    private _nome: string;
    private _marca: string;
    private _anoLancamento: Date;
    private _armazenamento: string;
    private _voltagem: string;

    constructor(
        nome: string, 
        marca: string, 
        anoLancamento: Date, 
        armazenamento: string, 
        voltagem: string
    ) {
        this._id = new Date().getTime();
        this._nome = nome;
        this._marca = marca;
        this._anoLancamento = anoLancamento;
        this._armazenamento = armazenamento;
        this._voltagem = voltagem;
    }

    public get id(): number {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get marca(): string {
        return this._marca;
    }
    public set marca(value: string) {
        this._marca = value;
    }

    public get anoLancamento(): Date {
        return this._anoLancamento;
    }
    public set anoLancamento(value: Date) {
        this._anoLancamento = value;
    }

    public get armazenamento(): string {
        return this._armazenamento;
    }
    public set armazenamento(value: string) {
        this._armazenamento = value;
    }

    public get voltagem(): string {
        return this._voltagem;
    }
    public set voltagem(value: string) {
        this._voltagem = value;
    }
}


