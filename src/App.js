import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import { Route, Link } from 'react-router-dom';



class BooksApp extends React.Component {
  state = {
    books: [],
  }
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books });
		});
  }

  
	updateBooks2(book, shelf){
    console.log('teste'+ shelf)
		BooksAPI.update(book, shelf).then(book => {
			this.setState(state => ({
				books: state.books.concat([book])
			}))
		})
  }

 updateBooks = (book, shelf) => {
       BooksAPI.update(book, shelf)
       this.setState((prevState) => {
           return {books: prevState.books.map((b) => {
               if (b.id === book.id) {
                   b.shelf = shelf
                   return {...b}
               }else{
                   return b
               }
           })}
       })
   } 
  getBookStatus(book){
    let id = book.id
		return BooksAPI.get(id).then((bookRet) => {
        return bookRet.shelf===book.shelf ? book.shelf : 'None';
      
    });
    
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchBooks title='Searching' update={this.updateBooks} books={this.state.books}/>
        )} />
        <Route exact path="/" render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks title='Currently Reading' filter='currentlyReading'  books={this.state.books} getStatus={this.getBookStatus} update={this.updateBooks}/>
                <ListBooks title='Want to Read' filter='wantToRead' books={this.state.books} getStatus={this.getBookStatus} update={this.updateBooks}/>
                <ListBooks title='Read' filter='read' books={this.state.books} getStatus={this.getBookStatus} update={this.updateBooks}/>
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
