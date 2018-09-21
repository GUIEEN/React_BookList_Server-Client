import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo' // bind apollo with react
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails() {
    console.log(this.props)
    const { book } = this.props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All bookd by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <button onClick={() => this.props.onDeleteBook(book.id)}>
            Delete
          </button>
        </div>
      )
    }
    return <div>No book selected...</div>
  }
  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>
  }
}

export default compose(
  graphql(getBookQuery, {
    options: props => {
      console.log('props::', props)
      return {
        variables: {
          id: props.bookId
        }
      }
    }
  })
)(BookDetails)
