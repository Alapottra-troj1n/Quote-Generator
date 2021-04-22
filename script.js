const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const fbButton = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


//Show Loading Image
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote From API
async function getQuote(){
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        //if authoir is blank add unkown
        if(data.quoteAuthor === ''){
            auhtorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        //reduce fontsize for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quote.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText;
        //show quote text
        complete();
    } catch(e){
        getQuote();
    }
}


function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const fbUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(fbUrl, '_blank');
}


//eventlisterner

newQuoteBtn.addEventListener('click' ,  getQuote);
fbButton.addEventListener('click', tweetQuote);


//On Load
getQuote();