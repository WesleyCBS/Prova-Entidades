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
  
    get id(): number {
      return this._id;
    }
  
    get nome(): string {
      return this._nome;
    }
    set nome(value: string) {
      this._nome = value;
    }
  
    get marca(): string {
      return this._marca;
    }
    set marca(value: string) {
      this._marca = value;
    }
  
    get anoLancamento(): Date {
      return this._anoLancamento;
    }
    set anoLancamento(value: Date) {
      this._anoLancamento = value;
    }
  
    get armazenamento(): string {
      return this._armazenamento;
    }
    set armazenamento(value: string) {
      this._armazenamento = value;
    }
  
    get voltagem(): string {
      return this._voltagem;
    }
    set voltagem(value: string) {
      this._voltagem = value;
    }
  }
  



