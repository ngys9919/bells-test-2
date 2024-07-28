const JSON_BIN_BASE_URL="https://api.jsonbin.io/v3";
const JSON_BIN_ID = "66a5af28ad19ca34f88dca53";    

// https://api.jsonbin.io/v3/b/66a5af28ad19ca34f88dca53

// books[] -> represent our database model
// - array: represents the entire database
// - object: represents one record

//Each book should have the following properties:
//•isbn (string, use this as the unique identifier)
//•title (string)
//•author (string)  
//•isCheckedOut (boolean)

// data part
let books = [];

/*
let books = [
    {
        //isbn: "9781593275402", //isbn-13 unique number for each book in the list
        isbn: "1593275402", //isbn-10 unique number for each book in the list
        title: "The Principles of Object-Oriented JavaScript", //book title
        author: "Nicholas C. Zakas", //author for the book
        isCheckedOut: false //true if the book is borrowed, otherwise false
    },
    {
        isbn: "9781394263219", //isbn-13
        title: "JavaScript Essentials for Dummies",
        author: "Paul McFedries",
        isCheckedOut: false
    }
];
*/

//addBook(books, title, author, isbn): 
//Adds a new book to the library.
function addBook(books, title, author, isbn) {
    let newBook = {
      isbn: isbn,
      title: title,
      author: author,
      isCheckedOut: false
    };

    // isbn cannot be empty and title cannot be empty and author cannot be empty
    if (isbn == "" || title == "" || author =="") {
        alert("Please provide complete information!"); 
        // terminate the function
        return; 
    }

    books.push(newBook);
}

//returnBook(books, isbn): 
//Marks a book as returned.
function returnBook(books, isbn) {
    let book = null;
    for (let t of books) {
      if (t.isbn == isbn) {
         book = t;
      }
    }

  if ((book) && (book.isCheckedOut==false)) {
      console.log("Book is not checked out.");
      return false;
   } else {
      if (book) {
        book.isCheckedOut = false;
        return true;
      } else {   
        console.log("Book is not found.");
        return false;
      }
   }
}

//checkOutBook(books, isbn): 
//Marks a book as checked out.
function checkOutBook(books, isbn) {
  
  const indexToUpdate = books.findIndex(function(t){
      return t.isbn === isbn;
  });

  //update isCheckedOut status to true
  if ((indexToUpdate>=0) && (books[indexToUpdate].isCheckedOut)) {
     console.log("Book is already checked out");
     return false;
   } else {
     if (indexToUpdate>=0) {
       books[indexToUpdate].isCheckedOut = true;
       return true;
     } else {
       console.log("Book is not found");
       return false;
     }
   }
}

//isbnInputCheck(userSelection): 
//input validation to ensure that ISBNs are unique and in the correct format.
function isbnInputCheck(userSelection) {
    if (userSelection === "2") {
      isbn = prompt("Enter the ISBN (10 or 13 digits) for the new book: ");
    } else if (userSelection === "3") {
      isbn = prompt("Enter the book ISBN (10 or 13 digits) you want to borrow: ");
    } else if (userSelection === "4") {
      isbn = prompt("Enter the book ISBN (10 or 13 digits) you want to return: ");
    } else {
      console.log("Invalid userSelection!");
      return(-1);
    }
  
    let isbn_length = isbn.length;
  
    if (isbn.length===0) {
      console.log("Invalid ISBN! You entered nothing.");
      return(-1);
    } else if ((isbn_length !== 10) && (isbn_length !== 13)) {
      console.log("ISBN is either 10 or 13 digits!");
      return(-1);
    }
  
    //regular expression to check if the input is a number
    let isbn_isDigits = isbn.match(/^\d{10}|\d{13}/); 
    
    if (!isbn_isDigits) {
      console.log("ISBN must be digits!");
      return(-1);
    }
  
    let foundRecord = null;  // null -> not found, doesn't exist yet
    // linear search: find the books array for any existenance of the isbn
    for (let t of books) {
      if (t.isbn === isbn) {
        foundRecord = t;
        isbn_unique = false;
        if (userSelection === "2") {
          console.log("ISBN already exists!");
          return(-1);
        } else if ((userSelection === "3") && (foundRecord.isCheckedOut)) {
          console.log("Book is already checked out!");
          return(-1);
        } else if ((userSelection === "4") && (!foundRecord.isCheckedOut)) {
          console.log("Book is not yet checked out!");
          return(-1);
        }
      }
    }
    isbn_unique = true;
    if (userSelection === "2") {
      console.log("ISBN is unique!");
    }
    return isbn;
  }
  
  //addNewBook():
  //function to prompt the user for book details and 
  //use the addBook function from the data model.
  function addNewBook() {
      isbn = isbnInputCheck("2");
      if (isbn === -1) {
        console.log("Failed to add new book.");
        return;
      }
    
      let title = prompt("Enter the title for the new book: ");
      let author = prompt("Enter the author for the new book: ");
      addBook(books, title, author, isbn);
      console.log("Book added successfully.");
  }
  
//returnBookInterface():
//function to prompt the user for the ISBN of the book they want to return.
function returnBookInterface() {
    isbn = isbnInputCheck("4");
    if (isbn === -1) {
      console.log("Failed to return book.");
      return;
    }
  
    let ret = returnBook(books, isbn);
    if ((books.length === 0) && (ret == false)) {
      console.log("There is no such book in the records.");
      return;
    } else if (ret == true) {
      console.log("Book returned successfully!");
    }
}

//checkOutBookInterface():
//function to prompt the user for the ISBN of the book they want to check out.
function checkOutBookInterface() {
    isbn = isbnInputCheck("3");
    if (isbn === -1) {
      console.log("Failed to check-out book.");
      return;
    }
  
    let ret = checkOutBook(books, isbn);
    if ((books.length === 0) && (ret == false)) {
      console.log("There is no such book in the library.");
      return;
    }
    if (ret == true) {
      console.log("Book checked out successfully!");
    }   
}

function editBook(books, title, author, isbn) {
  // use a linear search to find the book
  let bookToEdit = null;
  for (let b of books) {
    if (b.isbn === isbn) {
     bookToEdit = b;
    break;
    }
  }

  bookToEdit.title = title;
  bookToEdit.author = author;
}

function deleteBook(books, isbn) {
  // find the index of the book to delete
  let indexToDelete = null;
  let index = -1; // start from -1 because the first element to 0
  
  for (let b of books) {
    index = index + 1;
    if (b.isbn == isbn) {
      indexToDelete = index;
      break;
    }
  }

  books.splice(indexToDelete, 1);
  
}

async function loadBooks() {
    const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`);
    // const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`);
    return response.data.record;
}

async function saveBooks(books) {
    const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, books);
    console.log(response.data);
}