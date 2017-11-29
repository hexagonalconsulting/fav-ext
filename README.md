# chrome-ext-use-react-redux
 A simple boiler plate to use react and redux in a chrome extension, setup with webpack.
 
## What is this about?

This sets up an example repo to begin to use react and redux inside a chrome extension, this uses [react-chrome-redux](https://github.com/tshaddix/react-chrome-redux) to
stablish the connection inside the app between the popup of the extension, and the content script with a redux store in the background script. 
This allows to use redux almost like a typical react-redux app.

## Instalation
Install the dependencies using `npm install` or using yarn simply run `yarn`

## Generate the code for the extension using webpack
To generate the code that will be use by the chrome extension using webpack run `npm run build`, or with yarn `yarn run build`. This
will generate the code that you will use for your chrome extension in the directory `./dist` out of the js code in the `./src` directory.


### about the repo's directory structure
Excluding very minor changes this directory structure and the example code comes from [react-chrome-redux-examples](https://github.com/tshaddix/react-chrome-redux-examples),
here just we have used webpack to do a very minimal setup. That said, after generating the code with webpack the directory you will use as your chrome extension is `./dist`, there: `[content.js, popup.js, reduxRelated.js]` 
are generated with webpack (running `npm run build` or `yarn run build`). Basically all these three files have their 
correlative source file in the `./src` directory, then the directory named after each one of them, then `index.js`.
If you take a look at `./webpack.config.js` you will see all it does is take each one of these `index.js` file, and produce the
related file inside the `./dist` directory.

Inside the `./src` directory, `./popup` contains the code related to the popup of the extension, `./content` is the code related to the [content script](https://developer.chrome.com/extensions/content_scripts), and `./reduxRelated` well,  pretty self explanatory, as said before, this uses `react-chrome-redux` what allows to connect the `content` and `popup` scripts to the redux store that is running as the [background page](https://developer.chrome.com/extensions/background_pages) of the extension, in this case is just a script.
