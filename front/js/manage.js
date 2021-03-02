var supRealEstate;
var userAccount;
var housesloaded;

function startApp() {
    supRealEstate = new web3js.eth.Contract(supRealEstateABI, supRealEstateAddress);
    housesloaded = false;
    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        }
        if(!housesloaded){
            housesloaded = true;
            if($('#manage-house-container').is(':empty')){
                displayHouses();
            }
        }
    }, 100);

}
    
    function displayHouses(){
        getHouseIds(userAccount).then(logHouses)
    }

    function displayHouse(house){
            $("#manage-house-container").append(`
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

    function getHouseById(id){
        return supRealEstate.methods.getHouseById(id).call();
    }

    function getHouseIds(address){
        return supRealEstate.methods.getHouseIds(address).call();
    }

    function logHouses(ids){
        for (const id of ids) {
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