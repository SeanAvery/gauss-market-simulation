const initState = {
  priceHistory: []
}

export default function price(state = initState, { type, data }) {
  switch (type) {
    case 'appendPriceHistory':
      return {
        ...state,
        priceHistory: [...state.priceHistory, data]
      }
    default:
      return state
  }
}
