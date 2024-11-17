var bookmarkNameInput=document.getElementById("bookmarkName");
var bookmarkURLInput=document.getElementById("bookmarkURL");
var closeBtnValid=document.getElementById("closeBtnValid");
var alertValid=document.getElementById("alertValid");
var alertRefill=document.getElementById("alertRefill");
var closeBtnRefill=document.getElementById("closeBtnRefill")
var bookmarkContainer=[];
if (localStorage.getItem("bookmark")!==null){
    bookmarkContainer=JSON.parse(localStorage.getItem("bookmark"))
    display()
}


function addBookmark() {
    var name = bookmarkNameInput.value.trim();
    var url = bookmarkURLInput.value.trim();

    if ((name.length < 3) || (!url.includes('.') || url.length < 5)) {
        if ((name.length < 3) || ((!/^[a-zA-Z]{3,}$/.test(name)))){
            bookmarkNameInput.style.outline = "2px solid red";
        }
        else{
            bookmarkNameInput.style.outline = "";
        }
        if (!url.includes('.') || url.length < 5){
            bookmarkURLInput.style.outline = "2px solid red";
        }
        else{
            bookmarkURLInput.style.outline = "";
        }
        alertValid.classList.remove("d-none")
        return;
    }

    var refill = bookmarkContainer.some(function (bookmark) {
        return bookmark.name.toLowerCase() === name.toLowerCase() || bookmark.url === url;
    });

    if (refill) {
        if (bookmarkContainer.some(bookmark => bookmark.name.toLowerCase() === name.toLowerCase())) {
            bookmarkNameInput.style.outline = "2px solid orange"; 
        }
        
        if (bookmarkContainer.some(bookmark => bookmark.url === url)) {
            bookmarkURLInput.style.outline = "2px solid orange"; 
        }
        alertRefill.classList.remove("d-none")
        return;
    }

    var bookmark = {
        name: name,
        url: url
    };

    bookmarkContainer.push(bookmark);
    console.log(bookmarkContainer);
    display();
    bookmarkNameInput.style.outline = ""
    bookmarkURLInput.style.outline = ""
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    clear();
}

closeBtnValid.addEventListener("click", function () {
    alertValid.classList.add("d-none");
});
closeBtnRefill.addEventListener("click", function (){
    alertRefill.classList.add("d-none");
})


function clear() {
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
}


function display() {
    var details='';
    for(var i=0;i<bookmarkContainer.length;i++){
    details+=`
    <tr>
        <td>${i + 1}</td>
        <td>${bookmarkContainer[i].name}</td>
        <td><button onclick="VisitBookmark(${i})" class="btn btn-info"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>
    `
}
document.getElementById("tableContent").innerHTML=details;
}

function deleteBookmark(i){
    bookmarkContainer.splice(i,1);
    console.log(bookmarkContainer);
    display()
    localStorage.setItem("bookmark",JSON.stringify(bookmarkContainer))
}
function VisitBookmark(i) {
    var url = bookmarkContainer[i].url;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    window.open(url, '_blank');
}
