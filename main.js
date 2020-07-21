const tf = require('@tensorflow/tfjs-node-gpu');
const { mainModule } = require('process');

// Define a model for linear regression.
const model = tf.sequential();
//input layer is 10 bits of binary to represent our fizzbuzz input (up to 1024)
model.add(tf.layers.dense({ units: 50, activation: 'relu', inputShape: [12] }));
model.add(tf.layers.dense({ units: 4, activation: 'relu', inputShape: [50] }));

model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' });

function toBinary(decimal,characters) {
    let b2string = decimal.toString(2).padStart(characters, "0")
    let out = []
    for (i of b2string) {80
        out.push(parseInt(i))
    }
    return out
}

function generateTrainingData(startIndex,finishIndex) {
    let arr_in = []
    let arr_out = []
    for (let i = startIndex; i < finishIndex; i++) {
        arr_in.push(toBinary(i,12))

        new_out_arr = [0, 0, 0, 0]
        if (i % 5 == 0 && i % 3 == 0) {
            new_out_arr[3] = 1
        } else {
            if (i % 3 == 0) {
                new_out_arr[1] = 1
            } else if (i % 5 == 0) {
                new_out_arr[2] = 1
            } else {
                new_out_arr[0] = 1
            }
        }
        arr_out.push(new_out_arr)
    }
    return { inData: arr_in, outData: arr_out }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function train() {
    var { inData, outData } = generateTrainingData(101,4000)
    let training_data = tf.tensor2d(inData);
    let target_data = tf.tensor2d(outData);
    var h = await model.fit(training_data, target_data, { epochs: 500 });
    console.log("Loss after Epoch " + i + " : " + h.history.loss[0]);

    var { inData ,outData} = generateTrainingData(1,100)
    let test_data = tf.tensor2d(inData);
    let prediction = model.predict(test_data).arraySync()
    let correct = 0
    prediction.forEach((output, index) => {
        var xindex = indexOfMax(output)
        var outText = ""
        if (xindex == 0) {
            outText = `${index + 1}`
        } else if (xindex == 1) {
            outText = "fizz" 
        } else if (xindex == 2) {
            outText = "buzz"
        } else if (xindex == 3) {
            outText = "fizzbuzz"
        }
        if(xindex == indexOfMax(outData[index])){
            outText += "(correct)"
            correct++
        }
        console.log(outText)
    })
    console.log(`${correct} correct / 100`)
}

train()