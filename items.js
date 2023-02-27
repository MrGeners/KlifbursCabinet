


class Item {
    static idCounter = 0;

    constructor(name, image = "", className = "") {
        this.name = name;
        Item.idCounter++;
        this.tag = document.createElement("img");
        this.tag.src = image;
        this.tag.className = className;
        this.tag.id = "item" + "-" + Item.idCounter;
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
        else {
            console.log("WARNING:this item type " + item.name + " isn't supported. Check that your items.json types are correct");
        }
    }
}

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
