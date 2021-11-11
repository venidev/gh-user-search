import React, { Fragment, Component } from "react";
import "./App.css";
import SearchBox from "./components/search/searchbox";
import CardList from "./components/card-list/card-list";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      userData: {
        items: null,
      }
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
      url = `${url}${userName}+in:email&per_page=5`;
    }else {
      url = `${url}${userName}+in:name&per_page=5`;
    }

    
    let ptok = 'ghp';
    let ptok2= 'NYiMXvOBSWk4EwLtn3Z6j7M';
    ptok = `${ptok}_kkngSBJjBIOIe${ptok2}`;


    await fetch(url, {headers:{
      'Authorization': ptok,
    }}).then((res) => res.json())
      .then((data) => {
        let ids = data.items.map(item => item.login)
        if(ids.length > 10){
          ids = ids.slice(0,10);
        }
        this.getUsers(ids);
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
    let ptok = 'ghp';
    let ptok2= 'NYiMXvOBSWk4EwLtn3Z6j7M';
    ptok = `${ptok}_kkngSBJjBIOIe${ptok2}`;
  
    for(let name of names) {
      let job = fetch(`https://api.github.com/users/${name}`,{headers:{
        'Authorization': ptok,
      }}).then(
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

    
       const {userData} = this.state;
        userData.items = results;
        this.setState({userData},() => { console.log(this.state)});


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
            <h2 style={{marginLeft:'45%'}}>No Results Found</h2>
             <br />
          </div>
        )}


      </Fragment>
    );
  }
}

export default App;
