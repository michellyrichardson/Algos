//Apple Stocks
//Find out how much money you could made yesterday in Apple's Stock
//grab prices from yesterday and put in an Array called stockPrices
//Indices are the time (in minutes) past trade opening time, at 9:30 local time
//the values are price of one share of Apple stock at time
//so if stock cost $500 at 10:30am, that means stockPrices[60] = 500

//write an function that takes StockPrices and returns the best profit I could have made
//from one purchase and one sale of one share of Apple stock yesterday

//For Example
const stockPrices = [10, 7, 5, 8, 11, 9];
getMaxProfit(stockPrices);
//returns 6 (buying for $5 and selling for $11)

//--You need to buy before you can sell. Also, you cant buy and sell in the same time step
//at least 1 minute has to pass
//you can't take highest price and the lowest price, because highest price might come before 
//the lowest price. If the prices goes down all day, the best profit will be negative.

// greedily walk through the array to track the max profit and lowest price so far

// for every price check if:
//1. we can get a better profit by buying at a minPrice and selling at the currentPrice
//2. we have a new minPrice

//To Start
//1.minPrice as the first price of the day
//2.maxProfit as the first profit we could get
//we have decided to return a negative profit if the prices decreases all day and we can't
//make any money to make the function less opinionated, and ensures we don't lose information.

function getMaxProfit(stockPrices) {
    if (stockPrices.length < 2) {
        throw new Error('getting a profit requires at least 2 prices');
    }

    //We'll greedily update minPrice and maxProfit, so we initialize
    //them to the first price and the first possible profit
    let minPrice = stockPrices[0];
    let maxProfit = stockPrices[1] - stockPrices[0];

    //Start at the second (index 1) time
    //we can't sell at the first time, since we must buy first,
    // and we can't buy and sell at the same time!
    //if we start at index 0, we'd try to buy and sell at time 0
    //it would give a profit 0, which is a problem if our
    //maxProfit is supposed to be negative (returning 0)
    for (let i = 1; i < stockPrices.length; i++){
        const currentPrice = stockPrices[i];
        //check what our profit would be if we buy at
        //min price and sold at the current price
        const potentialProfit = currentPrice - minPrice;
        //update maxProfit if we can do better
        maxProfit = Math.max(maxProfit, potentialProfit);
        //update min price so it's always
        //the lowest price we've seen so far
        minPrice = Math.min(minPrice, currentPrice);
    }
    return maxProfit;
}
console.log(getMaxProfit(stockPrices));