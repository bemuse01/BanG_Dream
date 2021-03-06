VISUALIZER.object.build = class{
    constructor(app){
        this.init(app)
        this.create()
        this.add()
    }


    // init
    init(app){
        this.param = new VISUALIZER.object.param()

        this.initGroup()
        this.initRenderObject()
        this.initComposer(app)
    }
    initGroup(){
        this.group = {
            line: new THREE.Group(),
            particle: new THREE.Group()
        }

        this.build = new THREE.Group
    }
    initRenderObject(){
        this.element = document.querySelector('.visualizer-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
    }
    initComposer(app){
        this.bloom = this.param.bloom

        const {right, left, bottom, top} = this.element.getBoundingClientRect()
        const width = right - left
        const height = bottom - top
        
        this.composer = new THREE.EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderPass = new THREE.RenderPass(this.scene, this.camera)

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(this.bloom)

        this.fxaa = new THREE.ShaderPass(THREE.FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        this.composer.addPass(renderPass)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
    }


    // add
    add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    create(){
        this.createLine()
        this.createParticle()
    }
    createLine(){
        this.line = new VISUALIZER.object.line.build(this.group.line)
    }
    createParticle(){
        this.particle = new VISUALIZER.object.particle.build(this.group.particle)
    }


    // animate
    animate(param){
        const {app, audio} = param

        this.render(app)
        this.animateObject(audio)
    }
    render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setViewport(left, bottom, width, height)
        app.renderer.setScissor(left, bottom, width, height)

        // this.camera.lookAt(this.scene.position)
        // app.renderer.render(this.scene, this.camera)

        app.renderer.autoClear = false
        app.renderer.clear()

        this.camera.layers.set(PROCESS)
        this.composer.render()

        app.renderer.clearDepth()
        this.camera.layers.set(NORMAL)
        app.renderer.render(this.scene, this.camera)
    }
    animateObject(aud){
        const {buf, min, max, audio, start} = aud

        this.particle.animate()

        if(start) return

        this.line.animate(buf)
    }


    // resize
    resize(param){
        const {app} = param
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        this.composer.setSize(app.width, app.height)
    }
}