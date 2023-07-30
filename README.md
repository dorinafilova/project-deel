# React + TypeScript + Vite

1. Steps i did to start with coding
- Create git repo
- Open folder through terminal and Install vite npm create vite@latest
- Go inside the project folder and install dependenciesnpm install
- Clone the git repo  and initialisegit clone https://github.com/dorinafilova/project-deel.git

	git init
= Commit setup files
git add .
git commit -m “first commit”

- Setting up the remote branch so we can push our local code to git
git remote add origin git@github.com:dorinafilova/project-deel.git
git branch -M main       
git push -u origin main  

2. Steps to run the application 
- please clone the repo https://github.com/dorinafilova/project-deel.git locally and run npm istall
- next, run npm run dev which will run the vite script and start the development server and run the application locally on http://127.0.0.1:5173/

For the purposes of this application i used the fake API for fetching albums, https://jsonplaceholder.typicode.com/albums. Hence, the user can type something and the logic presents autocomplete functionality below the input. The user can click on the suggested autocomplete sentence or go down/up + enter using the keyboard. There is also a debounce added to the search input, so we can optimize the application and not run as many requests to the API. As requested, no additonal libraries are used when implementing the solution. 