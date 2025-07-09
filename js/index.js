let smoothieForm = document.getElementById("smoothieForm");
let output = document.getElementById("output");
class Smoothie{

    quantity;
    fruit;

    constructor(quantity, fruit) {
        if(quantity < 1 || quantity > 10) {
            throw new Error("Quantity must be between 1 and 10");
        }
       
        this.quantity = quantity;
        this.fruit = fruit;
    }

    getSmoothieDetails(){
        return `Smoothie with ${this.quantity} servings of ${this.fruit}`;
    }

}
smoothieForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    let quantity = parseInt(document.getElementById("quantity").value);
    let fruit = document.getElementById("fruit").value;

    try{
        let smoothie = new Smoothie(quantity, fruit);
        output.textContent = smoothie.getSmoothieDetails();
    }
    catch(error) {
        output.textContent = error.message;
    }
});