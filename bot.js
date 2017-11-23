const humanizeDuration = require ("humanize-duration");
const moment           = require ("moment");
const Twit             =  require ("twit");
const config           =  require ("./config");

// Sends the first tweet and then the bot keeps sending them every 5 minutes (setInterval)
sendTweet();
setInterval(sendTweet, 1000*60*5);

// Connects with the Twitter API and sends our status update
function sendTweet() {
    const Tweet = new Twit(config);

    // Arguments to make Tweet.post function work
    const params = {
        status: countdownMessage()
    };
    function tweet(err, data, response) {
        if (err) {
            console.log("Something went wrong :(");
        } else {
            console.log("Tweet sent!");
        }
    };

    // Sending out tweet
    Tweet.post('statuses/update', params, tweet);
};

// Returns the message to send as our status update
function countdownMessage() {
    // World Cup Start Date (June 14, 2018)
    const worldCupDateInfo = {
        'year': 2018,
        'month': 5,
        "date": 14,
        "hour": 12,
        "minute": 0,
        "second": 0
    };

    // Configuration for making humanizeDuration output a more readable date
    const humanizeDurationConfig = {
        largest: 5,
        round: true,
        conjunction: ' and ',
        serialComma: false
    }

    const now = moment();
    const worldCupStartDate = moment().set(worldCupDateInfo);
    const timeDifference = moment.duration(now.diff(worldCupStartDate));
    const humanReadbleDifference = humanizeDuration(timeDifference, humanizeDurationConfig);
    return `Only ${humanReadbleDifference} until #Russia2018!`
};
