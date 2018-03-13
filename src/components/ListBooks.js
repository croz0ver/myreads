import React, { Component } from 'react';
import BookOptions from './BookOptions';
import sortBy from 'sort-by';



class ListBooks extends Component {
    findBooks(books, book){
        let ret = 'None';
        books.map((b) => {
            if(b.id === book.id){
                ret = b.shelf;
            }
        });
        return ret;
    }  
    render() {
        const {title, filter, books, getStatus, update, bookList} = this.props;
        
        let showingBooks = books;
        if(filter) {
            books && books.length > 0 && books.sort(sortBy('shelf', 'title'));
            showingBooks = books.filter(book => book.shelf === filter);
        }  
        else {
            books && books.length > 0 && books.sort(sortBy('title'));
        }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks && showingBooks.length > 0 && showingBooks.map((book) => 
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                                        <BookOptions update={update} book={book} sel={book.shelf ? book.shelf : this.findBooks(bookList, book)}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors && book.authors.map((item) => 
                                        <div key={item} className="book-authors">{item}</div>
                                    )}
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ListBooks;