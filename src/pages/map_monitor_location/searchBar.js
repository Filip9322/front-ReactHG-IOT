// ** React Imports
import { useState, useEffect } from 'react';

// **  Material Components Imports
import { TextField, Autocomplete } from '@mui/material';

const SearchBar = props => {
  const { controllersNames, updateSearchedController, title } = props;
  
  useEffect(()=>{
    //console.log(controllersNames.length);
  },[props]);
  
  const textFieldInput = params => {
    return (
      <TextField {...params} 
        label={`${title}: `}
        variant='outlined'
        sx={{
          '& fieldset.MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #aaa'
          }
        }}
      />
    )
  }
  
  return (
    <Autocomplete
      id='searchField'
      sx={{
        width: 300, 
        zIndex: 2 ,
        backgroundColor: 'white'
      }}
      clearOnBlur
      autoHighlight
      onChange={(event, newValue) => {
        console.log(newValue);
        if(newValue){
          updateSearchedController(newValue.id);
        }
        //setTimeout(() => { debugger; }, 5000);
      }}
      onClick={(event)=>{event.preventDefault()}}
      getOptionLabel={(option) => {
        return option.name;
      }}
      options={controllersNames.map(controller => controller)}
      renderInput={params => (textFieldInput(params))}
      renderOption={(props, controller) => (
        <li {...props} key={controller.id} value={controller.id}>{controller.name}</li>
      )}
    />
  );
}

export { 
  SearchBar
};