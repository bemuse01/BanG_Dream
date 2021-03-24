VISUALIZER.object.particle.param = class{
    constructor(param = {}){
        this.width = param.width || 30
        this.height = param.height || 28
        this.seg = param.seg || 128
        this.radius = param.radius || 350
        this.layers = param.layers || PROCESS
        this.count = param.count || 60
        this.opacity = param.opacity || 1.0
    }
}