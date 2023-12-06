## Limio

Welcome to the Limio coding interview.

## Our tech stack

The Limio tech stack is always evolving as we continue to seek out the best tools for the job. Our main tech stack is:

  * React with Redux (front-end of our main app & Limio Shop)
  * Gatsby (Limio Shop)
  * AWS Lambda with Serverless for our backend API
  * Node.js for the above & our product catalog backend
  * AWS DynamoDB for our main database
  * Git for our product catalog storage
  * AWS Cognito for our user management
  * We build with Webpack
  * Jest for testing
  * Other AWS services for serving builds/files such as S3, Cloudfront, amongst others

And we are currently working towards introducing the following:

 * React testing library to replace some of component tests
 * Refactoring to use React hooks across our codebase where possible
 
We will continue to discuss & add new tech where we feel it would improve our products.

### Instructions

Please answer the question below (just write the answers in the spaces provided). Once the coding examples are done, please zip up your files and send them via http://wetransfer.com (GMail blocks ZIP attachments).  

We can then discuss the changes that you have made.

### Overview

The directories contain 3 sample apps. They are based on the the tic-tac-toe react tutorial, which you can find at [https://reactjs.org/tutorial/tutorial.html].

The directories are:

| Directory      | Contents    |
| ---------------|-------------| 
| app-original   | The original app from the tutorial |
| app-standalone | The same app, but re-written slightly (this has been updated to move away from class components and use functional components with React hooks) |
| app-redux      | The same app, using redux |

### Questions

Please answer the following questions:
    
1. Comparing the app-original and app-standalone code bases. The app-standalone code base has put each component in a separate file and directory structure.   
   * Why do you think that was done, what are the advantages / disadvantages?

   Components can be reused for specific pages (consider the AppHeader component, which can be used for any subsequent page that is made)

   Easier to test component by component, so when you plug in a component to use, you can ensure that it already works as designed
   
   Separation of concerns - everything in a component folder (logic, front-end HTML, and ideally a test file and a .css file (unless using some kind of unique styling such as tailwind or styled-components), will all be to do with the component and nothing more. This will mean if something's wrong with the component it's easy to isolate and identify.)


2. Thinking about a production ready app, what do you think is missing from all the examples? *Hint: the square component in the standalone app has one*

Test files and styling are both missing in the production ready apps. I'll update them so they're there!

3. Are you familiar with Redux? If so what is the basic idea behind it and what would be a good case for using it?

The basic problem that Redux aims to solve is that when data changes it may need to be reflected at any place in an application. Typically when using React, you can show reflections of data changes through changes in state, but state needs to be passed from parent to child (or vice versa), one level at a time, which can make lots of repeated code just to get it to a specific place (also known as 'prop drilling'). It's similar to, in football, if you needed to pass the ball to the striker, and every time the ball (representing data) had to be passed from goalkeeper, to defender, to midfielder, to striker. It's slow, requiring every position to get the ball even when they don't need to.

Redux resolves this problem by creating app-wide state management. This means that whenever data is changed, it can be passed to a centralised area where any other component of the application can read, add to, update, or delete data where necessary. In the football example, it's akin to if you had a special player, the distributor, who would take the ball from any position and provide the ball to any position. This would mean two things:

1) If the goalkeeper had to pass the ball to the striker, rather than it going goalkeeper -> defender -> midfielder -> striker, it would go goalkeeper -> distributor -> striker, eliminating one layer of complexity.

2) Every single interaction with the ball, going from one position (either goalkeeper, defender, midfielder, or striker) to another position, would go position 1 -> distributor -> position 2, making all interactions far more normalised. This is why Redux becomes more and more useful the more layers of complexity there are (as the distributor would be if there were more and more positions), as there is a standardised management method for observing state.

3) If something is going wrong with the ball when moving the ball between 4 positions, it could be a problem with any of the positions in the team. If something is going wrong with moving the ball from position 1 -> distributor -> position 2, the problem will always be either with position 1, the distributor, or position 2, and as it is a more repeatable system, it is easier to test when there are issues with passing the ball.

4) Something specifically useful with Redux is it's ability to time-travel debug, which enables it to look at a specific point when an application had a bug and what the entire state of the app was like at the time. This would be similar to having ball-by-ball analysis between players and distributor, so you can easily see what position/player is making a mistake with distribution of the ball.

In short, Redux solves the problem of state management in complex systems by enabling a centralised location where all state is managed. This means less redundant code is required as it would be in passing from child to parent repeatedly, as well as making the manipulation of data standardised and therefore easier to test.

4. *If you are interested in the full-stack role* Please take a look at the partial implementation of an express routes in backend/router.js.

    * Thinking of a production application, what issues do you see with this code? *List as many as you like* 

Currently, there is no error checking in the code, which would mean that across all stages of returning data from the MongoClient, there isn't any explicit error checking.

There should be a check on:

the MongoClient:
- connecting to the url (.connect(url))
- checking the collection 'entries' exists

Preferably in a try/catch statement.

queryProduct(query) should also be an async function, as it is an asynchronous function that waits on a response from the MongoClient.

Running the MongoClient as an await function would also lead to cleaner syntax.

### Coding Challenges

With either the app-standalone or app-redux (**not both** - whichever you are comfortable with), please complete the following changes:

1. Update the app so that is highlights the winning move.
2. Update the app so that it allows for a named player X and Y, and it keeps a league table of who won each game.
3. If you get time, implement something that you think that the app could do and is cool. What other things would you change.

- A play again button would be good to have
- An opening start game button would be good to have
- Making the history feed a bit nicer would be nice to have

### Expectations
 * We don't want you to spend too long on this exercise, just the necessary amount of time to show your front-end and back-end skills. We expect it to take 1.5 hours if you have React experience, longer if you have no React experience. 
    * If you don't answer all questions, that is fine. We prefer depth on a few questions rather than superficial answers.
 * Some testing, but not extensive. Have at least one test case, so that we know you can do it. 
    * You'll notice the example code doesn't have much testing. It should.
 * Clean, concise code. Comments are appreciated.
 * Knowledge of up to date React features e.g. Hooks.




    
      
    
    

 





