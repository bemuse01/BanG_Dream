VISUALIZER.object.particle.build = class{
    constructor(group){
        this.init()
        this.create()
        this.add(group)
        this.createTween()
    }


    // init
    init(){
        this.param = new VISUALIZER.object.particle.param()
    }


    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        for(let i = 0; i < this.param.count; i++){
            const mesh = this.createMesh()

            const deg = Math.random() * 360
            const x = Math.cos(deg * RADIAN) * this.param.radius
            const y = Math.sin(deg * RADIAN) * this.param.radius

            mesh.position.set(x, y, 0)
            mesh.deg = deg
            mesh.layers.set(this.param.layers)
        
            this.local.add(mesh)
        }
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        return new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.PlaneGeometry(this.param.width, this.param.height)
    }
    createMaterial(){
        const src = Math.random() > 0.5 ? 'particle_red.png' : 'particle_green.png'
        const texture = new THREE.TextureLoader().load(`assets/src/${src}`)

        return new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0xffffff,
            opacity: 0,
            map: texture
        })
    }


    // tween
    createTween(){
        for(let i = 0; i < this.param.count; i++){
            const start = {
                opacity: 0,
                radius: this.param.radius
            }
            const end = {
                opacity: [0, 0.25, 0.5, 1, 1, 0.5, 0],
                radius: this.param.radius + 200
            }

            const tw = new TWEEN.Tween(start)
            .to(end, 2000)
            .onUpdate(() => this.updateTween(i, start))
            .delay(i * 100)
            .repeat(Infinity)
            .start()
        }
    }
    updateTween(i, start){
        const mesh = this.local.children[i]

        const x = Math.cos(mesh.deg * RADIAN) * start.radius
        const y = Math.sin(mesh.deg * RADIAN) * start.radius

        mesh.material.opacity = start.opacity
        mesh.position.set(x, y, 0)
    }


    // animate
    animate(){
        this.local.children.forEach((e, i) => {
            e.rotation.z += i % 2 === 0 ? 0.01 : -0.01
        })
    }
}