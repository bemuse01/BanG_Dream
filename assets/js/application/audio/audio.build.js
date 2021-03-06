AUDIO.build = class{
    constructor(src = ''){
        this.init(src)
        this.create()
    }


    // init 
    init(src){
        this.src = src
        this.start = true
        this.param = new AUDIO.param()
        this.buf = []
    }


    // create
    create(){
        this.createAudio()
    }
    createAudio(){
        this.audio = new Audio()
        this.audio.loop = true
        this.audio.src = this.src
        this.audio.volume = 0.5
    }
    createContext(){
        this.context = new AudioContext()
        
		const source = this.context.createMediaElementSource(this.audio)
        
        this.analyser = this.context.createAnalyser()
		source.connect(this.analyser)
		this.analyser.connect(this.context.destination)
		this.analyser.fftSize = this.param.fft
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // animate
    animate(){
        if(this.start) return

        this.analyser.getByteFrequencyData(this.audioData)

        const start = Math.floor(1 / this.param.fps * this.context.sampleRate)
        const sample = [...this.audioData.slice(start)]

        this.buf = windowing.kaiser(sample, 1.6).slice(0, this.param.display)

        const {median, min, max} = AUDIO.method.median(this.buf)

        for(let i = 0; i < this.buf.length; i++){
            this.buf[i] = Math.max(0, this.buf[i] - median)
        }

        const half = this.buf.slice(this.buf.length / 2, this.buf.length)

        this.buf = [...half, ...half]

        this.min = min
        this.max = max
    }


    // event
    play(){
        if(this.start){
            this.createContext()
            this.audio.play()
            this.context.resume()
            this.start = false
        }
    }
}