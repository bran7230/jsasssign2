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
class Smoothie {

    quantity;
    fruit;
    size;
    liquid;
    sweetener;

    constructor(quantity, fruit, size, liquid, sweetener) {
        if (quantity < 1 || quantity > 10) {
            throw new Error("Quantity must be between 1 and 10");
        }

        this.quantity = quantity;
        this.fruit = fruit;
        this.size = size;
        this.liquid = liquid;
        this.sweetener = sweetener;
    }

    getSmoothieDetails() {
        const servingText = this.quantity === 1 ? "serving of" : "servings of";
        // Only include sweetener if it's not empty or "None"
        const sweetenerText = this.sweetener && this.sweetener.toLowerCase() !== "none" ? ` and ${this.sweetener} sweetener` : "";
        return ` A ${this.size} ${this.liquid} smoothie with ${this.quantity} ${servingText} ${this.fruit} ${sweetenerText}.`;
    }

}

/* Event listener for the smoothie form submission.
 * Prevents default form submission, retrieves input values,
 * creates a Smoothie instance, and displays the details or error message.
 */
smoothieForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let quantity = parseInt(document.getElementById("quantity").value);
    let fruit = document.getElementById("fruit").value;
    let size = document.getElementById("size").value;
    let liquid = document.getElementById("liquid").value;
    let sweetener = document.getElementById("sweetener").value;
    let notes = document.getElementById("notes").value;

    try {
        let smoothie = new Smoothie(quantity, fruit, size, liquid, sweetener);
        output.textContent = smoothie.getSmoothieDetails() + " Thank you for your order!";
        specialInstructions.textContent = notes ? `Special Instructions: ${notes}` : "No special instructions provided.";
    }
    catch (error) {
        output.textContent = error.message;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    /* Function to set form values for preset smoothies.
     * This function sets the values of the smoothie form fields based on the provided parameters.
     * IE You pass in 2 for the quantity, "Strawberry" for the fruit, etc.
     * It updates the form fields with the specified values when you call it.
    */
    function setFormValue(quantity, fruit, size, liquid, sweetener, notes) {
        new Smoothie(quantity, fruit, size, liquid, sweetener); //Checking data validity(Beauty of OOP)
        // Set the form values based on the parameters passed to the function
        document.getElementById("quantity").value = quantity;
        document.getElementById("fruit").value = fruit;
        document.getElementById("size").value = size;
        document.getElementById("liquid").value = liquid;
        document.getElementById("sweetener").value = sweetener;
        document.getElementById("notes").value = notes;
    }

    //Add event listeners to preset buttons to set form values for different smoothies.
    //It goes Quanity, Fruit, Size, Liquid, Sweetener, Notes and all of this is passed to the setFormValue function which updates the dom.
    document.getElementById("presetSmoothie1").addEventListener("click", function () {
        setFormValue(2, "Strawberry", "Large", "Yogurt", "Honey", "No ice, please!");
    });

    document.getElementById("presetSmoothie2").addEventListener("click", function () {
        setFormValue(1, "Banana", "Medium", "Milk", "None", "Add extra protein powder.");
    });

    document.getElementById("presetSmoothie3").addEventListener("click", function () {
        setFormValue(3, "Apple", "Small", "Juice", "Agave", "Make it extra cold!");
    });

    document.getElementById("presetSmoothie4").addEventListener("click", function () {
        setFormValue(6, "Orange", "Large", "Water", "None", "No sweetener, please.");
    });

});