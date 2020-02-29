# Hosting TogetherJS on your machine
1. In command line, type in `git clone https://github.com/mozilla/togetherjs.git`
2. Enter `cd togetherjs` and `nano package-lock.js`
3. Press `Cmd + W` and find "ariya"
4. Inside "dependencies", change the "version" of "esprima" to `https://github.com/jquery/esprima/tarball/master`
5. Remove the "integrity" line from "esprima"
6. "dependencies" should look like this:
`"dependencies": {
    "esprima": {
      "version": "https://github.com/jquery/esprima/tarball/master",
      "dev": true
    }
 }`
7. Press `Cmd + O` and enter to save changes, `Cmd + X` to exit
8. Enter `npm install`, `sudo npm install -g grunt-cli` (if an error says EEXIST: file already exists [...], grunt has been installed)
9. Start it by typing in `node hub/server.js`

# Running TogetherJS using local server
1. Open up <togetherjsdependencyname>.js, and find the declaration of `defaultHubBase` around line 490
2. Change the link to "http://localhost:8080/"
3. Save
