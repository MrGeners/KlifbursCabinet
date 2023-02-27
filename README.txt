 
 ███████╗ ██████╗ ██████╗     ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗███████╗██████╗ ███████╗    
 ██╔════╝██╔═══██╗██╔══██╗    ██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║██╔════╝██╔══██╗██╔════╝    
 █████╗  ██║   ██║██████╔╝    ██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║█████╗  ██████╔╝███████╗    
 ██╔══╝  ██║   ██║██╔══██╗    ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║██╔══╝  ██╔══██╗╚════██║    
 ██║     ╚██████╔╝██║  ██║    ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║███████╗██║  ██║███████║    
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝    ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝    
                                                                                                        
 

To add a new item or object follow these steps.

1.Add the sprite or image of your item or object to the sprites folder if applicable 

2.Go to the JSON file items.json and add a trailing , to the second to the last set of {} you see. 

3.Next add a new set of {} on the next line after the , you added

4. we want to add the following properties that are true for all item types inside the new set of {} we just made

    "type": "insert type here"
        A detailed description of the different types of items you can add and their functionality is described later.

    "name": "name goes here"  
        Name is the name of the item you're adding, like "journal of chauncey" or "sword of destruction" 

    "image":"sprites/someimage.png" 
        this is the path to the image file, make sure it begins with "sprites/" and ends with the extension of the file 
        ".png" ".jpeg" etc.
     
    "className": "some-class"
        If you want to add css styles to an item. A detailed list of the class names will be added later, also if you understand 
        css feel free to add your own in the indexStyles.css. If you don't require a class just leave it as ""

5. Above are just the properties that are required of every item. Most types of items (other than the standard Item type) 
require more properties

    "Item" 
        This item type is the most basic, it functions in the same way as an image, with no events when clicked. 
        it requires just the standard properties described in step 4. 
    "PictureFrame" 
        This item type will display a framed (optional frame) image as a popup when clicked. Typically used for larger images.
        additional properties needed are: 
            "popupImage":"sprites/image.png"
                this is the path to the image that will popup when the Item is clicked
            "frameImg":"sprites/image.png"
                this is the image behind the popup image that will frame your image. 


This is all for now, as more functionality is added to the repository, more documentation will be added. 


