
if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {

    let removeCartItem = document.getElementsByClassName('btn-danger');

// Removes the Entire Cart-Row belonging to the Remove-Button that is being clicked. 
for(let i = 0; i < removeCartItem.length; i++){
    let button = removeCartItem[i]

    button.addEventListener('click', function(event){

        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCart();
    })
}

const addToCartButtons = document.getElementsByClassName('shop-item-button')
for(let i = 0; i < addToCartButtons.length; i++){

    let button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}


document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

} // End of function Ready, 

const quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener('change',quantityChanged)
}

function purchaseClicked(){
    alert('The Soups are ordered and on their way');
}

function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, image);
    addItemToCart(title, price, image);
    updateCart()
}

function addItemToCart(title, price, image){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    // so we cant select the same item twice.
    for (let i = 0; i< cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('You have already added this Soup to the cart. You can change the Quantity in the Cart if you want to order more of your Soup of choice')
            return
        }
    }

    let cartRowContents = `
    
    <div class="cart-item cart-column"> 
        <img class="cart-item-image" src="${image}" width="100" height="100"> 
        <span class="cart-item-title">${title}</span> 
    </div> 

    <span class="cart-price cart-column">${price}</span> 

    <div class="cart-quantity cart-column"> 
        <input class="cart-quantity-input" type="number" value="1"> 
        <button class="btn btn-danger" type="button">REMOVE</button> 
    </div>  `
    
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Does not work, Both of these rows, I  don't know why. 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
 
function quantityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCart();
}


function updateCart(){

    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
       
    let total = 0; 

    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
    
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100; // Rounds total to two decimals
    document.getElementsByClassName('cart-total-price')[0].innerText ='$' + total;

}