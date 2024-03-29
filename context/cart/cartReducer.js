export const cartReducer = (state, action) => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };

    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    case "[Cart] - Update Address":
    case "[Cart] - LoadAddress from Cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "[Cart] - Order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        total: 0,
      };
    case "[Cart] - Reset Cart":
      return { ...action.payload };

    default:
      return state;
  }
};
