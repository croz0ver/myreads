import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks';
import { Route } from 'react-router-dom';

const menuOptions = [
  {
    "value": "none", 
    "disable": "disabled",
    "title": "Move to...",
  },
  {
    "value": "currentlyReading", 
    "disable": "",
    "title": "Currently Reading"
  },
  {
    "value": "wantToRead", 
    "disable": "",
    "title": "Want to Read",
  },
  {
    "value": "read", 
    "disable": "",
    "title": "Read",
  },
  {
    "value": "none", 
    "disable": "",
    "title": "None",
  }
]

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    query: '',
  }
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books });
		})
	}

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks title='Currently Reading' filter='currentlyReading' menu={menuOptions} books={this.state.books}/>
                <ListBooks title='Want to Read' filter='wantToRead' menu={menuOptions} books={this.state.books}/>
                <ListBooks title='Read' filter='read' menu={menuOptions} books={this.state.books}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
