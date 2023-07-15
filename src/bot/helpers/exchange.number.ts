const paramsToString = (params) => {
  let text = "", len = Object.entries(params).length, lenf = 1;
  for (const [key, value] of Object.entries(params)) {
    const pp = value;
    text = text + key + "=" + pp;
    if (lenf !== len) text = text + "&";
    lenf++;
  }

  return text;
};

export { paramsToString };
