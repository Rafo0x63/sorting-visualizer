let values = [];
let states = [];
let valueWidth = 6;
let solved = false;

document.getElementById("randomizeBtn").addEventListener('click', function () {
    randomize(values);
    solved = false;
});
document.getElementById("quickSortBtn").addEventListener('click', function () {
    if (!solved) {
        quickSort(values, 0, values.length - 1);
        solved = true;
    } else return;
});
document.getElementById("bubbleSortBtn").addEventListener('click', function () {
    if (!solved) {
        bubbleSort(values);
        solved = true;
    } else return;
});
document.getElementById("mergeSortBtn").addEventListener('click', function () {
    if (!solved) {
        mergeSort(values, 0, values.length - 1);
        solved = true;
    } else return;
});
document.getElementById("selSortBtn").addEventListener('click', function () {
    if (!solved) {
        selectionSort(values);
        solved = true;
    } else return;
});
document.getElementById("shakerSortBtn").addEventListener('click', function () {
    if (!solved) {
        cocktailShakerSort(values);
        solved = true;
    } else return;
});
document.getElementById("insertionSortBtn").addEventListener('click', function () {
    if (!solved) {
        insertionSort(values);
        solved = true;
    } else return;
});

function setup() {
    createCanvas(1200, 600);

    values = new Array(Math.floor(width/valueWidth));
    for (let i = 0; i < values.length; i++) {
        values[i] = map(i, 0, values.length, 0, 400);
    }
    randomize(values);
}

async function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        states[i] = 1;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j-1]) {
                states[j] = 0;
                states[j-1] = 0;
                await swap(arr, j, j-1);
                states[j] = -1;
                states[j-1] = -1;
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        states[i] = -1;
    }
}

async function cocktailShakerSort(arr) {
    let start = 0;
    let end = arr.length;

    while (start < end) {
        for (let i = start; i < end; i++) {
            states[i] = 1;
        }
        states[start] = 0;
        states[end] = 0;
        for (let i = start; i < end - 1; i++) {
            if (arr[i] > arr[i+1]) {
                await swap(arr, i, i+1);
            }
        }
        end--;
        for (let i = end - 1; i >= start + 1; i--) {
            if (arr[i] < arr[i-1]) {
                await swap(arr, i, i-1);
            }
        }
        start++;
        states[start - 1] = -1;
        states[end + 1] = -1;
    }
    for (let i = 0; i < arr.length; i++) {
        states[i] = -1;
    }
}

async function selectionSort(arr) {
    let first = 0;
    while (first < arr.length) {
        let minIndex = 0;
        let maxValue = arr[0];
        for (let i = 0; i < arr.length - first; i++) {
            states[i] = 1;
        }
        for (let j = 0; j < arr.length - first; j++) {
            if (arr[j] > maxValue) {
                minIndex = j;
                maxValue = arr[j];
                states[minIndex] = 0;
            }
        }
        await swap(arr, minIndex, arr.length - 1 - first)
        states[minIndex] = -1
        states[arr.length - 1 - first] = -1
        first++;
    }
}
async function mergeSortHelperSwap(arr1, arr2, firstIndex, secondIndex) {
    [arr1[firstIndex], arr2[secondIndex]] = [arr2[secondIndex], arr1[firstIndex]];
    await new Promise(r => setTimeout(r, 1));
}

async function merge(arr, left, mid, right) {
    const leftSize = mid - left + 1;
    const rightSize = right - mid;
  
    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);
  
    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = arr[left + i];
        await new Promise(r => setTimeout(r, 1))
    }
    for (let i = 0; i < rightSize; i++) {
        rightArray[i] = arr[mid + 1 + i];
        await new Promise(r => setTimeout(r, 1))
    }
  
    let i = 0;
    let j = 0;
    let k = left;
  
    while (i < leftSize && j < rightSize) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
        await new Promise(r => setTimeout(r, 1))
      } else {
        arr[k] = rightArray[j];
        j++;
        await new Promise(r => setTimeout(r, 1))
      }
      k++;
    }
  
    while (i < leftSize) {
        arr[k] = leftArray[i];
        i++;
        k++;
        await new Promise(r => setTimeout(r, 1))
    }
  
    while (j < rightSize) {
        arr[k] = rightArray[j];
        j++;
        k++;
        await new Promise(r => setTimeout(r, 1))
    }
  }
  
  async function mergeSort(arr, left, right) {
    if (left < right) {
      const mid = floor((left + right) / 2);
      
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
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
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    
    await swap(arr, pivotIndex, end);
    
    for (let i = start; i < end; i++) {
        if (i != pivotIndex) states[i] = -1;
    }
    states[start] = -1;
    states[end] = -1;
    
    return pivotIndex;
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                await swap(arr, j, j+1);
            }
        }
    }
}

async function randomize(arr) {
    let currentIndex = arr.length - 1;
    let start = 0;
    let randomIndex;
    
    for (let i = 0; i < arr.length; i++) {
        states[i] = -1;
    }
    
    while (currentIndex >= start) {
        
        randomIndex = Math.floor(random(arr.length-1));
        await swap(arr, currentIndex, randomIndex);
        randomIndex = Math.floor(random(arr.length-1));
        await swap(arr, start, randomIndex);
        
        currentIndex--;
        start++;
    }
}


async function swap(arr, firstIndex, secondIndex) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    await new Promise(r => setTimeout(r, 1));
}

function draw() {
    background(100);
    strokeWeight(valueWidth);
    stroke(255);
    for (let i = 0; i < values.length; i++) {
        switch(states[i]) {
            case -1:
                stroke("#b8b8ff");
                break;
            case 0:
                stroke("#fe4a49");
                break;
            case 1:
                stroke("#009fb7");
                break;
            case 2:
                stroke("#fed766")
        }        
        line(i * valueWidth + Math.floor(valueWidth/2), height, i * valueWidth + Math.floor(valueWidth/2), height - values[i]);
    }
  }