/**
 * this function is used to filter the array of objects or array of values
 */

const filterArray = (input_array, source) => {
  let filteredData = [];
  if (input_array.length && source) {
    const sourceType = typeof source;
    filteredData = input_array.filter((contentInfo) => {
      let isKeyMatched = false;
      // if data pass this format filterArray([xxx],"xxx") this condition will execute
      if (sourceType === "string") {
        // we will match the string with all keys in the array and we will filter that
        Object.keys(contentInfo).map((keysInfo) => {
          if (contentInfo[keysInfo].toLowerCase() === source.toLowerCase()) {
            isKeyMatched = true;
          } else {
            isKeyMatched = false;
          }
        });
      } else if (sourceType === "object") {
        /* this will work for both array and object */
        const sourceRawData = source.length ? source : [source];
        /* we will iterate array with all keys in all object and 
        match with source array or object and will return the value */
        var validData = sourceRawData.map((keysInfo) => {
          let isDataMatch = Object.keys(keysInfo).map(
            (listKey) => contentInfo[listKey] === keysInfo[listKey]
          );
          /** this will return if data keys matches true or false */
          return !isDataMatch.some((IsFalseKey) => IsFalseKey === false);
        });
        if (validData.indexOf(true) !== -1) {
          isKeyMatched = true;
        } else {
          isKeyMatched = false;
        }
      }

      return isKeyMatched;
    });
  }

  return filteredData;
};

/** this function is used to match the keys is in the array it will return true or false
 * i.e input_array=[{ id: 1, name: "penchal"},{ id: 1, name: "anki"}]
 * source=[{ id: 1, name: "anki"}]or { id: 1, name: "anki"}
 *
 */
const verifySameDataAvailableInArray = (input_array, source) => {
  let isValidArray = false;

  if (input_array.length && source) {
    const sourceRawData = source.length ? source : [source];
    var isValidStatics = sourceRawData.map((sourceInfo) => {
      let validData = Object.keys(sourceInfo).map((listKey) =>
        input_array.some(
          (listItem) => listItem[listKey] === sourceInfo[listKey]
        )
      );

      return validData;
    });
  }
  /** isValidStatics will return the array of arrays with boolean flag */
  var mergedData = [].concat.apply([], isValidStatics);

  isValidArray = !mergedData.some(
    (iaFalseAvailable) => iaFalseAvailable === false
  );
  return isValidArray;
};

const filterUniqueObjectFromArrayBasedOnKey = (input_array, source) => {
  let filteredUnique = [];
  /** this function is used to filter the unique array based on the passed key */
  if (input_array && source) {
    filteredUnique = input_array.reduce((unique, nextKey) => {
      if (!unique.some((planInfo) => planInfo[source] === nextKey[source])) {
        unique.push(nextKey);
      }
      return unique;
    }, []);
  }

  return filteredUnique;
};

const removeDuplicatedFromArray = (input_array) => {
  /** this is predefined java script method we are using for to remove the duplicates */
  return [...new Set(input_array)];
};

const findMinOrManValueData = ({ input_array, sort_type, key_name }) => {
  // filter for best lowest rate plans
  const minOrMaxData = input_array.reduce((accumulator, cumulates) => {
    let filteredObject = {};
    if (sort_type.toLowerCase() === "min") {
      filteredObject =
        parseFloat(accumulator[key_name]) < parseFloat(cumulates[key_name])
          ? accumulator
          : cumulates;
    } else if (sort_type.toLowerCase() === "max") {
      filteredObject = filteredObject =
        parseFloat(accumulator[key_name]) > parseFloat(cumulates[key_name])
          ? accumulator
          : cumulates;
    }
    return filteredObject;
  });
  return minOrMaxData;
};

const removeEmptyKeyArrayOfObjects = (input_array) => {
  /** removing empty array object keys  */
  input_array = input_array.filter((objectKeysInfo) => {
    return !!Object.values(objectKeysInfo).filter((value) => {
      const isValidKey = value && value.toString().trim();
      return !!isValidKey;
    }).length;
  });

  // we are trimming spaces in object keys by  signifying and replacing that space with starts '"'
  input_array = JSON.parse(
    JSON.stringify(input_array).replace(/"\s+|\s+"/g, '"')
  );

  return input_array;
};

let users = [
  { id: 1, name: "  " },
  { id: 2, name: "" },
  { id: " ", name: "" },
];

let result = removeEmptyKeyArrayOfObjects(users);

console.log(result);

module.exports = {
  filterArray,
  verifySameDataAvailableInArray,
  filterUniqueObjectFromArrayBasedOnKey,
  removeDuplicatedFromArray,
  findMinOrManValueData,
  removeEmptyKeyArrayOfObjects,
};
