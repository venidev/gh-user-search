/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, Component } from "react";
import "./App.css";
import SearchBox from "./components/search/searchbox";
import CardList from "./components/card-list/card-list";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      currentPage: 1,
      total_count: 0,
      userData: {
        items: null,
      }
    };
  }

  onInputChange = (event) => {
   // console.log(event.target.value);
    let searchString = event.target.value;
     this.setState({ searchString: searchString, currentPage: 1}, () => {
            this.makeTopLevelSearch(this.state.searchString, this.state.currentPage);
    });
  
  };



  //This Function does the first level Github Search
  async makeTopLevelSearch  (userName, page)  {

  console.log( "Page "+page);
  if(userName.length > 3){
    let url = `https://api.github.com/search/users?q=`;
    if(userName.includes('@'))
    {
      url = `${url}${userName}+in:email&per_page=5&page=${page}`;
    }else {
      url = `${url}${userName}+in:name&per_page=5&page=${page}`;
    }

    
    let ptok = 'ghp';
    let ptok2= 'NYiMXvOBSWk4EwLtn3Z6j7M';
    ptok = `${ptok}_kkngSBJjBIOIe${ptok2}`;


    await fetch(url, {headers:{
      'Authorization': ptok,
    }}).then((res) => res.json())
      .then((data) => {
        let ids = data.items.map(item => item.login)
        let total_count = data.total_count;
        
        if(total_count > 5) {
          this.setState({total_count: total_count, currentPage: page+1}, () => {console.log("Updated Page  "+(page+1))});
        }
        if(ids.length > 5){
          ids = ids.slice(0,5);
        }
        
        this.getUsers(ids);
      })
      .catch((error) => {
        alert("Error reaching Github");
        console.log("ERROR: ", error);
      });
    }
  };


  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  //Async job to fetch users in the current page
  async getUsers(names) {

    
    let jobs = [];
    let ptok = 'ghp';
    let ptok2= 'NYiMXvOBSWk4EwLtn3Z6j7M';
    ptok = `${ptok}_kkngSBJjBIOIe${ptok2}`;
  
    for(let name of names) {
      await this.delay(1000);
      
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
       results = results.filter(item => item != null);
        userData.items = results;
        this.setState({userData},() => { console.log(this.state)});


    return results;
  }

  render() {
    return (
      <Fragment>
        <h1 style={{paddingLeft: '40%'}}> GitHub User Search </h1>
        <SearchBox onInputChange={this.onInputChange} />
        <div style={{paddingLeft: '30%', paddingRight:'30%'}}>
          <p style={{textAlign: "left"}}>
          {this.state.currentPage > 1 ? (
            
            <a href="#" onClick={() => {  this.setState({currentPage: this.state.currentPage - 1}, 
                  () => {  this.makeTopLevelSearch(this.state.searchString, this.state.currentPage);})}}>  Previous Page </a> ) : null} 
              <span style={{float:"right"}}>
              {this.state.currentPage < this.state.total_count/5 ? (  <a href="#" onClick={() => {  this.setState({currentPage: this.state.currentPage + 1},     () => {  this.makeTopLevelSearch(this.state.searchString, this.state.currentPage);})}}> Next Page </a> ) : null} 
          </span>
      </p>
      </div>


   
        
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
