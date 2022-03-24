const express = require('express')
const app = express()
const arguments = require('minimist')(process.argv.slice(2))


var port = arguments.port || process.env.port || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}


function coinFlips(flips) {
    const arr = []
    for (let i = 0; i < flips; i++) {
        arr[i] = Math.floor(Math.random() * 2) == 0 ? 'heads' : 'tails'
    }
    return arr;
}

function countFlips(array) {
    var count = {
        tails: 0,
        heads: 0
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 'heads') {
            count.heads = count.heads + 1
        }
        else {
            count.tails = count.tails + 1
        }
    }
    return count
}

function flipACoin(call) {
    var count = {
        call: call,
        flip: coinFlip(call),
        result: ''
    }
    if (count.call == count.flip) {
        count.result = 'win'
    }
    else {
        count.result = 'lose'
    }
    return count
}




app.get('/app/flip/', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip': flip })
})

app.get('/app/flips:number', (req, res) => {
    const endFlips = coinFlips(req.params.number)
    res.status(200).json({ 'raw': finalFlips, 'summary': countFlips(finalFlips) })
})


app.get('/app/flip/call/heads', (req, res) => {
    const randomFlip = flipACoin("heads")
    res.status(200).json({ "call": randomFlip.call, "flip": randomFLip.flip, "result": flipRandomCoin.result })
})

app.get('/app/flip/call/tails', (req, res) => {
    const randomFlip = flipACoin("heads")
    res.status(200).json({ "call": randomFlip.call, "flip": randomFLip.flip, "result": flipRandomCoin.result })
})




// Default response for any other request
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});