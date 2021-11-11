import React, { Fragment, Component } from "react";
import "./App.css";
import SearchBox from "./components/search/searchbox";
import CardList from "./components/card-list/card-list";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      userData: "",
    };
  }

  onInputChange = (event) => {
   // console.log(event.target.value);
    let searchString = event.target.value;
     this.setState({ searchString: searchString}, () => {
            this.makeTopLevelSearch(this.state.searchString);
    });
  
  };

  //This Function does the first level Github Search
  makeTopLevelSearch = (userName) => {
  if(userName.length > 3){
    let url = `https://api.github.com/search/users?q=`;
    if(userName.includes('@'))
    {
      url = `${url}${userName}+in:email`;
    }else {
      url = `${url}${userName}+in:name`;
    }

    fetch(url, {headers:{
      'Authorization': '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',
    }}).then((res) => res.json())
      .then((data) => this.setState({ userData: data }))
      .catch((error) => {
        alert("Error reaching Github");
        console.log("ERROR: ", error);
      });
    }
  };

  render() {
    return (
      <Fragment>
        <h1 style={{paddingLeft: '40%'}}> GitHub User Search </h1>
        <SearchBox onInputChange={this.onInputChange} />
        {this.state.userData.items != null && this.state.searchString !== "" && this.state.userData.items.length> 0 ? (
            <CardList userData={this.state.userData.items} />
        ) : (
          <div>
             <br />
          </div>
        )}


      </Fragment>
    );
  }
}

export default App;
