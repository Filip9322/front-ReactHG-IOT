import { combineReducers } from 'redux';
import { configureStore, createSlice, combineSlices } from "@reduxjs/toolkit";

export const counterSlice = createSlice ({
  name: "counter",
  initialState: { 
    count: 0
  },
  reducers: {
    increment:  (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state) => {
      state.count += action.payload;
    }
  }
});

export const currentLocalArea = createSlice ({
  name: "localArea",
  initialState: {
    id: 0,
    la_name: '',
    logo: ''
  },
  reducers: {
    updateCurrentLA_ID: (state) =>{
      state.id = action.payload
    },
    updateCurrentLA_Name: (state) => {
      state.la_name  = action.payload;
    },
    updateCurrentLA_Logo: (state) => {
      state.logo = action.payload
    }
  }
})

const rootReducer = combineSlices({ 
    counter: counterSlice.reducer,
    currentLA: currentLocalArea.reducer
});

export const store = configureStore({
  reducer: rootReducer
})


/*export const { 
    increment, decrement, incrementByAmount ,
    updateCurrentLA_ID, updateCurrentLA_Name, updateCurrentLA_Logo
  } = rootReducer.actions; */

export const rootActions = {
  ...counterSlice.actions,
  ...currentLocalArea.actions
}

//export const { increment, decrement, incrementByAmount } = counterSlice.actions; 
//export const { updateCurrentLA_ID, updateCurrentLA_Name, updateCurrentLA_Logo } = currentLocalArea.actions;

export default rootReducer;

// const store = createStore(rootReducer);
// import { combineReducers, createStore } from 'redux';