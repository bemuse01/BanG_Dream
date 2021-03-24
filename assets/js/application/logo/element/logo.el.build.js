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


    // animate
    animate(param){
        const {audio} = param
        const {buf, max, min, start} = audio

        if(start) return

        this.piece.animate(min)
    }
}