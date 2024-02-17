# tic-tac-toe

In this game of tic tac toe you play against another person for as many rounds as you'd like while keeping score.

Objective:

	1. Use immediately invoked function expressions to create modules for organization
	2. Reduce the global namespace as much as possible
	3. Use factory function instead of constructor function
	4. Allow both players to change their username
	5. Allow both players to change their pawn
	6. Keep track of each player's wins, losses, and ties
	7. Button to reset game

Prior to the development of this tic tac toe game, I learned about immediately invoked functions, factory function,
and closures. This enabled me to structure the program using modules and extract any information needed from one
module to another. Because I was able to structure the program using modules, the development of tic tac toe became
easier and made naming variables easier since the global namespace was being cluttered and variables became private to
their local IIFE and/or arrow function.

Normally resetting a value back to its default value is simple and straightforward and I agree, but resetting a
private variable from a object was not as straightforward as I had thought. I attempted to reset that value by
doing object.property = foo. Instead I learned I had to create a reset function inside the factory function then 
invoke the reset method to reset variable.

Arrays isn't a data type I've had much experience with. For that reason I turned nodelists into arrays even though it
was not necessary. Could have used a for loop, but I wanted to practice using array methods. This came after I
had a tough time deciding which appropriate array methods to use to test each player's selected tile against the
array with winning tile combinations.