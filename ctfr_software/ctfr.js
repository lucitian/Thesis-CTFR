var python_process
var {PythonShell} = require('python-shell')

function get_ctfr() {
    var pyshell = new PythonShell('./py_backend/camera.py')

    pyshell.end(function(err) {
        if (err) {
            console.log(err)
        }
    })
    python_process = pyshell.childProcess
    console.log('started')
    
}

function close_ctfr() {
    python_process.kill('SIGINT')
    console.log('stopped')
}