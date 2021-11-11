import React from "react";

import { CardContainer } from "./style";
import { GithubAvatar } from "./style";
import { ProfileContent } from "./style";

const Card = ({ userProfile }) => {
  return (
    <CardContainer>
      <div style={{marginRight: '3px'}}>
        <GithubAvatar src={userProfile.avatar_url} alt={userProfile.name} />
      </div>
      <ProfileContent>
        <div>Username: {userProfile.login}</div>
        <div>
          GitHub:{" "}
          <a href={userProfile.html_url} target="_blank" rel="noreferrer noopener">
            {userProfile.html_url}
          </a>
        </div>
        <div>Real Name: {userProfile.name}</div>
        <div>Email: {userProfile.email}</div>
        <div>Location:{userProfile.location}</div>
        <div>Count of Public repos: {userProfile.public_repos}</div>
        

        <div>Account Created : {new Intl.DateTimeFormat('en-US', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(userProfile.created_at))}</div>

        <div>Account Last Updated : {new Intl.DateTimeFormat('en-US', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(userProfile.updated_at))}</div>
      </ProfileContent>
    </CardContainer>
  );
};

export default Card;
