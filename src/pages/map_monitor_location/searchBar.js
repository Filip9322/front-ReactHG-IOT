// ** React Imports
import { useRef, useState, useEffect } from 'react';

// **  Material Components Imports
import { TextField, Autocomplete } from '@mui/material';

const SearchBar = props => {
  // ** Props
  const { controllersNames, updateSearchedController, title, cleanField, fieldName } = props;
  
  // ** Hooks
  const autoCompleteRef = useRef(null);
  
  
  
  useEffect(() => {
    //console.log(fieldName + ': ' + controllersNames.length);
  }, [controllersNames])
  
  useEffect(()=>{
    
  },[cleanField]);
  
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
      id={fieldName}
      sx={{
        width: 300, 
        zIndex: 2 ,
        backgroundColor: 'white'
      }}
      open={cleanField}
      clearOnBlur ={false}
      clearText={'지우기'}
      openText={'선택'}
      autoHighlight
      onChange={(event, newValue) => {
        //console.log(newValue);
        if(newValue){
          updateSearchedController(newValue.value, fieldName);
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
        <li {...props} key={controller.id} value={controller.value}>{controller.name}</li>
      )}
    />
  );
}

export { 
  SearchBar
};