if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')//getting the button and we put it in a variable
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)//add event :lorsqu'on clique on efface l'item a travers l'appel de la fonction 
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target//we target the element 
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()//on appel la fonctiion qui fait un update pour la carte 
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //The value property sets or returns the value of the value attribute of a text field.
        input.value = 1
    }
    updateCartTotal()
}
//cette fonction perment d'activer le boutton "add to the cart" et a la fin on va appeler les fonctions addItemToCart et  updateCartTotal
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText //représente le contenu textuel rendu d'un nœud et de ses descendants
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) { //cette fonction permet d'ajouter un item a la carte lorsque on clique sur le boutton 
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')//Permet la manipulation de l'attribut de contenu de classe de l'élément en tant qu'ensemble de jetons séparés par des espaces via un objet DOMTokenList.
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //i am using the for loop here because it's a repetitive action we are going to repeat it until we run out of items 
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`// we can use our string on diffrent lines
        //this is how we're going to create the row of the added item to the cart because as you can see in the web page that the cart section contains the title of the item the price and the image 
        // le ${} est utulisé  pour évaluer et intégrer dynamiquement des expressions dans des modèles littéraux
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)//insère un ensemble d'objets Node ou d'objets chaîne après le dernier enfant du document
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)//ilya un appel pour la fonction removeCartItem
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)//appel de la fonction quantityChanged
}

function updateCartTotal() { //lorsqu'on ajoute/supprime des items à la carte ou on change le nombre des items ,le totale va changer alors cette fonction permet de faire un update au totale
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
let hearts = document.querySelectorAll(".fa-heart")

for(let heart of hearts){
    heart.addEventListener("click",function(){
        heart.classList.toggle("red")
    })
}