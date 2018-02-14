import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks';
import { Route, Link } from 'react-router-dom';

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
    books: [],
    query: '',
  }
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books });
		});
  }

  updateQuery = (query) => {
      this.setState({query: query });
  }
  clearQuery = () => {
    this.setState({query: ''});
  }

  search = (query) => {
    console.log(this.state.books)
    BooksAPI.search(query).then((response) => {
      
      this.setState({ books:response });
      console.log(response);
    });
    this.updateQuery(query);
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" 
                  value= {this.state.query} 
                  onChange ={(event) => this.search(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <ListBooks title='Searching...' menu={menuOptions} books={this.state.books}/>
              </ol>
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
