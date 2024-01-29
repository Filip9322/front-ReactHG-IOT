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
    updateCurrentLA_ID: (state, action) =>{
      state.id = action.payload
    },
    updateCurrentLA_Name: (state, action) => {
      state.la_name  = action.payload;
    },
    updateCurrentLA_Logo: (state, action) => {
      if(action.payload) {
        state.logo = action.payload
      } else {
        state.logo = '/images/wide-areas/1-서울특별시.png';
      }
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

export const rootActions = {
  ...counterSlice.actions,
  ...currentLocalArea.actions
}

export default rootReducer;