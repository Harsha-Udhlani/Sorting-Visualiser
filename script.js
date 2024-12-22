let n = 10;
let prev = 0;
function Change() {

    const size = document.getElementById('size');
    prev = n;

    n = size.value;
    console.log(n);
}

const array = [];
Init();
function disableBtn() {

    const buttons = document.querySelectorAll(".sort-btn");
    buttons.forEach(btn => {
        btn.disabled = true;
    });

}

function enableBtn() {

    const buttons = document.querySelectorAll(".sort-btn");
    buttons.forEach(btn => {
        btn.disabled = false;
    });

}
function Adjust(e) {
    if (e == 1) {
        Play(1);
    }
    else if (e == 2) {
        Play(2);
    }
    else if (e == 3) {
        Play(3);
    }
    else {
        Play(4);
    }
}

function showBars(move) {


    // Clear previous bars

    container.innerHTML = "";
    //container.innerHTML = ""; // Clear previous bars

    for (let i = 0; i < n; i++) {
        const bar = document.createElement('div');
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if (move) {
            if (move.type === "swap" && move.indices.includes(i)) {
                bar.style.backgroundColor = "red"; // Highlight swapped bars
            } else if (move.type === "overwrite" && move.indices.includes(i)) {
                bar.style.backgroundColor = "green"; // Highlight overwritten bar
            } else if (move.type === "comp" && move.indices.includes(i)) {
                bar.style.backgroundColor = "blue"; // Highlight compared bars
            }
        }

        container.appendChild(bar);
    }
}


function Init() {


    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    };
    showBars();

}

function Play(val) {
    if (val == 1) {
        disableBtn();
        let p = document.createElement('p');
        p.innerHTml = "TimeComplexity:"
        document.body.appendChild(p);
        const copy = [...array];
        const moves = bubbleSort(copy);
        animate(moves);
    }
    else if (val == 2) {
        disableBtn();
        const copy = [...array];
        const moves = selectionSort(copy);
        animate(moves);
    }
    else if (val == 3) {
        disableBtn();
        const copy = [...array];
        const moves = insertionSort(copy);
        animate(moves);

    }
    else {
        disableBtn();
        const copy = [...array];
        const moves = [];
        mergeSort(copy, 0, copy.length - 1, moves);
        animate(moves);

    }
    // enableBtn();
}

function animate(moves) {
    if (moves.length == 0) {

        showBars();
        enableBtn();
        return;
    }

    const move = moves.shift();

    if (move.type === "swap") {
        // Handle swap operation
        const [i, j] = move.indices;
        [array[i], array[j]] = [array[j], array[i]];
    } else if (move.type === "overwrite") {
        // Handle overwrite operation
        const [i] = move.indices;
        array[i] = move.value;
    }

    // Update the visualization
    showBars(move);

    // Recursive animation
    setTimeout(function () {
        animate(moves);
    }, 400);
}


function bubbleSort(array) {
    document.getElementById('time-complexity').innerHTML = "";
    document.getElementById('time-complexity').append('O(n^2)')
    document.getElementById('space-complexity').innerHTML = "";
    document.getElementById('space-complexity').append('O(1)');
    const moves = [];

    for (let i = 0; i < array.length - 1; i++) {
        var swapped = false;
        for (let j = 0; j < array.length - i - 1; j++) {
            moves.push({ indices: [j, j + 1], type: "comp" });
            if (array[j] > array[j + 1]) {
                swapped = true;
                moves.push({ indices: [j, j + 1], type: "swap" });
                let temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }

        }
        if (!swapped) {
            break;
        }


    }
    //document.body.removeChild(p)
    return moves;

}

function selectionSort(array) {
    document.getElementById('time-complexity').innerHTML = "";
    document.getElementById('time-complexity').append('O(n^2)')
    document.getElementById('space-complexity').innerHTML = "";
    document.getElementById('space-complexity').append('O(1)')
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
        let mini = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[mini] > array[j]) {
                mini = j;
            }
        }
        if (mini != i)
            moves.push({ indices: [mini, i], type: "swap" });
        else {
            moves.push({ indices: [mini, i], type: "comp" });
        }
        let temp = mini;
        array[mini] = array[i];
        array[i] = array[temp];

    }
    return moves;
}

function insertionSort(array) {
    document.getElementById('time-complexity').innerHTML = "";
    document.getElementById('time-complexity').append('O(n^2)')
    document.getElementById('space-complexity').innerHTML = "";
    document.getElementById('space-complexity').append('O(1)')
    let prev, curr;
    const moves = [];
    for (let i = 1; i < array.length; i++) {
        curr = array[i];
        prev = i - 1;
        while (prev >= 0 && array[prev] > curr) {
            moves.push({ indices: [prev, prev + 1], type: "swap" });
            array[prev + 1] = array[prev];
            prev--;
        }
        moves.push({ indices: [prev + 1, curr], type: "comp" });
        array[prev + 1] = curr;

    }
    return moves;
}

function mergeSort(array, s, e, moves) {
    document.getElementById('time-complexity').innerHTML = "";
    document.getElementById('time-complexity').append('O(nlogn)')
    document.getElementById('space-complexity').innerHTML = "";
    document.getElementById('space-complexity').append('O(n)')
    if (s >= e) return;

    const mid = Math.floor((s + ((e - s) / 2)));

    mergeSort(array, s, mid, moves);

    mergeSort(array, mid + 1, e, moves);

    merge(array, s, mid, e, moves);


}

function merge(array, s, mid, e, moves) {

    let l = s;
    let r = mid + 1;
    let temp = [];
    while (l <= mid && r <= e) {

        moves.push({ indices: [l, r], type: "comp" });
        if (array[l] <= array[r]) {

            temp.push(array[l]);
            l++;
        }
        else {
            temp.push(array[r]);
            r++;
        }



    }
    while (l <= mid) {
        temp.push(array[l]);
        l++;


    }
    while (r <= e) {
        temp.push(array[r]);
        r++;

    }
    for (let i = s, k = 0; i <= e; i++, k++) {
        moves.push({ indices: [i], value: temp[k], type: "overwrite" }); // Log overwrite with value
        array[i] = temp[k];
    }



}





