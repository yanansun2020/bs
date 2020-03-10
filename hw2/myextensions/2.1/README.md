##### 2.1 The Basics 

1. Environment: `nodejs`, `python3`

2. **Step by step setup `privacy.logging`**

   (1) Set up server, execute `npm install` 

   (2) Check `filePath` variable in `index.js`, change it per your OS environment

   (3) Execute `node index.js` to start the server

   (4) Install extension from `privacytracking`directory, then start to search on your browser

3. What my extension can do:

   (1) Record all urls that are visited by the User Agent

   (2) Record search keywords from https://www.google.com

   (3) Extract data to my server: http://localhost:3000, and persist the data into `/tmp/test.csv`

4. the video `question2.1.mp4` proves that my extension works for the base case, where the user browses a site and it is recorded in my server.

   (1) The first 60 seconds shows how to install the extension, how to start the server, and search URL and keywords will be recorded to file `/tmp/test.csv`

   (2) The Following 74 seconds approves that my extension can pass the test cases that provided by the instructors.

5. To test it, the command is: `python run_test1.py <your_extension_directory> http://localhost:3000/read`

   In my system, I use the following command:`python run_test1.py /home/yanan/work/bs/hw2/myextensions/privacytracking http://localhost:3000/read`