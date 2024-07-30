import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Explicitly return a new state with the updated items array
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        // Remove the item at the found index by creating a new array
        return {
          ...state,
          items: [
            ...state.items.slice(0, index), // Elements before the item to remove
            ...state.items.slice(index + 1), // Elements after the item to remove
          ],
        };
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket!`
        );
        return state; // No change to the state if the item is not found
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithID = (state, id) => state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
