//
//  This code creates a simple smoothie ordering form using JavaScript. It includes a class to handle smoothie details and error checking for the quantity input.
//

//Basic declaritions of ids, and outputs
let smoothieForm = document.getElementById("smoothieForm");
let output = document.getElementById("output");

/*
 * Smoothie Class
 * Represents a smoothie with a quantity and fruit type.
 * Validates the quantity to be between 1 and 10.
 */
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
/* Event listener for the smoothie form submission.
 * Prevents default form submission, retrieves input values,
 * creates a Smoothie instance, and displays the details or error message.
 */
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