VISUALIZER.object.line.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }


    // init
    #init(){
        this.param = new VISUALIZER.object.line.param()
    }


    // add
    #add(group){
        group.add(this.mesh)
    }


    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        this.mesh = new THREE.Line2(geometry, material)
        // this.mesh.computeLineDistances()
        this.mesh.rotation.z = 90 * RADIAN
        this.mesh.layers.set(this.param.layers)
    }
    #createGeometry(){
        const geometry = new THREE.LineGeometry()

        this.position = []
        const degree = 360 / this.param.seg

        for(let i = 0; i < this.param.seg; i++){
            const deg = degree * i
            let x = Math.cos(deg * RADIAN) * this.param.radius
            let y = Math.sin(deg * RADIAN) * this.param.radius

            this.position.push(x, y, 0)

            if(i === this.param.seg - 1){
                x = Math.cos(0 * RADIAN) * this.param.radius
                y = Math.sin(0 * RADIAN) * this.param.radius

                this.position.push(x, y, 0)
            }
        }

        geometry.setPositions(this.position)

        return geometry
    }
    #createMaterial(){
        return new THREE.LineMaterial({
            color: 0xffffff,
            vertexColors: false,
            linewidth: 0.005,
            dashed: false
        })
    }


    // animate
    animate(buf){
        const geometry = this.mesh.geometry
        const degree = 360 / this.param.seg

        for(let i = 0; i < this.position.length / 3; i++){
            if(i === this.position.length / 3 - 1){
                let radius = this.param.radius + buf[0] * 30
                let x = Math.cos(0 * RADIAN) * radius
                let y = Math.sin(0 * RADIAN) * radius

                this.position[i * 3] = x
                this.position[i * 3 + 1] = y
                this.position[i * 3 + 2] = 0
            }else{
                const deg = degree * i
                let radius = this.param.radius + (i % 2 === 0 ? buf[i] * 30 : buf[i] * -30)
                let x = Math.cos(deg * RADIAN) * radius
                let y = Math.sin(deg * RADIAN) * radius
    
                this.position[i * 3] = x
                this.position[i * 3 + 1] = y
                this.position[i * 3 + 2] = 0
            }
        }

        geometry.setPositions(this.position)
    }
}