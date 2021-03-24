VISUALIZER.object.line.param = class{
    constructor(param = {}){
        this.seg = param.seg || 128
        this.radius = param.radius || 350
        this.layers = param.layers || PROCESS
        this.rd = param.rd || 30
        this.solid = param.solid || {
            top: 160,
            bottom: 290
        }
        this.step = param.step || 2
        this.linewidth = param.linewidth || 0.005
        this.opacity = param.opacity || 1.0
    }
}