document.addEventListener("DOMContentLoaded", async function(){
    // the books here refer to the global books array
    books = await loadBooks();
    renderList(books);
  });
  
  //prompt function shows OK and CANCEL buttons and is ready for input
  //alert function shows only OK button
  //confirm function shows OK and CANCEL buttons with no input

  // interaction part

  // event listeners
  const addBtnClicked = document.querySelector("#addBtn");
  addBtnClicked.addEventListener("click", function(event) {
      event.preventDefault();

      const isbn_addNewInput = document.querySelector("#isbn")
      isbn = isbn_addNewInput.value;

      const titleInput = document.querySelector("#title");
      title = titleInput.value;

      const authorInput = document.querySelector("#author");
      author = authorInput.value;

      addNewBook();
      saveBooks(books);
      renderList(books);
    });

  const checkOutBtnClicked = document.querySelector("#checkOutBtn");
  checkOutBtnClicked.addEventListener("click", function(event){
        event.preventDefault();

        const isbn_checkOutInput = document.querySelector("#isbnCheckOut")
        isbn = isbn_checkOutInput.value;

        checkOutBookInterface();
        saveBooks(books);
        renderList(books);
    });

  const returnBtnClicked = document.querySelector("#returnBtn");
  returnBtnClicked.addEventListener("click", function(event){
      event.preventDefault();

      const isbn_returnInput = document.querySelector("#isbnReturn")
      isbn = isbn_returnInput.value;

      returnBookInterface();
      saveBooks(books);
      renderList(books);
  });

  let passwordBtn = document.querySelector("#passwordBtn");
  passwordBtn.addEventListener('click', function(){
    ret = checkPassword();
    if (ret == true) {
      renderListSuperUser(books);
    } else {
      renderList(books);      
    }
  });
  
  function renderList(books) {
    let bookListDiv = document.querySelector("#bookList");
    let outputString = "";
    if (books.length === 0) {
      outputString = "";
      bookListDiv.innerHTML = outputString;
      return;
    }

    // render the list
    console.log(books);
    console.log("===== Booklist Summary =====");
    for (let listIndex of books) {
      console.log(`ISBN: ${listIndex.isbn}, Title: ${listIndex.title}, Author: ${listIndex.author}, Checked-Out: ${listIndex.isCheckedOut}`);
      // sample output:
      // `<li>ISBN: 9781593275402, Title: The Principles of Object-Oriented JavaScript, Author: Nicholas C. Zakas, isCheckedOut: false</li>`
      outputString += `<li>ISBN: ${listIndex.isbn}, Title: ${listIndex.title}, Author: ${listIndex.author}, Checked-Out: ${listIndex.isCheckedOut}
        <button class="editBtn btn-success" data-isbn="${listIndex.isbn}" disabled>Edit</button>
        <button class="deleteBtn btn-danger" data-isbn="${listIndex.isbn}" disabled>Delete</button>
      </li>`;
    }
    bookListDiv.innerHTML = outputString; 
  }

  function checkPassword() {
       var password = document.getElementById("passwordBox");
       var passwordText = password.value;
       if(passwordText == "Ernest300") {
        return true;
       }
       console.log("Access denied! Incorrect password!");
       alert("Access denied! Incorrect password!");
       return false;
  }

  function renderListSuperUser(books) {
      let bookListDiv = document.querySelector("#bookList");
      let outputString = "";
      if (books.length === 0) {
        outputString = "";
        bookListDiv.innerHTML = outputString;
        return;
      }
  
      // render the list
      console.log(books);
      console.log("===== Booklist Summary =====");
      for (let listIndex of books) {
        console.log(`ISBN: ${listIndex.isbn}, Title: ${listIndex.title}, Author: ${listIndex.author}, Checked-Out: ${listIndex.isCheckedOut}`);
        // sample output:
        // `<li>ISBN: 9781593275402, Title: The Principles of Object-Oriented JavaScript, Author: Nicholas C. Zakas, isCheckedOut: false</li>`
        outputString += `<li>ISBN: ${listIndex.isbn}, Title: ${listIndex.title}, Author: ${listIndex.author}, Checked-Out: ${listIndex.isCheckedOut}
          <button class="editBtn btn-success" data-isbn="${listIndex.isbn}" enabled>Edit</button>
          <button class="deleteBtn btn-danger" data-isbn="${listIndex.isbn}" enabled>Delete</button>
        </li>`;
      }
      bookListDiv.innerHTML = outputString;
       // after we set the inner HTML, all the elements will be created 
       // all buttons will be created, so we use querySelectorAll on all of them
       
       // EDIT BUTTONS
       let allEditButtons =  document.querySelectorAll(".editBtn");
       for (let button of allEditButtons) {
        button.addEventListener("click", function(event) {
        // the first parameter for a function handling an event is the event info
        let clickedButton = event.target;
        // let isbn = Number(clickedButton.dataset.isbn);
        let isbn = clickedButton.dataset.isbn;
        // let isbn = prompt("Enter the new isbn");
        let title = prompt("Enter the new title");
        let author = prompt("Enter the new author");
        editBook(books, title, author, isbn);
        saveBooks(books);
        renderListSuperUser(books); 
        });
       }
    
       // DELETE BUTTONS
       let allDeleteButtons = document.querySelectorAll(".deleteBtn");
       for (let button of allDeleteButtons) {
         button.addEventListener("click", function(event){
          const toDelete = confirm("Are you sure you want to delete?");
          if (toDelete) {
           // get the book id
          //  let isbn = Number(event.target.dataset.isbn);
           let isbn = event.target.dataset.isbn;
           deleteBook(books, isbn);
           saveBooks(books);
           renderListSuperUser(books);
          }
         })
       }
    }

  // async function main() {
    // books = await loadBooks();
    // renderList(books);
  // }
  
  // main();