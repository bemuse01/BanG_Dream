LOGO.element.part.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.param = new LOGO.element.part.param()
        this.fre = []
        this.index = 0

        for(let i = 0; i < 60; i++) this.fre[i] = Math.random() * 6
        this.fre = windowing.kaiser(this.fre, 3.0)
    }


    // create
    create(){
        this.el = []

        for(let i = 0; i < this.param.count; i++){
            this.el[i] = {
                key: i,
                src: i === 0 ? 'assets/src/logo_red.png' : 'assets/src/logo_green.png',
                style: {
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
            const y = SIMPLEX.noise2D(i, time * 0.005) * rd * fre
            e.style.transform = `translate(${x}%, ${y}%)`
        })
    }


    // get
    get(){
        return this.el
    }
}