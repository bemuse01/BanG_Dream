LOGO.element.piece.build = class{
    constructor(){
        this.#init()
        this.#create()
    }


    // init
    #init(){
        this.param = new LOGO.element.piece.param()
    }


    // create
    #create(){
        this.el = []

        const height = 100 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const top = height * i
            const bottom = 90 - height * i

            this.el[i] = {
                key: i,
                style: {
                    clipPath: `inset(${top}% 0px ${bottom}% 0px)`
                }
            }
        }
    }


    // get
    get(){
        return this.el
    }
}