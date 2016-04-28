# BidAuction
Auction angularjs web app with nodejs as backend with expressjs rest api

SETUP AND INSTALLATION-INSTRUCTIONS.

INSTALL PREREQUISITES

Before initiating KBidAuction app setup, you will need the following:

•	Node.js v0.10.x+

•	npm (which comes bundled with Node) v2.1.0+

•	git

You can check if you have Node and npm installed by typing:

node --version && npm --version

If you need to upgrade or install Node, the easiest way is to use an installer for your platform. Download the .msi for Windows or .pkg for Mac from the NodeJS website.

The npm package manager is bundled with Node, although you might need to update it. Some Node versions ship with rather old versions of npm. You can update npm using this command:

npm install --global npm@latest

You can check if you have Git installed by typing:
git --version

If you don't have Git, grab the installers from the git website.

INSTALL THE YEOMAN TOOLSET

Once you’ve got Node installed, install the Yeoman toolset:

npm install --global yo bower grunt-cli

Errors?

If you see permission or access errors, such as EPERM or EACCESS, do not use sudo as a work-around. You can consult this guide for a more robust solution.

CONFIRM INSTALLATION

It is a good idea to check that everything is installed as expected by running commonly used Yeoman commands like yo, bower, and grunt 
with the --version flag as follows:

yo --version && bower --version && grunt --version

Running the above should output three separate version numbers:

    •	Yeoman

    •	Bower

    •	Grunt CLI (the command-line interface for Grunt)

SETUP K-BID-AUCTION APP

1.	Unzip zip file source in to any of the newly created folder.
2.	Go to command prompt. Navigate to the folder. (Please install all the prerequisites as mentioned above section, before going for next step).

INITATE SETUP

    o	Run npm install command to install required NPM packages required for the application mentioned in package.json file. This will take bit time for about max(15 to 20 min)
    
      	Any errors if possible ignore otherwise try to install following guideline messages.
    
    o	Run bower install command to install bower.json packages.
    
    o	Once done bower install, check for any errors. And follow instructions as per command prompt messages.

STARTING SERVER
    
    o	Open another instance of Command prompt to start the node js web server created with Rest api services for the K-Bid-Auction web application.
    
       Type node server to start the web server. 
    
       Server will start and listening to port 3000. Check by viewing the service url http://localhost:3000/getAllProducts in IE or Chrome browser.

RUNNING WEB APPLICAITON
  
  o	Switch to the application command instance. Type grunt serve. Click Enter.
  
  o	The application opens after a pause and will show login page.
  
    	In case login page is not opened, check the server is running at localhose:3000 by switching to server command prompt.

GENERATE DISTRIBUTION OF THE APPLICATION.

To create a dist of the we application source use grunt command to generate the dist folder.

