import React, { Component } from 'react';
import ListBooks from './ListBooks';
import {Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        books: [],
    }
    updateQuery = (query) => {
        this.setState({ query: query });
        query.length > 1 && 
            this.searchBooks(query);
        
    }
    clearQuery = () => {
        this.setState({ query: '' });
    }
    searchBooks = (query) => {
        BooksAPI.search(query).then((response) => {
            this.setState({ books: "error" in response ? [] : response });
        });
        console.log(this.state.books)
      }    
    render() {
        const { title, menu, books } = this.props;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books && (
                            <ListBooks title={title} menu={menu} books={this.state.books} />
                        )}
                    </ol>
                </div>
            </div>

        )
    }

}

export default SearchBooks;