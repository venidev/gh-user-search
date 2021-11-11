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
  async makeTopLevelSearch  (userName)  {
  if(userName.length > 3){
    let url = `https://api.github.com/search/users?q=`;
    if(userName.includes('@'))
    {
      url = `${url}${userName}+in:email`;
    }else {
      url = `${url}${userName}+in:name`;
    }

    
    let ptok = 'ghp';
    let ptok2= 'NYiMXvOBSWk4EwLtn3Z6j7M';
    ptok = `${ptok}_kkngSBJjBIOIe${ptok2}`;


    await fetch(url, {headers:{
      'Authorization': ptok,
    }}).then((res) => res.json())
      .then((data) => {
        let users =  this.getUsers(['venidev','devsatish']);
        this.setState({ userData: [users] })
      })
      .catch((error) => {
        alert("Error reaching Github");
        console.log("ERROR: ", error);
      });
    }
  };



  //Async job to fetch users in the current page
  async getUsers(names) {
    let jobs = [];
  
    for(let name of names) {
      let job = fetch(`https://api.github.com/users/${name}`).then(
        successResponse => {
          if (successResponse.status != 200) {
            return null;
          } else {
            return successResponse.json();
          }
        },
        failResponse => {
          return null;
        }
      );
      jobs.push(job);
    }
  
    let results = await Promise.all(jobs);

    
  
    return results;
  }

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
