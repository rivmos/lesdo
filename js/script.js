// JS code
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addNotes);

function addNotes() {
    if (localStorage.notes && localStorage.titles) {
        notesObj = JSON.parse(localStorage.getItem('notes'));
        titlesObj = JSON.parse(localStorage.getItem('titles'));
    }
    else {
        notesObj = [];
        titlesObj = [];
    }
    // // We Can Also Use :
    // if(localStorage.notes == null){
    //     notesObj = [];
    // }
    // else{
    //     notesObj = JSON.parse(localStorage.getItem('notes'));
    // }
    let noteTitle = document.getElementById('noteTitle');
    let textToAdd = document.getElementById('textToAdd');
    notesObj.push(textToAdd.value);
    titlesObj.push(noteTitle.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titlesObj));
    textToAdd.value = "";
    noteTitle.value = "";
    showNotes();
}

function showNotes() {

    let html = '';
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if(notes == null && titles == null){
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    notesObj.forEach(function (element, index) {
        html += `
                <div class="note">
                    <h4>${titlesObj[index]}</h4>
                    <p>${element}</p>
                    <button id="${index}" onclick="delNotes(this.id)" class="delBtn">Delete Note</button>
                </div>`;
    })
    let allNotes = document.querySelector('.allNotes');
    if(notesObj.length == 0 && titlesObj.length == 0){
        allNotes.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
    }
    else {
        allNotes.innerHTML = html;
    }
    
}


function delNotes(index){
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    notesObj = JSON.parse(notes);
    titlesObj = JSON.parse(titles);
    notesObj.splice(index,1);
    titlesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles',JSON.stringify(titlesObj));
    showNotes();
}



let clearInput = document.getElementById('clearInput');
clearInput.addEventListener('click',function(){
    let searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    showNotes();
})

let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input',searchNotes)

function searchNotes(){
    let searchText =  searchInput.value.toLowerCase();
    let notes = document.getElementsByClassName('note');
    Array.from(notes).forEach(function(element){
        let title = element.querySelector('h4');
        let note = element.querySelector('p');
        note = note.innerText;
        title = title.innerText;
        if(note.toLowerCase().includes(searchText) || title.toLowerCase().includes(searchText)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
}
