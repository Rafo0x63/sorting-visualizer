let numOfPillars = 1000;
let pillars = [];
let states = [];
let arr = [10,2,3,9,7,1,6,5];
let calls = 0;

document.getElementById("quickSortBtn").addEventListener('click', function () {
    quickSort(pillars, 0, pillars.length - 1);
});
document.getElementById("bubbleSortBtn").addEventListener('click', function () {
    bubbleSort(pillars);
});
document.getElementById("randomizeBtn").addEventListener('click', function () {
    randomize(pillars);
    console.log(pillars);
});
document.getElementById("mergeSortBtn").addEventListener('click', function () {
    mergeSort(pillars);
    console.log(pillars);
});
document.getElementById("selSortBtn").addEventListener('click', function () {
    selectionSort(pillars);
    console.log(pillars);
});

function setup() {
    createCanvas(1920, 800);

    drawPillars(pillars);
    randomize(pillars);

}

async function selectionSort(arr) {
    let first = 0;
    while (first < arr.length) {
        let minIndex = 0;
        let minValue = arr[0].h;
        for (let j = 0; j < arr.length - first; j++) {
            if (arr[j].h < minValue) {
                minIndex = j;
                minValue = arr[j].h;
                states[minIndex] = 0;
            }
        }
        await swap(arr[minIndex], arr[arr.length - 1 - first])
        states[minIndex] = -1
        first++;
    }
}

function mergeSort(arr) {
    if (arr.length < 2) return;

    const mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    mergeSort(left);
    mergeSort(right)
    merge(arr, left, right);
}

function merge(arr, left, right) {
    let i = 0;
    let j = 0;
    let k = 0;
    while (i < left.length && j < right.length) {
        if (left[i].h > right[j].h) {
            swap(arr[k], left[i]);
            i++;
        } else if (left[i].h < right[j].h) {
            swap(arr[k], right[j]);
            j++;
        }
        k++;
    }

    while (i < left.length) {
        swap(arr[k], left[i]);
        i++;
        k++;
    }

    while (j < right.length) {
        swap(arr[k], right[j]);
        j++;
        k++;
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j].h < arr[j+1].h) {
                await swap(arr[j], arr[j+1]);
            }
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
            console.log(`Swapping pillar at ${i} with ${pivotIndex}`);
            await swap(arr[i], arr[pivotIndex]);
            pivotIndex++;
        }
    }

    await swap(arr[pivotIndex], arr[end]);
    
    for (let i = start; i < end; i++) {
        if (i != pivotIndex) states[i] = -1;
    }
    states[start] = -1;
    states[end] = -1;
    
    return pivotIndex;
}

function randomize(arr) {
    let currentIndex = arr.length;
    let randomIndex;

    for (let i = 0; i < arr.length; i++) {
        states[i] = -1;
    }
    
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * numOfPillars);
        currentIndex--;
        
        swap(arr[currentIndex], arr[randomIndex]);
    }
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

async function swap(p1, p2) {
    const temp = p1.h;
    p1.h = p2.h;
    p2.h = temp;
    await new Promise(resolve => setTimeout(resolve, 1));
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