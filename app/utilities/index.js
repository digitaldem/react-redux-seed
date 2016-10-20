import { mapValues, isEqualWith } from 'lodash';
import querystring from 'querystring';


export function appendUrlParameters(url, params) {
  const _params = mapValues(params, val =>
    (val instanceof Array) ? val.join(',') : val
  );
  return `${url}?${querystring.stringify(_params)}`;
}

export function isEqual(a, b) {
  return isEqualWith(a, b, (a, b) =>
    ((typeof a === 'function' || typeof b === 'function') ? true : undefined)
  );
}
