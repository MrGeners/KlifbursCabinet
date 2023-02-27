


class Item {
    static idCounter = 0;

    constructor(name, image = "", className = "") {
        this.name = name;
        Item.idCounter++;
        this.tag = document.createElement("img");
        this.tag.src = image;
        this.tag.className = className;
        this.tag.id = "item" + "-" + Item.idCounter;
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
