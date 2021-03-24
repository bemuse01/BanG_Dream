LOGO.element.build = class{
    constructor(){
        this.#create()
    }


    // create
    #create(){
        this.#createPiece()
    }
    #createPiece(){
        this.piece = new LOGO.element.piece.build()
    }
}