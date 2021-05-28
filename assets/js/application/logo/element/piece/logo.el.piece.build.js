LOGO.element.piece.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.param = new LOGO.element.piece.param()
        this.fre = []
        this.index = 0

        for(let i = 0; i < 60; i++) this.fre[i] = Math.random() * 6
        this.fre = windowing.kaiser(this.fre, 3.0)
    }


    // create
    create(){
        this.el = []

        const height = 100 / this.param.count
        const gap = 100 - height

        for(let i = 0; i < this.param.count; i++){
            const top = height * i - 0.25
            const bottom = gap - height * i

            this.el[i] = {
                key: i,
                style: {
                    clipPath: `inset(${top}% 0px ${bottom}% 0px)`,
                    transform: 'translate(0, 0)'
                }
            }
        }
    }


    // animate
    animate(min){
        const time = window.performance.now()

        const fre = this.fre[this.index]
        this.index = (this.index + 1) % this.fre.length

        this.el.forEach((e, i) => {
            const rd = min * 0.2
            const x = SIMPLEX.noise2D(i, time * 0.01) * rd * fre
            const y = SIMPLEX.noise2D(i, time * 0.005) * rd * fre * 0.5
            e.style.transform = `translate(${x}%, ${y}%)`
        })
    }


    // get
    get(){
        return this.el
    }
}