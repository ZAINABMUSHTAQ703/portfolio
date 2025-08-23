#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>
#include <ctime>
#include <cstdlib>
#include <conio.h> // For getch() and password masking

using namespace std;

// Structure for Book
struct Book {
    string isbn;
    string title;
    string author;
    bool available;
};

// Structure for Borrowed Book
struct BorrowedBook {
    string isbn;
    string studentName;
    string rollNumber;
    string phone;
    string department;
    string issueDate;
    string returnDate;
};

// Admin credentials
struct Admin {
    string username;
    string password;
};

// Function prototypes
void loginScreen();
void adminMenu();
void viewAllBooks();
void addBook();
void deleteBook();
void viewLentBooks();
void searchBook();
void changeCredentials();
void saveBooksToFile();
void loadBooksFromFile();
void saveBorrowedBooksToFile();
void loadBorrowedBooksFromFile();
void saveAdminToFile();
void loadAdminFromFile();
string getCurrentDate();
string getMaskedPassword();

// Global variables
vector<Book> books;
vector<BorrowedBook> borrowedBooks;
Admin admin;

int main() {
    loadBooksFromFile();
    loadBorrowedBooksFromFile();
    loadAdminFromFile();
    
    // If admin credentials file doesn't exist, set default
    if (admin.username.empty()) {
        admin.username = "admin";
        admin.password = "admin123";
        saveAdminToFile();
    }
    
    loginScreen();
    
    return 0;
}

void loginScreen() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     ADMIN LOGIN";
    cout << "\n\n\t\tUsername: ";
    string username;
    cin >> username;
    
    cout << "\t\tPassword: ";
    string password = getMaskedPassword();
    
    if (username == admin.username && password == admin.password) {
        cout << "\n\n\t\tLogin successful!";
        cout << "\n\n\t\tPress any key to continue...";
        getch();
        adminMenu();
    } else {
        cout << "\n\n\t\tInvalid username or password!";
        cout << "\n\n\t\tPress any key to try again...";
        getch();
        loginScreen();
    }
}

void adminMenu() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     ADMIN MENU";
    cout << "\n\n\t\t1. View All Books";
    cout << "\n\t\t2. Add Books";
    cout << "\n\t\t3. Delete Books";
    cout << "\n\t\t4. Lent Books";
    cout << "\n\t\t5. Search Book";
    cout << "\n\t\t6. Change Password/Username";
    cout << "\n\t\t7. Exit";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    switch(choice) {
        case 1:
            viewAllBooks();
            break;
        case 2:
            addBook();
            break;
        case 3:
            deleteBook();
            break;
        case 4:
            viewLentBooks();
            break;
        case 5:
            searchBook();
            break;
        case 6:
            changeCredentials();
            break;
        case 7:
            cout << "\n\n\t\tLogging out...";
            cout << "\n\n\t\tPress any key to continue...";
            getch();
            loginScreen();
            break;
        default:
            cout << "\n\n\t\tInvalid choice!";
            cout << "\n\n\t\tPress any key to try again...";
            getch();
            adminMenu();
    }
}

void viewAllBooks() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     ALL BOOKS";
    cout << "\n\n\t" << left << setw(5) << "No." << setw(15) << "ISBN" << setw(30) << "Title" 
         << setw(25) << "Author" << setw(10) << "Available";
    cout << "\n\t" << string(85, '-');
    
    for (int i = 0; i < books.size(); i++) {
        cout << "\n\t" << left << setw(5) << i+1 << setw(15) << books[i].isbn 
             << setw(30) << books[i].title << setw(25) << books[i].author 
             << setw(10) << (books[i].available ? "Yes" : "No");
    }
    
    cout << "\n\n\t\t1. Exit";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    if (choice == 1) {
        adminMenu();
    } else {
        cout << "\n\n\t\tInvalid choice!";
        cout << "\n\n\t\tPress any key to try again...";
        getch();
        viewAllBooks();
    }
}

