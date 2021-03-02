var supRealEstate;
var userAccount;

function startApp() {
    var supRealEstateAddress = "0x99c5e7c40Caa1Ed127E7281De1799363AB9CC6Dc";
    supRealEstate = new web3js.eth.Contract(supRealEstateABI, supRealEstateAddress);

    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        }
    }, 100);
}

function createHouse(name, description, address, image, price, onSale, size, roomNumber) {
    $("#information").text("Token creation sent. This may take a while...");

    return supRealEstate.methods.createHouse(name, description, address, image, onSale, price, size, roomNumber)
    .send({ from: userAccount })
    .on("receipt", function(receipt) {
      $("#information").text("Token successfully created!");
    })
    .on("error", function(error) {
      $("#information").text(error);
    });
  }


window.addEventListener('load', function() {
    $( "#new-house-form" ).submit(function( event ) {
        event.preventDefault();

        createHouse(
            $("#token-name").val(),
            $("#token-description").val(),
            $("#token-address").val(),
            $("#token-image").val(),
            $("#token-price").val(),
            $("#token-on-sale").is(":checked"),
            $("#token-size").val(),
            $("#token-room-number").val()
        )
    });

    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
    } else {
        alert("You need to install metamask to use this website.")
    }

    startApp();

    
})