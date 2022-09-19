// read from localStorage
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

// write to localStorage
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
