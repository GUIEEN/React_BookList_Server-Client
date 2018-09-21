import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
      warnMessage: ''
    }
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery
    if (data.loading) {
      return <option disabled>Loading Authors...</option>
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ))
  }

  submitForm(e) {
    e.preventDefault()
    const { name, genre, authorId } = this.state
    if (name && genre && authorId) {
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      })
      this.setState({ name: '', genre: '', authorId: '', warnMessage: '' })
      return
    }
    this.setState({ warnMessage: 'validation fails' })
  }

  render() {
    return (
      // bind submitForm to Component
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        {this.state.warnMessage && <p>{this.state.warnMessage}</p>}
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={e => this.setState({ authorId: e.target.value })}
            value={this.state.authorId}
          >
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

// export default graphql(getAuthorsQuery)(AddBook)
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
