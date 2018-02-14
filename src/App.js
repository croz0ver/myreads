import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
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
  }
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books });
		});
  }

  
	updateBooks(book, shelf){
		BooksAPI.update(book, shelf).then(book => {
			this.setState(state => ({
				books: state.books.concat([book])
			}))
		})
	}
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchBooks title='Searching' menu={menuOptions} books={this.state.books}/>
        )} />
        <Route exact path="/" render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
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
