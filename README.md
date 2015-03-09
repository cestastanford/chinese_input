# Chinese Input

A visualization project by Prof. Tom Mullaney, Department of History, 
Stanford University.

Team:

- Tom Mullaney, Principle Investigator
- Jason A. Heppler, Technical Lead (2015-present)
- Rahul Singireddy, Research Assistant (2015-present)

## Installation

To run this locally, clone a local copy and either use Python's 
[SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) or the included Rake task to launch the visualization.

1. Open the Terminal (on Mac), under `Applications > Utilities > 
   Terminal`.
2. In the terminal, navigate to the directory to where you want the 
   files to be. For example, `cd ~/Desktop`.
3. Now clone the files locally: `git clone 
   https://github.com/cestastanford/chinese_input.git`.
4. Change your directory to the `chinese_input`: `cd chinese_input/`.
5. In this directory, run `rake server`. Now visit 
   [http://localhost:5000](http://localhost:5000). Turn off the server 
   by hitting `CTRL + C`. 

More information about running d3.js locally can be found in the 
[documentation](https://github.com/mbostock/d3/wiki#installing).
