//
//  This code creates a simple smoothie ordering form using JavaScript. It includes a class to handle smoothie details and error checking for the quantity input.
//

//Basic declaritions of ids, and outputs
let smoothieForm = document.getElementById("smoothieForm");
let output = document.getElementById("output");
let specialInstructions = document.getElementById("specialInstructions");
/*
 * Smoothie Class
 * Represents a smoothie with a quantity and fruit type with size, liquid, and sweetner.
 * Validates the quantity to be between 1 and 10.
 */
class Smoothie{

    quantity;
    fruit;
    size;
    liquid;
    sweetener;

    constructor(quantity, fruit, size, liquid, sweetener) {
        if(quantity < 1 || quantity > 10) {
            throw new Error("Quantity must be between 1 and 10");
        }
       
        this.quantity = quantity;
        this.fruit = fruit;
        this.size = size;
        this.liquid = liquid;
        this.sweetener = sweetener;
    }

    getSmoothieDetails(){
        if(this.sweetener == "none"){
            return `A ${this.size} ${this.liquid} Smoothie with ${this.quantity} servings of ${this.fruit}.`;
        }
        //Small fix for singular and plural
        //If quantity is 1, use "serving" otherwise use "servings"
        if(this.quantity == 1){
            return `A ${this.size} ${this.liquid} Smoothie with ${this.quantity} serving of ${this.fruit} and ${this.sweetener} sweetener.`;
        }
        return `A ${this.size} ${this.liquid} Smoothie with ${this.quantity} servings of ${this.fruit} and ${this.sweetener} sweetener.`;
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
    let size = document.getElementById("size").value;
    let liquid = document.getElementById("liquid").value;
    let sweetener = document.getElementById("sweetener").value;
    let notes = document.getElementById("notes").value;
    try{
        let smoothie = new Smoothie(quantity, fruit, size, liquid, sweetener);
        output.textContent = smoothie.getSmoothieDetails() + " Thank you for your order!"; 
        specialInstructions.textContent = notes ? `Special Instructions: ${notes}` : "No special instructions provided.";
     

    }
    catch(error) {
        output.textContent = error.message;
    }
});