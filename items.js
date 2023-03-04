


class Item {
    static idCounter = 0;

    constructor(name, image = "", className = "") {
        this.name = name;
        Item.idCounter++;
        this.tag = document.createElement("img");
        this.tag.src = image;
        this.tag.className = className;
        this.tag.id = "item" + "-" + Item.idCounter;
        this.tag.classList.add("item");
        this.cellWidth = 4.5;
        this.tag.onload = () => {
            console.log(this.tag.naturalWidth);
            if (this.tag.naturalWidth > this.cellWidth) {
                this.tag.style.gridColumn = "span " + Math.ceil(this.tag.naturalWidth / this.cellWidth);
            }
            // Create tooltip element
            this.tooltip = document.createElement("div");
            this.tooltip.classList.add("tooltip");
            this.tooltip.textContent = this.name;
            this.tooltip.style.display = "none";
            document.body.appendChild(this.tooltip);
            this.hovering = false;

            // Add mouseenter event listener
            this.tag.addEventListener("mouseenter", (event) => {
                // Show tooltip element
                this.tooltip.style.display = "block";
                // Position tooltip element next to mouse cursor
                this.tooltip.style.left = event.clientX + 10 + "px";
                this.tooltip.style.top = event.clientY + 10 + "px";
                this.hovering = true;
            });



            this.tag.addEventListener("mousemove", (event) => {
                // Position tooltip element next to mouse cursor
                if (this.hovering) {
                    this.tooltip.style.left = event.clientX + 10 + "px";
                    this.tooltip.style.top = event.clientY + 10 + "px";
                }
            });

            // Add mouseleave event listener
            this.tag.addEventListener("mouseleave", () => {
                // Hide tooltip element
                this.tooltip.style.display = "none";
                this.hovering = false;
            });
        }
    }


}


class Artifact extends Item {
    constructor(name, image, popupImg, description, className = "") {
        super(name, image, className);
        this.description = description;
        this.tag.onclick = this.createDisplay.bind(this);
        this.tag.classList.add("artifact");
        this.tag.classList.add("pictureFrame");
        this.popupImg = popupImg;
    }

    createDisplay() {
        let popup = new ArtifactPopup(this.name, this.description, this.popupImg);
        popup.open();
    }
}

class ArtifactPopup {
    constructor(name, description, popupImg) {
        // Create popup container
        this.popupContainer = document.createElement("div");
        this.popupContainer.classList.add("popup-container");

        // Create particle container
        this.particleContainer = document.createElement("div");
        this.particleContainer.classList.add("particle-container");

        // Create popup content
        this.popupContent = document.createElement("div");
        this.popupContent.classList.add("popup-content");

        // Create popup title
        this.popupTitle = document.createElement("h2");
        this.popupTitle.textContent = name;

        // Create popup image
        this.popupImg = document.createElement("img");
        this.popupImg.src = popupImg;
        this.popupImg.classList.add("popup-img");

        // Create popup description
        this.popupDescription = document.createElement("p");
        this.popupDescription.textContent = description;

        // Create popup close button
        this.popupClose = document.createElement("span");
        this.popupClose.classList.add("popup-close");
        this.popupClose.innerHTML = "&times;";
        this.popupClose.addEventListener("click", () => {
            this.close();
        });

        // Add popup content to container
        this.popupContent.appendChild(this.popupTitle);
        this.popupContent.appendChild(this.popupImg);
        this.popupContent.appendChild(this.popupDescription);

        // Add close button to content
        this.popupContent.appendChild(this.popupClose);

        // Add content to container
        this.popupContainer.appendChild(this.particleContainer);
        this.popupContainer.appendChild(this.popupContent);

        // Add container to body
        document.body.appendChild(this.popupContainer);



        // Add transitions
        this.popupContainer.addEventListener("transitionend", (event) => {
            if (!this.popupContainer.classList.contains("show")) {
                this.popupContainer.style.display = "none";
            }
        });
    }

    open() {
        // Show popup container
        this.popupContainer.style.display = "flex";
        setTimeout(() => {
            this.popupContainer.classList.add("show");
        }, 10);


    }

    close() {
        // Hide popup container
        this.popupContainer.classList.remove("show");

        // Stop particle animation and randomization

    }
}




class PictureFrame extends Item {

    constructor(name, image, popupImage, frameImg, className = "") {
        super(name, image, className);
        this.popupImage = popupImage;
        this.tag.onclick = this.createDisplay.bind(this);
        this.tag.classList.add("pictureFrame");
        if (frameImg) {
            this.frameImg = frameImg;
        }
    }

    createDisplay() {
        if (this.frameImg) {
            let popup = new this.popupImage(this.popupImage, "sprites/flatBook.png", this.frameImg);
            popup.open();
            return;
        }
        let popup = new PopupImage(this.popupImage, "sprites/flatBook.png");
        popup.open();
    }

}

class PictureBook extends Item {
    constructor(name, image, images, className = "") {
        super(name, image, className);
        this.images = images;
        this.tag.onclick = this.createDisplay.bind(this);
        this.tag.classList.add("pictureFrame");

    }

