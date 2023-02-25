var idCounter = 0;


class item {
    constructor(name, image = "", className = "") {
        this.name = name;
        idCounter++;
        this.tag = document.createElement("img");
        this.tag.src = image;
        this.tag.className = className;
        this.tag.id = "item" + "-" + idCounter;
    }
}

class pictureFrame extends item {

    constructor(name, image, popupImage, frameImg) {
        super(name, image, "pictureFrame");
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

class items {
    constructor(items) {
        this.items = [[]];


        this.currentRow = 0;
        this.currentColumn = 0;
    }

}