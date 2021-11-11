import React, { Fragment } from "react";
import { DivStyle, InputStyle } from "./style";
const SearchBox = ({ onInputChange, onKeyDown }) => {
  return (
    <Fragment>
      <form autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <DivStyle>
          <p>Use either name or email as Search String <br/> Eg: Veni Movva or venimovva@gmail.com </p>
          <InputStyle type="search"  placeholder="Enter Search text"  onChange={onInputChange}/>
        </DivStyle>
      </form>
    </Fragment>
  );
};

export default SearchBox;
