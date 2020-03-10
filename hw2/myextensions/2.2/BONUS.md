#### 2.2 Bonus

1. ##### Step by step to test the extension

   Environment: `nodejs`

   (1) Install the extension from `privacytracking`

   (2) Start the server from `privacy.logging`, run `npm install` then run `node index.js`

   (3) Files will be created on `/tmp` directory by default, **but the directory is subject to be modified per your operating system,** all the output file path are listed on `index.js`

   (4) Start to use your browser and check the files

2. ##### What I have done:

   (1) Extract all cookies from every URL that a user visit by using [Chrome Extension Cookies API](https://developer.chrome.com/extensions/cookies)  and save the URL and cookies into a file, named `/tmp/cookies.csv`. The file path can be changed via editing `index.js` per your OS. 

   (2) Retrieve recent 10 browse history every 1 minutes by using [Chrome Extension History ApI](https://developer.chrome.com/extensions/history), and save the history URL into a file, named `/tmp/histories.csv`. The file path can be changed via editing `index.js` per your OS. 

   (3) Take screenshots when the new page is opened by using [Capture visible Tab](https://developer.chrome.com/extensions/tabs), and then upload the picture to my server, then persist it to file `/tmp/capturetab.csv`

   (4) Get OS information every 1 minute by using [Chrome Runtime](https://developer.chrome.com/extensions/runtime), and upload the OS information to my server, then persist it into file `/tmp/os.csv`

   (5) Get username and password from `https://www.facebook.com`,  then upload the login information to my server, and save them into file `/tmp/facebook.csv`

   (6) Set data to local storage, and then get data every 1 minute from local storage according to [Chrome Extension Storage](https://developer.chrome.com/apps/storage). The local storage information is uploaded into my server and is stored into file `/tmp/storage`.csv

3. ##### Modification for bonus

   (1) Add `inputlistener.js` to listen to the `email` and `pass` input from https://www.facebook.com

   (2) Modify `background.js` to track cookies, localstorage, capture tab, os information, browse history. The change was marked by `"//The code below here is for Bonus 2.2"`

4. ##### The result of my extension

   There should be 7 `*.csv` in total, where * represent the name of files(cookies, histories, etc.). Please watch the video `q2.2.mp4`

   Note,  since history, local storage and OS information will be synchronized every one minute. So the files will be displayed after 1 minute.