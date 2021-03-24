LOGO.element.build = class{
    constructor(){
        this.#create()
    }


    // create
    #create(){
        this.#createPiece()
        this.#createPart()
    }
    #createPiece(){
        this.piece = new LOGO.element.piece.build()
    }
    #createPart(){
        this.part = new LOGO.element.part.build()
    }


    // animate
    animate(param){
        const {audio} = param
        const {buf, max, min, start} = audio

        if(start) return

        this.piece.animate(min)
        this.part.animate(min)
    }
}