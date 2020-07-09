import React from 'react';
import './App.css';
import axios from "axios";

class App extends React.Component {
  state = {
    books : [],
    text : "",
  }
  
  // searchHandle = () => {
  //   axios
  //   .get("https://www.googleapis.com/books/v1/volumes?q=cat&key=AIzaSyBjvSSu8pvnQiipnJLflOpQs5HQlplPUKQ&maxResults=3")
  //   .then((data) => {
  //     console.log(data.data.items);
  //     this.setState({
  //       books: data.data.items,
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  getInputHandle = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  searchHandle = () => {
    axios
    .get("https://www.googleapis.com/books/v1/volumes?q="+this.state.text+"&key=AIzaSyBjvSSu8pvnQiipnJLflOpQs5HQlplPUKQ&maxResults=8")
    .then((data) => {
      console.log(this.state.text);
      console.log(data.data.items);
      this.setState({
        books: data.data.items,
      })
    })
    .catch((err) => {
      console.log(err);
    });  
  }

handleDescription = (book) => {
  console.log(book.volumeInfo.description);
  document.getElementById("description").innerHTML = book.volumeInfo.description;

}


  render(){
    return (
      <div className="App">
        <input type="text" onChange={(e) => this.getInputHandle(e)}></input>
        <button onClick={this.searchHandle}>Search</button>
        {this.state.books.map((book) => {
          return(
            <div>
              {console.log(book.volumeInfo.imageLinks.thumbnail)}
              
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} onClick={(e) => this.handleDescription(book,e)}/>
              
              {<div>{book.volumeInfo.title}</div>}
              {" Author: "} 
              {book.volumeInfo.authors}
              
              <div id="description">

              </div>
            </div >
            
          ); 
      })}

      </div>
    );
  }
}

export default App;
