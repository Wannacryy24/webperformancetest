export const navigateTo = (navigate, path) => {
  if (typeof navigate === 'function') {
    navigate(path);
  } else {
    console.warn('navigateTo: invalid navigate function');
  }
};