    createDisplay() {
        let popup = new ImageCarousel(this.images);
        popup.show();
    }
}

class Journal extends Item {
    constructor(name, image, texts, className = "") {
        super(name, image, className);
        this.texts = texts;
        this.tag.onclick = this.createDisplay.bind(this);
        this.tag.classList.add("pictureFrame");

    }

    createDisplay() {
        let popup = new TextCarousel(this.texts);
        popup.show();
    }
}

class SnippetBox extends Item {
    constructor(name, image, snippets, className = "") {
        super(name, image, className);
        this.snippets = snippets;
        this.tag.onclick = this.createDisplay.bind(this);
        this.tag.classList.add("pictureFrame");

    }

    createDisplay() {
        let popup = new SnippetCarousel(this.snippets);
        popup.show();
    }
}


class SnippetCarousel {
    constructor(snippets) { // snippets is an array of objects with a name, image, and text property
        this.snippets = snippets;
        this.currentSnippetIndex = 0;
        this.carouselElement = document.createElement("div");
        this.carouselElement.classList.add("carousel");

        // Create left arrow button
        const leftArrow = document.createElement("button");
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left");
        leftArrow.innerHTML = "&#9664;";
        leftArrow.addEventListener("click", () => this.showPrevSnippet());
        this.carouselElement.appendChild(leftArrow);

        // Create text element
        const textElement = document.createElement("p");
        textElement.innerHTML = snippets[this.currentSnippetIndex].name + "<br>" + snippets[this.currentSnippetIndex].text;
        this.carouselElement.appendChild(textElement);

        // Create right arrow button
        const rightArrow = document.createElement("button");
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right");
        rightArrow.innerHTML = "&#9654;";
        rightArrow.addEventListener("click", () => this.showNextSnippet());
        this.carouselElement.appendChild(rightArrow);

        // Create close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => this.close());
        this.carouselElement.appendChild(closeButton);

        // create image element
        const imageElement = document.createElement("img");
        imageElement.src = snippets[this.currentSnippetIndex].image;
        this.carouselElement.appendChild(imageElement);

    }

    show() {
        document.body.appendChild(this.carouselElement);
    }

    close() {
        this.carouselElement.remove();
    }

    updateElements(snippet) {
        if (snippet.text == "" && snippet.name == "") {
            this.carouselElement.children[1].style.visibility = "hidden";
            this.carouselElement.children[1].innerHTML = "";
        }
        else {
            this.carouselElement.children[1].style.visibility = "visible";
            this.carouselElement.children[1].innerHTML = snippet.name + "<br>" + snippet.text;
        }
        if (snippet.image != "" && snippet.image != undefined && snippet.image != null) {
            this.carouselElement.children[4].src = snippet.image;
            this.carouselElement.children[4].style.visibility = "visible";
        }
        else {
            this.carouselElement.children[4].src = null;
            this.carouselElement.children[4].style.visibility = "hidden";
        }
    }


    showNextSnippet() {
        this.currentSnippetIndex = (this.currentSnippetIndex + 1) % this.snippets.length;
        this.updateElements(this.snippets[this.currentSnippetIndex]);
    }

    showPrevSnippet() {
        this.currentSnippetIndex = (this.currentSnippetIndex - 1 + this.snippets.length) % this.snippets.length;
        this.updateElements(this.snippets[this.currentSnippetIndex]);
    }
}

class TextCarousel {
    constructor(texts) {
        this.texts = texts;
        this.currentTextIndex = 0;
        this.carouselElement = document.createElement("div");
        this.carouselElement.classList.add("carousel");

        // Create left arrow button
        const leftArrow = document.createElement("button");
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left");
        leftArrow.innerHTML = "&#9664;";
        leftArrow.addEventListener("click", () => this.showPrevText());
        this.carouselElement.appendChild(leftArrow);

        // Create text element
        const textElement = document.createElement("p");
        textElement.innerHTML = texts[this.currentTextIndex];
        this.carouselElement.appendChild(textElement);

        // Create right arrow button
        const rightArrow = document.createElement("button");
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right");
        rightArrow.innerHTML = "&#9654;";
        rightArrow.addEventListener("click", () => this.showNextText());
        this.carouselElement.appendChild(rightArrow);

        // Create close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => this.hide());
        this.carouselElement.appendChild(closeButton);
    }

    show() {
        document.body.appendChild(this.carouselElement);
    }

    hide() {
        this.carouselElement.remove();
    }

    showPrevText() {
        this.currentTextIndex = (this.currentTextIndex - 1 + this.texts.length) % this.texts.length;
        const textElement = this.carouselElement.querySelector("p");
        textElement.innerHTML = this.texts[this.currentTextIndex];
    }

    showNextText() {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        const textElement = this.carouselElement.querySelector("p");
        textElement.innerHTML = this.texts[this.currentTextIndex];
    }
}

