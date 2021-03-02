var supRealEstate;
var userAccount;

function startApp() {
    supRealEstate = new web3js.eth.Contract(supRealEstateABI, supRealEstateAddress);

    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        }
    }, 100);

    displayHouses()

}
    
    function displayHouses(){
        getHousesLength().then(logHouses)
    }

    function displayHouse(house){
        if(house[5]){
            $("#sell-house-container").append(`
                <a class="house-card" href="house-detail.html?id=${house[0]}">
                    <img class="house-card-img" src="${house[4]}"/>
                    <div class="house-card-information">
                        <div class="house-card-title"><h2>${house[1]}</h2></div>
                        <div class="house-card-detail">
                            <p>Address: ${house[3]}</p>
                            <p>Price: ${house[6]} ETH</p>
                            <p>Size: ${house[7]}m2</p>
                        </div>
                    </div>
                </a>`);
        }
    }

    function getHouseById(id){
        return supRealEstate.methods.getHouseById(id).call();
    }

    function getHousesLength(){
        return supRealEstate.methods.getHousesLength().call();
    }

    function logHouses(housesNumber){
        for (id = 0; id < housesNumber; id++) {
            getHouseById(id).then(displayHouse)
        }
    }

window.addEventListener('load', function() {

    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
    } else {
        alert("You need to install metamask to use this website.")
    }

    startApp();
})