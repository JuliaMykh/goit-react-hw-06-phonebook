import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

const items = localStorage.getItem("contacts") !== undefined
  ? JSON.parse(localStorage.getItem("contacts"))
  : [];

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: items,
  reducers: {
    addContact(state, action) {
      state.find(
          contact =>
            action.payload.name.toLowerCase() === contact.name.toLowerCase()
        )
          ? alert(`${action.payload.name} is already in contacts.`)
        : state.push(action.payload);
      
      localStorage.setItem("contacts", JSON.stringify(state.map(item => item)));
    },
    deleteContact(state, action) {
      const index = state.findIndex(item => item.id === action.payload);
      state.splice(index, 1);
    
      localStorage.setItem("contacts", JSON.stringify(state.map(item => item)));
      
    },
  },
});

// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );