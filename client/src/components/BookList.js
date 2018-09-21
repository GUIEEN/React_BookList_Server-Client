import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo' // bind apollo with react
import { getBooksQuery, deleteBookQuery } from '../queries/queries'

// components
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: null }
  }

  displayBooks() {
    var data = this.props.data
    if (data.loading) {
      return <div>Loading books from server...</div>
    }
    return data.books.map(book => (
      <li key={book.id} onClick={e => this.setState({ selected: book.id })}>
        {book.name}
      </li>
    ))
  }

  handleDeleteBook = bookId => {
    this.props.deleteBookQuery({
      variables: {
        id: bookId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
    this.setState({ selected: null })
  }
  render() {
    console.log('this.props ::', this.props)
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails
          bookId={this.state.selected}
          onDeleteBook={this.handleDeleteBook}
        />
      </div>
    )
  }
}

export default compose(
  graphql(getBooksQuery),
  graphql(deleteBookQuery, { name: 'deleteBookQuery' })
)(BookList) // bind this GraphQL query to this Component(BookList)
