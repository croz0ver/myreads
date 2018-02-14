import React, { Component } from 'react';
import BookOptions from './BookOptions';
import sortBy from 'sort-by';



class ListBooks extends Component {
    render() {
        const {title, filter, menu, books} = this.props;
        //console.log('Props', this.props);
        books.sort(sortBy('shelf', 'title'));
        let showingBooks = null;
        if(filter) {
            showingBooks = books.filter(book => book.shelf === filter);
        }        
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks && showingBooks.map((book) => 
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <BookOptions menu={menu} />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors.map((item) => 
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