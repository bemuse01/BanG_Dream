VISUALIZER.object.line.method = {
    createPosition(param){
        const position = []
        const degree = 360 / param.seg

        for(let i = 0; i < param.seg; i++){
            const deg = degree * i
            let x = Math.cos(deg * RADIAN) * param.radius
            let y = Math.sin(deg * RADIAN) * param.radius

            position.push(x, y, 0)

            if(i === param.seg - 1){
                x = Math.cos(0 * RADIAN) * param.radius
                y = Math.sin(0 * RADIAN) * param.radius

                position.push(x, y, 0)
            }
        }

        return position
    },
    createColor(param){
        const color = []
        const solid = param.solid
        const step = param.step

        for(let i = 0; i < param.seg; i++){
            const index = i % (param.seg / 2)

            const s = i < param.seg / 2 ? solid.top + step * index : solid.bottom - step * index
            let c = new THREE.Color(`hsl(${s}, 100%, 70%)`)

            color.push(c.r, c.g, c.b)

            if(i === param.seg - 1){
                c = new THREE.Color(`hsl(${param.solid.top}, 100%, 70%)`)
                color.push(c.r, c.g, c.b)
            }
        }

        return color
    }
}