void addBook() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     ADD BOOK";
    
    Book newBook;
    cout << "\n\n\t\tEnter ISBN: ";
    cin >> newBook.isbn;
    
    // Check if book already exists
    for (const Book& book : books) {
        if (book.isbn == newBook.isbn) {
            cout << "\n\n\t\tBook with this ISBN already exists!";
            cout << "\n\n\t\tPress any key to try again...";
            getch();
            addBook();
            return;
        }
    }
    
    cin.ignore(); // Clear buffer
    cout << "\t\tEnter Title: ";
    getline(cin, newBook.title);
    
    cout << "\t\tEnter Author: ";
    getline(cin, newBook.author);
    
    newBook.available = true;
    books.push_back(newBook);
    saveBooksToFile();
    
    cout << "\n\n\t\tBook added successfully!";
    cout << "\n\n\t\t1. Add another book";
    cout << "\n\t\t2. Exit to menu";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    if (choice == 1) {
        addBook();
    } else {
        adminMenu();
    }
}

void deleteBook() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     DELETE BOOK";
    cout << "\n\n\t\tEnter ISBN of book to delete: ";
    
    string isbn;
    cin >> isbn;
    
    bool found = false;
    for (auto it = books.begin(); it != books.end(); ++it) {
        if (it->isbn == isbn) {
            found = true;
            books.erase(it);
            saveBooksToFile();
            
            // Also remove from borrowed books if exists
            for (auto bit = borrowedBooks.begin(); bit != borrowedBooks.end(); ++bit) {
                if (bit->isbn == isbn) {
                    borrowedBooks.erase(bit);
                    saveBorrowedBooksToFile();
                    break;
                }
            }
            
            cout << "\n\n\t\tBook deleted successfully!";
            break;
        }
    }
    
    if (!found) {
        cout << "\n\n\t\tBook not found!";
    }
    
    cout << "\n\n\t\t1. Delete another book";
    cout << "\n\t\t2. Exit to menu";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    if (choice == 1) {
        deleteBook();
    } else {
        adminMenu();
    }
}

void viewLentBooks() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     LENT BOOKS";
    cout << "\n\n\t" << left << setw(5) << "No." << setw(15) << "ISBN" << setw(20) << "Title" 
         << setw(20) << "Student" << setw(15) << "Roll No" << setw(12) << "Phone" 
         << setw(15) << "Department" << setw(12) << "Issued" << setw(12) << "Return";
    cout << "\n\t" << string(126, '-');
    
    for (int i = 0; i < borrowedBooks.size(); i++) {
        // Find book title
        string title = "";
        for (const Book& book : books) {
            if (book.isbn == borrowedBooks[i].isbn) {
                title = book.title;
                break;
            }
        }
        
        cout << "\n\t" << left << setw(5) << i+1 << setw(15) << borrowedBooks[i].isbn 
             << setw(20) << (title.empty() ? "Unknown" : title) 
             << setw(20) << borrowedBooks[i].studentName << setw(15) << borrowedBooks[i].rollNumber
             << setw(12) << borrowedBooks[i].phone << setw(15) << borrowedBooks[i].department
             << setw(12) << borrowedBooks[i].issueDate << setw(12) << borrowedBooks[i].returnDate;
    }
    
    if (borrowedBooks.empty()) {
        cout << "\n\n\t\tNo books are currently lent out.";
    }
    
    cout << "\n\n\t\t1. Return a book";
    cout << "\n\t\t2. Exit to menu";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    if (choice == 1) {
        if (borrowedBooks.empty()) {
            cout << "\n\n\t\tNo books to return!";
            cout << "\n\n\t\tPress any key to continue...";
            getch();
            viewLentBooks();
            return;
        }
        
        cout << "\n\t\tEnter the number of book to return: ";
        int bookNum;
        cin >> bookNum;
        
        if (bookNum < 1 || bookNum > borrowedBooks.size()) {
            cout << "\n\n\t\tInvalid book number!";
            cout << "\n\n\t\tPress any key to try again...";
            getch();
            viewLentBooks();
            return;
        }
        
        // Mark book as available
        string returnedISBN = borrowedBooks[bookNum-1].isbn;
        for (Book& book : books) {
            if (book.isbn == returnedISBN) {
                book.available = true;
                break;
            }
        }
        
        // Remove from borrowed books
        borrowedBooks.erase(borrowedBooks.begin() + bookNum - 1);
        
        saveBooksToFile();
        saveBorrowedBooksToFile();
        
        cout << "\n\n\t\tBook returned successfully!";
        cout << "\n\n\t\tPress any key to continue...";
        getch();
        viewLentBooks();
    } else {
        adminMenu();
    }
}

