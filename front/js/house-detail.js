var supRealEstate;
var userAccount;

function startApp() {
    supRealEstate = new web3js.eth.Contract(supRealEstateABI, supRealEstateAddress);

    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            updateButton($.urlParam('id'))
        }
    }, 100);
    displayHouse($.urlParam('id'));
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

function updateButton(id){
    getOwnerByHouseId(id).then(address => {
        if(address.toUpperCase() == userAccount.toUpperCase()){
            if($("#buy-button").html() !== "Edit") {
                getHouseById($.urlParam('id')).then(house => {
                    if (house[5]){
                        $("#buy-button").html("Remove from sale")
                    } else {
                        $("#buy-button").html("Put on sale")
                    }
                    $("#buy-button").off("click", buyHouse)
                    $("#buy-button").click(toggleOnSale)
                })
            }

        } else {
            if($("#buy-button").html() !== "Buy") {
                $("#buy-button").html("Buy")
                $("#buy-button").off("click", editHouse)
                $("#buy-button").click(buyHouse)
            }
        }
    })
}

function displayHouse(id){
    getHouseById(id).then(house => {
        $("#house-container").append(`
            <img class="house-image" src="${house[4]}"/>
            <div class="house-detail">
                <div class="house-annonce-name"><h2>${house[1]}</h2></div>
                <div class="house-description">
                    <p>
                        ${house[2]}
                    </p>
                </div>
                <div class="house-informations">
                    <p><b>Address:</b> ${house[3]}</p>
                    <p><b>Price:</b> ${house[6]} ETH</p>
                    <p><b>Size:</b> ${house[7]}m2</p>
                    <p><b>Number of rooms:</b> ${house[8]}</p>
                </div>
            </div>
        `)
    })
}

function toggleOnSale(){
    getHouseById($.urlParam('id')).then(house => {
        setOnSale(house[0], !house[5])
    })
}

function buyHouse(){
    getHouseById($.urlParam('id')).then( house => {
        getOwnerByHouseId($.urlParam('id')).then( ownerAddress =>{
            transferHouse(house, ownerAddress);
        })
    })
}

function editHouse(){
    console.log("Going to edit house");
}

function getOwnerByHouseId(id){
    return supRealEstate.methods.ownerOf(id).call();
}

function getHouseById(id){
    return supRealEstate.methods.getHouseById(id).call();
}

function setOnSale(id, onSale){
    $("#information").html("Your transaction is being proceed")
    return supRealEstate.methods.setOnSale(id, onSale)
    .send({from: userAccount})
    .on("receipt", function(receipt) {
        $("#information").html("Transaction complete")
        location.reload();
    })
    .on("error", function(error) {
        $("#information").html("Transaction failed")
      console.log(error);
    });
}

function transferHouse(house, ownerAddress){
    $("#information").html("Your transaction is being proceed")
    return supRealEstate.methods.safeTransferFrom(ownerAddress, userAccount, house[0])
    .send({ 
        from: userAccount, 
        value: web3js.utils.toWei(house[6], "ether") 
    })
    .on("receipt", function(receipt) {
        $("#information").html("Transaction complete")
        location.reload();
    })
    .on("error", function(error) {
        $("#information").html("Transaction failed")
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