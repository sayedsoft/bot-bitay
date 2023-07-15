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

function generateRandomAmount(rangeMin: number, rangeMax: number): number {
  return Math.random() * (rangeMax - rangeMin) + rangeMin;
}

function calculateAmount(
  quantity: number,
  price: number,
  baseCurrency: boolean,
): number {
  if (baseCurrency) {
    return quantity * price;
  } else {
    return quantity / price;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { calculateAmount, generateRandomAmount, paramsToString, sleep };
