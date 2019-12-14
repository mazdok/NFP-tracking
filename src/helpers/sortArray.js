export default function sortArrayWithUndefined(type) {
    return function(a, b) {
      // equal items sort equally
      if (a === b) {
        return 0;
      }
      // nulls sort after anything else
      else if (a === undefined) {
        return 1;
      } else if (b === undefined) {
        return -1;
      }
      // otherwise, if we're ascending, lowest sorts first
      else if (type === 'ASC') {
        return a < b ? -1 : 1;
      }
      // if descending, highest sorts first
      else {
        return a < b ? 1 : -1;
      }
    };
}
