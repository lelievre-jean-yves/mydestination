
export function selectInput(reducerName, property) {
  const input = (state) => state[reducerName][property];

  return input;
}

export function selectFieldState(reducerName, property) {
  const fieldState = (state) => state[reducerName].isFocused[property];

  return fieldState;
}

