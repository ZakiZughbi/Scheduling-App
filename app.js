const calendar = document.getElementById('calendar');
let header = document.querySelector('.banner h2');
const week = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');

let nav = 0;
let clicked = null;

let sundayDates=[];
let saturdaysDates=[];
let weekDaysDates=[];
const calSquares = document.getElementsByClassName('day');

let dt = new Date();

let day = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();

let currentMonth = month;


function load() {

    let presentDay = new Date(year, month, day);

    //Month & Year Title
    header.innerHTML = presentDay.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});

    //Calendar Days
    let numDays = new Date(year, month+1, 0).getDate();

    let lastDay = new Date(year, month, 0);

    let lastDayofCurrent = new Date(year, month+1, 0);

    let lastDayName = lastDay.toLocaleDateString('en-US', {weekday:'long'});

    for(let i=0; i<week.length; i++){
        if (lastDayName == week[i]){
            padDay = week.indexOf(lastDayName);
        }
    }

    // Creating Calendar Boxes
    for(let i=0; i< numDays+padDay; i++){
        const square = document.createElement('div');
        if (i >= padDay){
            let squareNum = i - padDay + 1;
            square.innerHTML = squareNum;
            square.classList.add('day');
            square.addEventListener('click', ()=>{
                clicked = parseInt(square.innerText);
            })
        } else{
            square.classList.add('padding');
        }

        if (i == day & currentMonth==month){
            square.classList.add('current');
        }

        calendar.appendChild(square);
    }
    if(calendar.childElementCount < 35){
        let rem = 35 - calendar.childElementCount;
        for(let i=1; i<=rem; i++){
            const square = document.createElement('div');
            square.classList.add('padding');
            calendar.appendChild(square);
        }
    } else if(calendar.childElementCount > 35){
        let rem = 42 - calendar.childElementCount;
        for(let i=1; i<=rem; i++){
            const square = document.createElement('div');
            square.classList.add('padding');
            calendar.appendChild(square);
        }
    }
}

//Buttons

backBtn.addEventListener('click', ()=>{
    calendar.innerHTML='';
    month--;
    load();
    dateSaver();
});

nextBtn.addEventListener('click', ()=>{
    calendar.innerHTML='';
    month++;
    load();
    dateSaver();
});



function dateSaver(){

    let lastDay = new Date(year, month+1, 0).getDate();

    sundaysDates=[];
    saturdaysDates=[];
    weekDaysDates=[];


    for (let i=1; i<=lastDay; i++){
        let day = new Date(year, month, i);
        let date = new Date(year, month, i).getDate();

        let dayName = day.toLocaleDateString('en-US', {weekday:'long'});

        if(dayName == 'Sunday'){
            sundaysDates.push(date);
        } else if(dayName == 'Saturday'){
            saturdaysDates.push(date);
        } else{
            weekDaysDates.push(date);
        }
    }


    function check(arg, i){
        if(arg.toString() == calendar.children[i].innerText){
            //console.log(arg);
            calendar.children[i].style.background="blue";
        }
    }

    for(let i=0; i<=lastDay; i++){
        saturdaysDates.forEach(element => check(element, i));
    }
}

load();
dateSaver();