void searchBook() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     SEARCH BOOK";
    cout << "\n\n\t\tEnter ISBN to search: ";
    
    string isbn;
    cin >> isbn;
    
    bool found = false;
    for (const Book& book : books) {
        if (book.isbn == isbn) {
            found = true;
            cout << "\n\n\t\tBook found!";
            cout << "\n\n\t\tISBN: " << book.isbn;
            cout << "\n\t\tTitle: " << book.title;
            cout << "\n\t\tAuthor: " << book.author;
            cout << "\n\t\tAvailable: " << (book.available ? "Yes" : "No");
            
            if (!book.available) {
                // Find borrower details
                for (const BorrowedBook& bbook : borrowedBooks) {
                    if (bbook.isbn == isbn) {
                        cout << "\n\n\t\tBorrowed by:";
                        cout << "\n\t\tStudent: " << bbook.studentName;
                        cout << "\n\t\tRoll No: " << bbook.rollNumber;
                        cout << "\n\t\tPhone: " << bbook.phone;
                        cout << "\n\t\tDepartment: " << bbook.department;
                        cout << "\n\t\tIssued on: " << bbook.issueDate;
                        cout << "\n\t\tReturn by: " << bbook.returnDate;
                        break;
                    }
                }
            }
            break;
        }
    }
    
    if (!found) {
        cout << "\n\n\t\tBook not found!";
    }
    
    cout << "\n\n\t\t1. Search another book";
    cout << "\n\t\t2. Exit to menu";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    if (choice == 1) {
        searchBook();
    } else {
        adminMenu();
    }
}

void changeCredentials() {
    system("cls");
    cout << "\n\n\t\tLIBRARY MANAGEMENT SYSTEM";
    cout << "\n\n\t\t     CHANGE CREDENTIALS";
    cout << "\n\n\t\t1. Change Username";
    cout << "\n\t\t2. Change Password";
    cout << "\n\t\t3. Exit to menu";
    cout << "\n\n\t\tEnter your choice: ";
    
    int choice;
    cin >> choice;
    
    switch(choice) {
        case 1: {
            cout << "\n\n\t\tEnter new username: ";
            string newUsername;
            cin >> newUsername;
            
            admin.username = newUsername;
            saveAdminToFile();
            
            cout << "\n\n\t\tUsername changed successfully!";
            cout << "\n\n\t\tPress any key to continue...";
            getch();
            changeCredentials();
            break;
        }
        case 2: {
            cout << "\n\n\t\tEnter current password: ";
            string currentPassword = getMaskedPassword();
            
            if (currentPassword != admin.password) {
                cout << "\n\n\t\tIncorrect password!";
                cout << "\n\n\t\tPress any key to try again...";
                getch();
                changeCredentials();
                return;
            }
            
            cout << "\n\t\tEnter new password: ";
            string newPassword = getMaskedPassword();
            
            admin.password = newPassword;
            saveAdminToFile();
            
            cout << "\n\n\t\tPassword changed successfully!";
            cout << "\n\n\t\tPress any key to continue...";
            getch();
            changeCredentials();
            break;
        }
        case 3:
            adminMenu();
            break;
        default:
            cout << "\n\n\t\tInvalid choice!";
            cout << "\n\n\t\tPress any key to try again...";
            getch();
            changeCredentials();
    }
}

