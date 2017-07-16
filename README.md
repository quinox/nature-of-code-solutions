Personal solutions for exercises from [Nature of Code](http://natureofcode.com/) ([github](https://github.com/shiffman/The-Nature-of-Code)).
Runs in [ProcessingJS](http://processingjs.org/) since I'm working on a
Chromebook and my SSH client does not seem to support X-Forwarding.

Setup:
* Have the repository sitting on a server with SSH, vim and nginx. 
* Use the Chromebook to log in over SSH on the server and modify the files using vim. 
* Let `inotifywait` rebuild the HTML files whenver solution files are saved
* View results in the browser.

---

How to use:

* Set up [nginx](https://www.nginx.com/) to serve static files from a folder of your choosing
* Run `HTML_ROOT=/your/chosen/folder ./generate`
* Open `http://<your_ip>/index.html` in a browser

---

For development it's nice to generate the files as soon as you save your solutions, one way of doing this is by using [inotify](https://en.wikipedia.org/wiki/Inotify):
```bash
export HTML_ROOT=/your/chosen/folder
while true; do inotifywait --event close_write,ignored --recursive --exclude '^\.' --exclude '~$' solutions/ ; rm "$HTML_ROOT/index.html" ; ./generate ; done
```
