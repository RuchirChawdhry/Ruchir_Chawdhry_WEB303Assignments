/*
    Assignment 05
*/

// content item class
class ContentItem {
    constructor(id, name, description, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
    }

    updateContentItem(id, name, description, category) {
        if (this.id === id) {
            this.name = name || this.name;
            this.description = description || this.description;
            this.category = category || this.category;
        }
    }

    toString() {
        // for console.log only
        const obj = {
            name: this.name,
            description: this.description,
            category: this.category
        };
        console.log(JSON.stringify(obj));

        return `
        <div class="content-item-wrapper" id="content-item-${this.id}">
            <h2>${this.name}</h2>
            <p>${this.description}</p>
            <div>${this.category}</div>
        </div>`;
    }
}


$(document).ready(function () {
    // your code here
    
    // content items 
    let contentItems = [
        new ContentItem(1, "Mumbai Indians", "The most successful team in the IPL.", "Cricket"),
        new ContentItem(2, "Chennai Super Kings", "Known for their consistent performance.", "Cricket"),
        new ContentItem(3, "Kolkata Knight Riders", "Two-time champion of the IPL.", "Cricket"),
        new ContentItem(4, "Royal Challengers Bangalore", "Features some of the most explosive batsmen.", "Cricket"),
        new ContentItem(5, "Delhi Capitals", "A vibrant team with a blend of experience and youth.", "Cricket")
    ];

    // add content items to page
    contentItems.forEach(item => {
        $('#content-item-list').append(item.toString());
        console.log(item.toString());
    });

    // add styles to each content item's wrapper
    $(".content-item-wrapper").css({
        "border": "2px solid #000",
        "width": "70%",
        "padding": "10px",
        "margin": "20px auto"
    });

});


