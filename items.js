var idCounter = 0; 


class item {
    constructor(name, parent,image = "",className = "", link = ".") {
        this.name = name; 
        this.id = "item" + "-" + idCounter;
        idCounter++; 
        this.class = className; 
        this.imgPath = image; 
        this.href = link; 
        this.parent = parent; 
    }

    generateHTML() {
        
    }
}


let items = []; 