void saveBooksToFile() {
    ofstream outFile("books.txt");
    if (outFile.is_open()) {
        for (const Book& book : books) {
            outFile << book.isbn << "," << book.title << "," << book.author << "," << book.available << "\n";
        }
        outFile.close();
    }
}

void loadBooksFromFile() {
    ifstream inFile("books.txt");
    if (inFile.is_open()) {
        books.clear();
        string line;
        while (getline(inFile, line)) {
            size_t pos1 = line.find(",");
            size_t pos2 = line.find(",", pos1+1);
            size_t pos3 = line.find(",", pos2+1);
            
            if (pos1 != string::npos && pos2 != string::npos && pos3 != string::npos) {
                Book book;
                book.isbn = line.substr(0, pos1);
                book.title = line.substr(pos1+1, pos2-pos1-1);
                book.author = line.substr(pos2+1, pos3-pos2-1);
                book.available = (line.substr(pos3+1) == "1");
                books.push_back(book);
            }
        }
        inFile.close();
    }
}

void saveBorrowedBooksToFile() {
    ofstream outFile("borrowed_books.txt");
    if (outFile.is_open()) {
        for (const BorrowedBook& bbook : borrowedBooks) {
            outFile << bbook.isbn << "," << bbook.studentName << "," << bbook.rollNumber << ","
                   << bbook.phone << "," << bbook.department << "," << bbook.issueDate << ","
                   << bbook.returnDate << "\n";
        }
        outFile.close();
    }
}

void loadBorrowedBooksFromFile() {
    ifstream inFile("borrowed_books.txt");
    if (inFile.is_open()) {
        borrowedBooks.clear();
        string line;
        while (getline(inFile, line)) {
            size_t pos1 = line.find(",");
            size_t pos2 = line.find(",", pos1+1);
            size_t pos3 = line.find(",", pos2+1);
            size_t pos4 = line.find(",", pos3+1);
            size_t pos5 = line.find(",", pos4+1);
            size_t pos6 = line.find(",", pos5+1);
            
            if (pos1 != string::npos && pos2 != string::npos && pos3 != string::npos && 
                pos4 != string::npos && pos5 != string::npos && pos6 != string::npos) {
                BorrowedBook bbook;
                bbook.isbn = line.substr(0, pos1);
                bbook.studentName = line.substr(pos1+1, pos2-pos1-1);
                bbook.rollNumber = line.substr(pos2+1, pos3-pos2-1);
                bbook.phone = line.substr(pos3+1, pos4-pos3-1);
                bbook.department = line.substr(pos4+1, pos5-pos4-1);
                bbook.issueDate = line.substr(pos5+1, pos6-pos5-1);
                bbook.returnDate = line.substr(pos6+1);
                borrowedBooks.push_back(bbook);
            }
        }
        inFile.close();
    }
}

void saveAdminToFile() {
    ofstream outFile("admin.txt");
    if (outFile.is_open()) {
        outFile << admin.username << "," << admin.password << "\n";
        outFile.close();
    }
}

void loadAdminFromFile() {
    ifstream inFile("admin.txt");
    if (inFile.is_open()) {
        string line;
        if (getline(inFile, line)) {
            size_t pos = line.find(",");
            if (pos != string::npos) {
                admin.username = line.substr(0, pos);
                admin.password = line.substr(pos+1);
            }
        }
        inFile.close();
    }
}

string getCurrentDate() {
    time_t now = time(0);
    tm *ltm = localtime(&now);
    
    string year = to_string(1900 + ltm->tm_year);
    string month = to_string(1 + ltm->tm_mon);
    if (month.length() == 1) month = "0" + month;
    string day = to_string(ltm->tm_mday);
    if (day.length() == 1) day = "0" + day;
    
    return year + "-" + month + "-" + day;
}

string getMaskedPassword() {
    string password;
    char ch;
    while ((ch = _getch()) != '\r') { // Until Enter is pressed
        if (ch == '\b') { // Handle backspace
            if (!password.empty()) {
                cout << "\b \b";
                password.pop_back();
            }
        } else {
            cout << '*';
            password += ch;
        }
    }
    return password;
}