A simple Tic-Tac-Toe game written in Typescript. 

Directory structure:
```
├── index.html              
├── package.json             # Project metadata and scripts
├── package-lock.json        # Locked npm dependencies
├── tsconfig.json            # TypeScript compiler configuration
├── src/                     
│   ├── assets.ts            
│   ├── frontend.ts          
│   ├── logic.ts
│   ├── hints.ts              
│   └── players.ts           
├── dist/                    
└── node_modules/
```           

Folders:
dist - contains the compiled Javascript files
node_modules - Installed npm dependencies
src - contains the .ts files written by me. 

Files:  
assets.ts - Sets up the board, grid cells of the board, and signs (X and O)  
frontend.ts [AI] - Sets up event handlers and how the game is served to the HTML frontend  
logic.ts - Contains the functions facilitating the game, mainly player's moves (play()), the computer's logic (compplay()).  
players.ts - Contains the gameplay loop  
hints.ts[AI-assisted] - Implements the hint feature (Week 3). Player can use this feature to move ahead in the game if they feel stuck.  
index.html [AI]- The HTML frontend served by the browser.  

[P.S. - Files written by AI have been marked as such.]
