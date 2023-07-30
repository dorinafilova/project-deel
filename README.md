# React + TypeScript + Vite

1. Steps i did to start with coding

- Create git repo
- Open folder through terminal and Install vite

<pre><code>npm create vite@latest</code></pre>

- Go inside the project folder and install dependencies

<pre><code>npm install</code></pre>

- Clone the git repo and initialisegit clone https://github.com/dorinafilova/project-deel.git

 <pre><code>git init</code></pre>

- Commit setup files

<pre><code>git add .</code></pre>

<pre><code>git commit -m “first commit”</code></pre>

- Setting up the remote branch so we can push our local code to git

<pre><code>git remote add origin git@github.com:dorinafilova/project-deel.git</code></pre>

<pre><code>git branch -M main</code></pre>

<pre><code>git push -u origin main</code></pre>

2. Steps to run the application

- please clone the repo https://github.com/dorinafilova/project-deel.git locally or unzip the folder locally and run npm istall in the root of the project
- next, run npm run dev which will run the vite script and start the development server and run the application locally on http://127.0.0.1:5173/

For the purposes of this application i used the fake API for fetching albums, https://jsonplaceholder.typicode.com/albums. Hence, the user can type something and the logic presents autocomplete functionality below the input. The user can click on the suggested autocomplete sentence or go down/up + enter using the keyboard. There is also a debounce added to the search input, so we can optimize the application and not run as many requests to the API. As requested, no additonal libraries are used when implementing the solution. If no matching results are found, there is an adequate message displayed. If there is an error during the request, an error message is displyed as well
