


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

    constructor(name, image, popupImage, frameImg, className = "pictureFrame") {
        super(name, image, className);
        this.popupImage = popupImage;
        this.tag.onclick = this.createDisplay.bind(this);
        if (frameImg) {
            this.frameImg = frameImg;
        }
    }

    createDisplay() {
        if (this.frameImg) {
            new this.popupImage(this.popupImage, "", this.frameImg);
            return;
        }
        new PopupImage(this.popupImage, "");
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
        this.closeButtonNode.style.fontSize = "24px";
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
    constructor(items, maxRowWidth, bufferWidth) {
        this.items = [];
        this.currentRow = 0;
        this.currentColumn = 0
        this.maxRowWidth = maxRowWidth;
        this.bufferWidth = bufferWidth;
        this.inBody = false;
        this.bufferHeight = 60;

        for (const item of items) {
            if (this.currentColumn === 0) {
                this.items.push([]);
            }

            let currentRowWidth = 0;
            for (const row of this.items[this.currentRow]) {
                currentRowWidth += row.tag.naturalWidth + this.bufferWidth;
            }

            if (currentRowWidth + item.tag.naturalWidth <= this.maxRowWidth) {
                this.items[this.currentRow].push(item);
                this.currentColumn++;
            } else {
                this.currentRow++;
                this.currentColumn = 0;
                this.items.push([item]);
            }
        }
    }

    removeFromBody() {
        if (!this.inBody)
            return;
        for (const row of this.items) {
            for (const item of row) {

            }
        }
        this.inBody = false;
    }

    addToBody(startX, startY) {

        let currentX = startX;
        let currentY = startY;
        this.removeFromBody();

        for (const row of this.items) {
            for (const item of row) {
                // item.tag.style.left = currentX + "px";
                // item.tag.style.top = currentY + "px";
                // item.tag.style.position = "absolute";
                document.getElementById("itemsContainer").appendChild(item.tag);
                //currentX += item.tag.naturalWidth + this.bufferWidth;
            }

            // currentY += this.items[0][0].tag.naturalHeight + this.bufferHeight;
            // currentX = startX;
        }
        this.inBody = true;
    }
}

// let currentImage = "sprites/shelf.png";

// document.addEventListener("keydown", function (event) {
//     if (event.code === "ArrowRight") {
//         if (currentImage === "sprites/shelf.png") {
//             currentImage = "sprites/shelf2.png";
//         } else {
//             currentImage = "sprites/shelf.png";
//         }

//         document.body.style.backgroundImage = `url('${currentImage}')`;
//     }
// });

let items = [new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"), new Item("pic", "sprites/frame.png"),];
let shelf = new Items(items, 100, 50);
shelf.addToBody(65, 70);