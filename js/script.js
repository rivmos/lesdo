// JS code
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addNotes);

function addNotes() {
    if (localStorage.notes) {
        notesObj = JSON.parse(localStorage.getItem('notes'));
    }
    else {
        notesObj = [];
    }
    // // We Can Also Use :
    // if(localStorage.notes == null){
    //     notesObj = [];
    // }
    // else{
    //     notesObj = JSON.parse(localStorage.getItem('notes'));
    // }

    let textToAdd = document.getElementById('textToAdd');
    notesObj.push(textToAdd.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    textToAdd.value = "";
    showNotes();
}

function showNotes() {

    let html = '';
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function (element, index) {
        html += `
                <div class="note">
                    <h4>Note ${index + 1}</h4>
                    <p>${element}</p>
                    <button id="${index + 1}" onclick="delNotes(this.id)" class="delBtn">Delete Note</button>
                </div>`;
    })
    let allNotes = document.querySelector('.allNotes');
    if(notesObj.length == 0){
        allNotes.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
    }
    else {
        allNotes.innerHTML = html;
    }
    
}


function delNotes(index){
    let notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes);
    notesObj.splice(index-1,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
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
        let note = element.querySelector('p');
        note = note.innerText;
        if(note.toLowerCase().includes(searchText)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
}