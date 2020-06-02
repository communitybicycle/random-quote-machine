class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="quote" id="text">
        <p>"{this.props.quote}"</p>
      </div>
    );
  }
}

class Author extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="author" id="author">
        <p>
          <em>~{this.props.author}</em>
        </p>
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <h2>Random Quote Machine</h2>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
    this.getQuote = this.getQuote.bind(this);
  }

  async getQuote() {
    let data = fetch("https://quote-garden.herokuapp.com/quotes/random")
      .then((results) => {
        return results.json();
      })
      .then((data) =>
        this.setState({
          quote: data.quoteText,
          author: data.quoteAuthor,
        })
      )
      .catch((e) => console.log(e));
  }

  componentDidMount() {
    this.getQuote();
  }

  render() {
    return (
      <div className="content">
        <Title />
        <Quote quote={this.state.quote} />
        <Author author={this.state.author} />
        <div className="quote-button" id="quote-button">
          <button id="new-quote" onClick={this.getQuote}>
            New Quote
          </button>
        </div>
        <div id="tweeter">
          <a
            href={
              "http://twitter.com/intent/tweet?text=" +
              this.state.quote +
              " -" +
              this.state.author
            }
            attribute={this.state.quote}
            id="tweet-quote"
            target="_blank"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-twitter-512.png"
              height="32px"
              width="32px"
            />
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("quote-box"));
