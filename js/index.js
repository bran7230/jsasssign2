//
//  This code creates a simple smoothie ordering form using JavaScript. It includes a class to handle smoothie details and error checking for the quantity input.
//

//Basic declaritions of ids, and outputs
let smoothieForm = document.getElementById("smoothieForm");
let output = document.getElementById("output");
let specialInstructions = document.getElementById("specialInstructions");
const fruitPrice = {
    applePrice : 0.75,
    bananaPrice : 0.56,
    orangePrice : 0.86,
    strawberryPrice : 0.36
}; 

const liquidPrice = {
    waterPrice : "Free", 
    milkPrice : 0.25,
    juicePrice: 0.50,
    yogurtPrice: 0.80
};

const sweetenerPrice = {
    honeyPrice: 0.40,
    sugarPrice: 0.10,
    agavePrice: 0.20,
};

const sizePrice = {
    smallPrice : 1.00,
    mediumPrice : 1.50,
    largePrice : 2.00
};


/*
 * Smoothie Class
 * Represents a smoothie with a quantity and fruit type with size, liquid, sweetner and notes.
 * Validates the quantity to be between 1 and 10.
 * Validates that fruit, size, liquid, and sweetener are provided.
 * Validates that notes do not exceed 50 characters.
 */
class Smoothie {

    quantity;
    fruit;
    size;
    liquid;
    sweetener;
    notes;

    constructor(quantity, fruit, size, liquid, sweetener, notes) {
        if (quantity < 1 || quantity > 10 || isNaN(quantity)) {
            throw new Error("Quantity must be a number between 1 and 10");
        }
        // Check if fruit, size, liquid, and sweetener are provided and not empty
        // (Ps: I know I dont need these validations but I added them for extra safety if you wanted to use this code in a real world application)
        if (!fruit || fruit.trim() === "") {
            throw new Error("Please select a fruit.");
        }
        if (!size || size.trim() === "") {
            throw new Error("Please select a size.");
        }
        if (!liquid || liquid.trim() === "") {
            throw new Error("Please select a liquid base.");
        }
        if (!sweetener || sweetener.trim() === "") {
            sweetener = "None"; // Default to "None" if no sweetener is selected
        }
        if (notes && notes.length > 50) { // Check if notes exceed 50 characters and if there is any notes
            output.textContent = "Special instructions are too long (max 50 characters).";
            throw new Error("Special instructions are too long (max 50 characters)");
        }
        this.quantity = quantity;
        this.fruit = fruit;
        this.size = size;
        this.liquid = liquid;
        this.sweetener = sweetener;
        this.notes = notes || ""; // Default to empty string if no notes are provided
    }

    getSmoothieDetails() {
        /* Ternary operator to determine the serving text based on quantity
         * If quantity is 1, it will return "serving of", otherwise it will return "servings of"
         * This is used to make the output more readable and grammatically correct.
         */
        const servingText = this.quantity === 1 ? "serving of" : "servings of";
        // Only include sweetener if it's not empty or "None"
        const sweetenerText = this.sweetener && this.sweetener.toLowerCase() !== "none" ? ` and ${this.sweetener} sweetener` : "";
        return ` A ${this.size} ${this.liquid} Smoothie with ${this.quantity} ${servingText} ${this.fruit} ${sweetenerText}.`;
    }

}




/* Event listener for the smoothie form submission.
 * Prevents default form submission, retrieves input values,
 * creates a Smoothie instance, and displays the details or error message.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Get the form and output elements by their IDs
    // This is done to ensure the DOM is fully loaded before accessing the elements.
    const smoothieForm = document.getElementById("smoothieForm");
    const output = document.getElementById("output");
    const specialInstructions = document.getElementById("specialInstructions");
    const quantityInput = document.getElementById("quantity");
    const fruitSelect = document.getElementById("fruit");
    const sizeSelect = document.getElementById("size");
    const liquidSelect = document.getElementById("liquid");
    const sweetenerSelect = document.getElementById("sweetener");
    const notesInput = document.getElementById("notes");

    /* Event listener for the smoothie form submission.
     * Prevents default form submission, retrieves input values,
     * creates a Smoothie instance, and displays the details or error message.
     */
    smoothieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Clear previous output and special instructions
        output.textContent = "";
        specialInstructions.textContent = "";

        /* Retrieve input values from the form.
         * This includes the quantity, fruit, size, liquid, sweetener, and notes.
         * The quantity is parsed as an integer to ensure it's a number.
        */
        const quantity = parseInt(quantityInput.value, 10);
        const fruit = fruitSelect.value;
        const size = sizeSelect.value;
        const liquid = liquidSelect.value;
        const sweetener = sweetenerSelect.value;
        const notes = notesInput.value;

        /* Create a new Smoothie instance with the input values.
         * If the input values are valid, it will return the smoothie details.
         * If there are any validation errors, it will throw an error and display the error message.
        */
        try {
            let smoothie = new Smoothie(quantity, fruit, size, liquid, sweetener, notes);
            output.textContent = smoothie.getSmoothieDetails() + " Thank you for your order!";
            specialInstructions.textContent = notes ? `Special Instructions: ${notes}` : "No special instructions provided.";
        }
        catch (error) {
            output.textContent = error.message;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    /* Function to set form values for preset smoothies.
     * This function sets the values of the smoothie form fields based on the provided parameters.
     * IE You pass in 2 for the quantity, "Strawberry" for the fruit, etc.
     * It updates the form fields with the specified values when you call it.
    */
    function setFormValue(quantity, fruit, size, liquid, sweetener, notes) {
        new Smoothie(quantity, fruit, size, liquid, sweetener, notes); //Checking data validity(Beauty of OOP)
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