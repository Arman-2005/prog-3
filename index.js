var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hello world");
});

app.get("/google", function(req, res){
    res.redirect("https://google.com/")
 });
 
 app.get("/:search", function(req, res){
    res.redirect("https://google.com/search?q=/?"+ req.params.search);
 });

 app.get("/*", function(req, res){
    res.status(404).send('Sorry, we cannot find that!')
 });
 
 
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});


var fs = require('fs');

function main(){
   var file  = "hello.txt";
   fs.appendFileSync(file, "Hello world\n");
}
main();

var fs = require('fs');
var dummyText = "Apple yep";

function main() {
   fs.writeFileSync("dummytext.txt", dummyText);
   var text = fs.readFileSync("dummytext.txt").toString();
   console.log(dummyText == text);
   console.log(text);
   fs.writeFileSync("undummytext.txt",
       text.replace("Apple", "Microsoft")
   );
}
main();

const obj = {name: "Vardan",  lastName: "Hovsepyan", age: 13,  tumoStudent: true }
const myJSON = JSON.stringify(obj);
fs.writeFileSync("obj.json", myJSON);
