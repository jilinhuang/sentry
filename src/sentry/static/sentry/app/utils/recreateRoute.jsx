import {findLastIndex} from 'lodash';

export default function recreateRoute(to, {routes, params, stepBack}) {
  let paths = routes.filter(({path}) => path).map(({path}) => path);
  let lastRootIndex = findLastIndex(paths, path => path[0] === '/');
  let baseRoute = paths.slice(lastRootIndex);

  if (typeof stepBack !== 'undefined') {
    baseRoute = baseRoute.slice(0, stepBack);
  }

  let fullRoute = `${baseRoute.join('')}${to}`;

  // parse route params from route
  let matches = fullRoute.match(/:\w+/g);

  if (!matches || !matches.length) {
    return fullRoute;
  }

  // replace with current params
  matches.forEach(param => {
    let paramName = param.slice(1);
    if (typeof params[paramName] === 'undefined') return;

    fullRoute = fullRoute.replace(param, params[paramName]);
  });

  return fullRoute;
}
