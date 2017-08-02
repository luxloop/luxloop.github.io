// Simple ROT13+ROT5 cipher (Javascript implementation)
// Copyright StatiX Industries 2013 (MIT License)
 
//This is the alphabet array
var alphaBetString = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
var alphaBetTable = alphaBetString.split(" ");
 
//This is the lookup table/array for the ROT13 characters
var rot13String = "N O P Q R S T U V W X Y Z A B C D E F G H I J K L M n o p q r s t u v w x y z a b c d e f g h i j k l m";
var rot13Table = rot13String.split(" ");
 
//This is for numbers. Numbers will be passed thru ROT5
var numberString = "1 2 3 4 5 6 7 8 9 0";
var numberTable = numberString.split(" ");
 
//This is the lookup table of ROT5
var rot5String = "6 7 8 9 0 1 2 3 4 5";
var rot5Table = rot5String.split(" ");
 
//Here's the table for symbols. Symbols will remain the same
var symbolString = "~ ` ! @ # $ % ^ & * ( ) _ + - = { } [ ] \\ | ; \' : \" < > ? , . /";
var symbolTable = symbolString.split(" ");
 
//Main function
var rot13rot5Encode = function(input) {
    var output = "";
    for (var i=0; i<input.length; i++) { //This is checking for spaces and if yes, add a space to the output
        for (var y=0; y<numberTable.length; y++) { //This is the ROT5 cipher for numbers
            if (input[i]==numberTable[y]) {
                output+=rot5Table[y];
            }
        }
        for (var x=0; x<alphaBetTable.length; x++) { //This is the ROT13 cipher for letters
            if (input[i]==alphaBetTable[x]) {
                output+=rot13Table[x];
            }
        }
        for (var w=0; w<symbolTable.length; w++) {
            if (input[i]==symbolTable[w]) {
                output+=symbolTable[w];
            }
        }
        if (input[i]==" ") {
            output+=" ";
        }
    }
    return output; //Ultimately, return the output
};
 
//If you want to run the cipher, uncomment the following lines and change userInput to your desired input
//var userInput = "Developed by Pan Ziyue (@sammy0025) in StatiX Industries.";
//console.log(rot13rot5Encode(userInput));