function splitTreasure(treasure) {
  if (areAllSameValue(treasure)) {
    return treasure.map((x) => [x]);
  }

  const sortedTreasure = treasure.sort().reverse();
  const [largestValue, ...remaining] = sortedTreasure;

  const largestValueResult = canSplitTreasure(largestValue, remaining);
  if (largestValueResult.length > 0) {
    return [[largestValue]].concat(largestValueResult);
  }
  
  // Add the largest one of the smaller values, and try again
  let bags = [];
  for (
    let index = remaining.length - 1;
    index >= 0 && bags.length === 0;
    index--
  ) {
    bags = canSplitTreasure(largestValue + remaining[index], sortedTreasure);
  }
  return bags;
}

function areAllSameValue(treasure) {
  return treasure.every((curr) => curr === treasure[0]);
}

function canSplitTreasure(targetValue, sortedTreasure) {
  let treasureRemaining = [...sortedTreasure];
  let resultBucket = [];
  let currentBag = [];

  let currentTarget = targetValue;
  while (treasureRemaining.length > 0) {
    itemToUse = treasureRemaining.findIndex((item) => item <= currentTarget);
    if (itemToUse !== -1) {
      const value = treasureRemaining[itemToUse];
      treasureRemaining.splice(itemToUse, 1);
      currentTarget = currentTarget - value;
      currentBag.push(value);
    } else {
      // console.log("cannot find required value", currentTarget);
      return [];
    }

    if (currentTarget === 0) {
      resultBucket.push(currentBag);
      currentBag = [];
      currentTarget = targetValue;
    }
  }

  if (currentTarget !== targetValue) {
    // console.log('remaining required', currentTarget);
    return [];
  }
  // console.log("resultBucket", resultBucket);
  return resultBucket;
}

module.exports = {
  splitTreasure: splitTreasure,
  canSplitTreasure: canSplitTreasure,
};
