const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')

if(!gl){
    throw new Error('WebGL Not Supported')
}

// Create vertex data
const vertexData = [
    0, 1, 0,
    1, -1, 0,
    -1, -1, 0
]

// Create a buffer on the GPU
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

// Load vertex data into the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

// Create a vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, `
attribute vec3 position;
void main(){
    gl_Position = vec4(position, 1);
}`)
gl.compileShader(vertexShader)

// Create a fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `
void main(){
    gl_FragColor = vec4(1, 0, 0, 1);
}`)
gl.compileShader(fragmentShader)

// Create a program
const program = gl.createProgram()

// Attach shaders to program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// Link the program
gl.linkProgram(program)

// Enable vertex attributes
const positionLocation = gl.getAttribLocation(program, `position`)
gl.enableVertexAttribArray(positionLocation)
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

// Draw
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 3)