import React from "react";
import Card from "../card/card";
import { Clist } from "./style";

const CardList = (userProfiles) => {
  let userDataArray = Object.values(userProfiles.userData);
 console.log(userDataArray);


  if(userDataArray !=null && userDataArray.length > 0){
    return (
      <Clist>
        {userDataArray.map((user) => (
          <Card key={user.id} userProfile={user} />
        ))}
      </Clist>
    );
  }else{
    return null;
  }
  
};

export default CardList;
