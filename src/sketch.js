let numOfPillars = 900;
let pillars = [];
let states = [];

document.getElementById("quickSortBtn").addEventListener('click', function () {
    quickSort(pillars, 0, pillars.length - 1);
});
document.getElementById("bubbleSortBtn").addEventListener('click', function () {
    bubbleSort(pillars);
});
document.getElementById("randomizeBtn").addEventListener('click', function () {
    randomize(pillars);
});
document.getElementById("mergeSortBtn").addEventListener('click', function () {
    mergeSort(pillars);
});

function setup() {
    createCanvas(1920, 800);

    drawPillars(pillars);
    randomize(pillars);

}

function mergeSort(pillars) {

}

async function bubbleSort(pillars) {
    for (let i = 0; i < pillars.length; i++) {
        for (let j = 0; j < pillars.length - 1 - i; j++) {
            pillars[j].color = [255, 0, 0];
            pillars[j + 1].color = [0, 255, 0];
            if (pillars[j].h < pillars[j+1].h) {
                await Pillar.swap(pillars[j], pillars[j + 1]);
            }
            pillars[j].color = 255;
            pillars[j + 1].color = 255;
        }
    }
}

async function quickSort(arr, start, end) {
    if (start >= end) return;

    let index = await partition(arr, start, end);
    states[index] = -1;
    await Promise.all([quickSort(arr, start, index - 1), quickSort(arr, index + 1, end)]);
}

async function partition(arr, start, end) {

    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotIndex = start;
    let pivotValue = arr[end];
    states[start] = 2;
    states[end] = 2;
    states[pivotIndex] = 0;

    for (let i = start; i < end; i++) {
        if (arr[i].h > pivotValue.h) {
            await Pillar.swap(arr[i], arr[pivotIndex]);
            pivotIndex++;
        }
    }

    await Pillar.swap(arr[pivotIndex], arr[end]);
    
    for (let i = start; i < end; i++) {
        if (i != pivotIndex) states[i] = -1;
    }
    states[start] = -1;
    states[end] = -1;
    
    return pivotIndex;
}

function randomize(pillars) {
    let currentIndex = pillars.length;
    let randomIndex;

    for (let i = 0; i < pillars.length; i++) {
        states[i] = -1;
    }
    
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * numOfPillars);
        currentIndex--;
        
        Pillar.swap(pillars[currentIndex], pillars[randomIndex]);
    }
    return pillars;
}



function drawPillars(pillars) {
    for (let i = 0; i <= numOfPillars; i++) {
        let x = i * width/numOfPillars;
        let y = height;
        let w = width/numOfPillars+1;
        let h = i * height * 0.66 / numOfPillars;
        pillars.push(new Pillar(x, y , w, -h));
    }
}

function draw() {
    background(0);
    noStroke();
    for (let i = 0; i < numOfPillars; i++) {
        switch(states[i]) {
            case -1:
                fill("#b8b8ff");
                break;
            case 0:
                fill("#fe4a49");
                break;
            case 1:
                fill("#009fb7");
                break;
            case 2:
                fill("#fed766")
        }        
        pillars[i].show();
    }
    
  }