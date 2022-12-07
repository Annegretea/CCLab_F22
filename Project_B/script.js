function getRandomImage() {  
    var randomImage = new Array();
    
    
    randomImage[0] = "https://i1.7fon.org/thumb/b43838.jpg";  
    randomImage[1] = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/four-american-curl-kittens-with-twisted-ears-isolated-black-background-sergey-taran.jpg";  
    randomImage[2] = "https://i.pinimg.com/564x/8b/24/7b/8b247bb4981172e9c566e0d6b91788a0.jpg";  
    randomImage[3] = "https://i.pinimg.com/736x/0b/8a/13/0b8a133f59a59f8a0237972f3bcb9d9c--animal-faces-nature.jpg";  
    randomImage[4] = "https://c4.wallpaperflare.com/wallpaper/238/599/646/four-cats-gray-striped-black-background-wallpaper-preview.jpg"; 
    // randomImage[0] = <img src= "image" alt = "Image1.jpeg">
    // randomImage[1] = <img src= "image" alt = "Image2.jpeg">
    // randomImage[2] = <img src= "image" alt = "Image3.jpeg">
    // randomImage[3] = <img src= "image" alt = "Image4.jpeg">
    // randomImage[4] = <img src= "image" alt = "Image5.jpeg">
    
    // <img width="500" src="images/image.jpeg">
    
    
    var number = Math.floor(Math.random()*randomImage.length);  
       
    return document.getElementById("picture").innerHTML = '<img class="backgroundImage" src="'+randomImage[number]+'" />';  
    }  