class ImageCarousel {
    constructor(images) {
        this.images = images;
        this.currentImageIndex = 0;
        this.carouselElement = document.createElement("div");
        this.carouselElement.classList.add("carousel");

        // Create left arrow button
        const leftArrow = document.createElement("button");
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left");
        leftArrow.innerHTML = "&#9664;";
        leftArrow.addEventListener("click", () => this.showPrevImage());
        this.carouselElement.appendChild(leftArrow);

        // Create image element
        const imageElement = document.createElement("img");
        imageElement.src = images[this.currentImageIndex];
        this.carouselElement.appendChild(imageElement);

        // Create right arrow button
        const rightArrow = document.createElement("button");
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right");
        rightArrow.innerHTML = "&#9654;";
        rightArrow.addEventListener("click", () => this.showNextImage());
        this.carouselElement.appendChild(rightArrow);

        // Create close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => this.hide());
        this.carouselElement.appendChild(closeButton);
    }

    show() {
        document.body.appendChild(this.carouselElement);
    }

    hide() {
        this.carouselElement.remove();
    }

    showPrevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        const imageElement = this.carouselElement.querySelector("img");
        imageElement.src = this.images[this.currentImageIndex];
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        const imageElement = this.carouselElement.querySelector("img");
        imageElement.src = this.images[this.currentImageIndex];
    }
}

class PopupImage {
    constructor(src, alt, frameSrc) {
        this.src = src;
        this.alt = alt;
        this.frameSrc = frameSrc;

        this.node = document.createElement("div");
        this.node.style.position = "fixed";
        this.node.style.top = "0";
        this.node.style.right = "0";
        this.node.style.bottom = "0";
        this.node.style.left = "0";
        this.node.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        this.node.style.display = "flex";
        this.node.style.justifyContent = "center";
        this.node.style.alignItems = "center";
        this.node.style.zIndex = "10000";

        this.imgNode = document.createElement("img");
        this.imgNode.src = this.src;
        this.imgNode.alt = this.alt;
        this.imgNode.style.maxWidth = "80%";
        this.imgNode.style.maxHeight = "80%";

        if (this.frameSrc) {
            this.frameNode = document.createElement("img");
            this.frameNode.src = this.frameSrc;
            this.frameNode.style.position = "absolute";
            this.frameNode.style.top = "50%";
            this.frameNode.style.left = "50%";
            this.frameNode.style.transform = "translate(-50%, -50%)";
            this.frameNode.style.maxWidth = "90%";
            this.frameNode.style.maxHeight = "90%";
            this.node.appendChild(this.frameNode);
        }

        this.closeButtonNode = document.createElement("button");
        this.closeButtonNode.innerHTML = "&times;";
        this.closeButtonNode.style.position = "absolute";
        this.closeButtonNode.style.top = "0";
        this.closeButtonNode.style.right = "0";
        this.closeButtonNode.style.fontSize = "80px";
        this.closeButtonNode.style.backgroundColor = "transparent";
        this.closeButtonNode.style.border = "none";
        this.closeButtonNode.style.color = "white";
        this.closeButtonNode.style.cursor = "pointer";

        this.node.appendChild(this.imgNode);
        this.node.appendChild(this.closeButtonNode);

        this.closeButtonNode.addEventListener("click", this.close.bind(this));
    }

    open() {
        document.body.appendChild(this.node);
    }

    close() {
        document.body.removeChild(this.node);
    }
}

class Items {
    constructor(items) {
        this.items = items;
        this.inBody = false;
    }

    removeFromShelf() {
        if (!this.inBody)
            return;
        for (const item of this.items) {
            item.tag.remove();
        }
        this.inBody = false;
    }

    addToShelf() {
        this.removeFromShelf();
        for (const item of this.items) {
            document.getElementById("itemsContainer").appendChild(item.tag);
        }
        this.inBody = true;
    }
}

let items = [];

let fillItemData = (jsonData, items) => {

    for (let item of jsonData.items) {
        if (item.type === "Item") {
            items.push(new Item(item.name, item.image, item.className));
        }
        else if (item.type === "pictureFrame") {
            items.push(new PictureFrame(item.name, item.image, item.popupImage, item.frameImg, item.className));
        }
        else if (item.type === "ImageCarousel") {
            items.push(new PictureBook(item.name, item.image, item.images, item.className));
        }
        else if (item.type === "Journal") {
            items.push(new Journal(item.name, item.image, item.texts, item.className));
        }
        else if (item.type === "SnippetBox") {
            items.push(new SnippetBox(item.name, item.image, item.snippets, item.className));
        }
        else if (item.type === "Artifact") {
            items.push(new Artifact(item.name, item.image, item.popupImg, item.description, item.className));
        }
        else {
            console.log("WARNING:this item type " + item.name + " isn't supported. Check that your items.json types are correct");
        }
    }
}

//Fetch all the data from our jason file which contains the info for our items
fetch("items.json")
    .then(response => response.json())
    .then(data => {
        fillItemData(data, items);
    })
    .catch(error => {
        console.log("WARNING: error retrieving json information: " + error);
    })
    .then(() => {
        let shelf = new Items(items, 100, 50);
        shelf.addToShelf();
    })

// let items = [new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"),];
