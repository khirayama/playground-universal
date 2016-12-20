export function initializeHomePage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({
      type: '__INITIALIZE_HOME_PAGE',
    });
    resolve();
  });
}

export function initializeCountPage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({
      type: '__INITIALIZE_COUNT_PAGE',
    });
    resolve();
  });
}

