new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                logo: new LOGO.element.build()
            }
        }
    },
    computed: {
        visualizerDuration(){
            return this.element.visualizer.duration
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            COMP.app = new APP.build()

            this.createObject(COMP.app)
        },
        resizeThree(){
            const {app} = COMP

            for(let i in COMP) {
                if(COMP[i].resize === undefined) continue
                COMP[i].resize({app})
            }
        },
        renderThree(){
            const {app, audio} = COMP

            for(let i in COMP) {
                if(COMP[i].animate === undefined) continue
                COMP[i].animate({app, audio})
            }
        },
        createObject(app){
            this.createAudio()
            this.createVisualizer(app)
        },
        createAudio(){
            COMP.audio = new AUDIO.build('assets/src/Roselia - Rokuchou Nen to Ichiya Monogatari.mp3')

            window.addEventListener('click', () => COMP.audio.play(), false)
        },
        createVisualizer(app){
            COMP.visualizer = new VISUALIZER.object.build(app)
        },


        // element
        animateElement(){
            const {audio} = COMP

            this.element.logo.animate({audio})
        },


        // event
        onWindowResize(){
            this.resizeThree()
        },


        // render
        render(){
            this.renderThree()
            this.animateElement()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})