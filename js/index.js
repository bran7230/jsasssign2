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
    document.getElementById("presetSmoothie1").addEventListener("click", function () {
        document.getElementById("fruit").value = "Strawberry";
        document.getElementById("quantity").value = 2;
        document.getElementById("size").value = "Large";
        document.getElementById("liquid").value = "Yogurt";
        document.getElementById("sweetener").value = "Honey";
        document.getElementById("notes").value = "No ice, please!";
    });

    document.getElementById("presetSmoothie2").addEventListener("click", function () {
        document.getElementById("fruit").value = "Banana";
        document.getElementById("quantity").value = 1;
        document.getElementById("size").value = "Medium";
        document.getElementById("liquid").value = "Milk";
        document.getElementById("sweetener").value = "None";
        document.getElementById("notes").value = "Add extra protein powder.";
    });

    document.getElementById("presetSmoothie3").addEventListener("click", function () {
        document.getElementById("fruit").value = "Apple";
        document.getElementById("quantity").value = 3;
        document.getElementById("size").value = "Small";
        document.getElementById("liquid").value = "Juice";
        document.getElementById("sweetener").value = "Agave";
        document.getElementById("notes").value = "Make it extra cold!";
    });

    document.getElementById("presetSmoothie4").addEventListener("click", function () {
        document.getElementById("fruit").value = "Orange";
        document.getElementById("quantity").value = 6;
        document.getElementById("size").value = "Large";
        document.getElementById("liquid").value = "Water";
        document.getElementById("sweetener").value = "None";
        document.getElementById("notes").value = "No sweetener, please.";
    });

});