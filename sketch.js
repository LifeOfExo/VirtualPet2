//Create variables here
var food1
var dog
var happydog
var database
var feed 
var addFood

function preload()
{
dog = loadImage("images/dogImg.png")
happydog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog1 = createSprite(600,300,20,20)
  dog1.addImage(dog)
  dog1.scale=0.15
  var foodRef = database.ref('food');
  foodRef.on("value",eatfood)
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addfood)
  foodObject=new Food();

}


function draw() {  
  background("blue")
  console.log(food1)
  
  if(keyDown("c")){
    something(food1);
    dog1.addImage(happydog);
  }  
  foodObject.display()
  drawSprites();
    //add styles here

}

function feedDog(){
  dog1.addImage(happydog)
  if(foodObject.getfoodstock()<=0){
    foodObject.updatefoodstock(foodObject.getfoodstock()*0)
  }
  else{
    foodObject.updatefoodstock(foodObject.getfoodstock()-1)
  }
  database.ref('/').update({food:foodObject.getfoodstock()})
}

function addfood(){
  food1++
  database.ref("/").update({
    food:food1})
}




function eatfood(a){
  food1=a.val()
  foodObject.updatefoodstock(food1)
  

}

function something(x){
if(x<=0){
  x=0
}
else{
  x=x-1
}
  database.ref("/").update({
  food:x})
}
