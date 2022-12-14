function actionConverter(option) {
  // console.log("actionConverter: input: ", option); //debugging
  if (option.includes(' ')) {
    option.replace(' ', '');
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
  let action = capitalizeFirstLetter(camelize(capitalizeFirstLetter(option)));
  console.log('actionConverter: action from input: handle' + action)
  return 'handle' + action
}

export default actionConverter;