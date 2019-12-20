# Tic Tac Toe Lab

**Objective:** Build a tic tac toe game in HTML and JavaScript.

## Required Game components
* A user should be able to click on different squares to make a move.
* When a square is clicked, there should be visual feedback.
* Every click will alternate between being for Player 1 or Player 2. The visual feedback should indicate whose turn it is.
* A cell should not be able to be replayed once marked.
* Add a reset button that will clear the contents of the board.
* After the necessary moves have been played, stop game and alert the player to a win, loss or stalemate.
    * Hint: Determine a set of winning combinations. Check those
      combinations on the board contents after every move.

## How to get started
1. Read through all the directions. There's not a lot of guidance here, so you really need to understand what you're attempting to create. Whiteboard out a plan. Ask yourself what you need to make everything work together.
2. Construct an `index.html` to be your starting point on this
   project. Add the necessary HTML tags, including `script` and
   `link` to link to JavaScript and CSS files respectively.
3. Construct the gameboard. The gameboard page should include the 3x3 grid,
   and at minimum a reset button. Using `id` and `class` on clickable
   elements will help you wire this up in JavaScript afterwards.
4. JavaScript portion will be next:
	* Locate the element first to use it within your app. Think about
     using `querySelector` to locate your target elements.
     Try this in your console to make sure your selection works.
	* After finding the elements, start writing logic to listen for
      `click` events on those elements.
	* You will also need a variable to keep track of moves. This
      will be used to indicate whether or not to mark a square with an `X` or an `O`.
      
## Starter code

There is no starter code provided for this lab. 😈

## Deliverable

Please find some screenshots of what you'll be creating.  Feel free to get creative with how you style your interface.

![Screen-shot](assets/kz2L9f9.png)
![Screen-shot](assets/d8lFshD.png)
![Screen-shot](assets/Jw6hhcA.png)

## Bonus
* Display a message to indicate who's turn it is.
* Keep score of how many games the player has won and lost.

## CSS Bonus
* Make the playing board into wooden playing table (or pick your own theme). Find a nice font on https://fonts.google.com to match.

## Winter Break Blizzard Bonus
* We once had a student implement an Artifical Intelligence (AI)
  opponent. If you really need a challenge, write some code that will
  play a game of Tic Tac Toe against you. (Hint: look into the minimax
  algorithm).

### Additional Resources

- [CSS-Tricks "What Is The DOM"](https://css-tricks.com/dom/)
- [More on events with Eloquent JavaScript](http://eloquentjavascript.net/14_event.html)
