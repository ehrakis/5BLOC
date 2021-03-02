var supRealEstate;
var userAccount;

function startApp() {
    supRealEstate = new web3js.eth.Contract(supRealEstateABI, supRealEstateAddress);

    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        }
        if($("#core-section").is(':empty')){
            
            getContractOwner().then(owner => {
                if(owner.toUpperCase() == userAccount.toUpperCase()){
                    $("#core-section").append(`<button id="buy-button">Retreive token funds</button>`)
                    $("#buy-button").click(getFundsFromContract)
                }
            })
        }
    }, 500);
}

function readBalance(){
    getBalance().then(ammount => {
        console.log(ammount)
    })
}

function retrieveFunds(){
    getFundsFromContract.then( _ => {
        console.log("succeed")
    })
}

function getContractOwner(){
    return supRealEstate.methods.owner().call()
}

function getBalance(){
    return supRealEstate.methods.getBalance().call()
}

function getFundsFromContract(){

    supRealEstate.methods.withdraw()
    .send({from: userAccount})
    .on("receipt", function(receipt) {
        console.log("Funds retrieved");
    })
    .on("error", function(error) {
      console.log(error);
    });
}

window.addEventListener('load', function() {

    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
    } else {
        alert("You need to install metamask to use this website.")
    }

    startApp();
})