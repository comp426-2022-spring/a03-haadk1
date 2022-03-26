const express = require('express')
const app = express()
const arguments = require('minimist')(process.argv.slice(2))
arguments["port"]


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
    let flipCount = flips;
    const flipResults = new Array();
    while(flipCount>0) {
      flipResults.push(coinFlip());
      flipCount--;
    }
    return flipResults;
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
    const correct = coinFlip();
    if(correct == call) {
      return {'call': call, 'flip': correct, 'result': 'win'};
    } else {
      return {'call': call, 'flip': correct, 'result': 'lose'};
    }
}




app.get('/app/flip/', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ "flip": flip })
})

app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number)
    var count = countFlips(flips)
    res.status(200).json( {'raw': flips, 'summary':count})
})


app.get('/app/flip/call/heads', (req, res) => {
    const result = flipACoin('heads');
    res.status(200).json({
        result
    })
});

app.get('/app/flip/call/tails', (req, res) => {
    const result = flipACoin('tails');
    res.status(200).json({
        result
    })
});





// Default response for any other request.
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});
