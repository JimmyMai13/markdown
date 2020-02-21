
### Hello! We're going to be implementing a small portion of Markdown!

### (Refresher: Markdown is a simple syntax to convert text to HTML.)

### Rules:

    1.) Our input should handle headings - # to ######

    2.) # heading == level 1 heading

    3.) ## heading == level 2 heading

    4.) ##### heading == level 5 heading, etc

    5.) Our input should also handle links: [text](url) denotes a link.

    6.) Our input should also handle paragraphs. Paragraphs are separated into a fully empty line. e.g.

        #
        # This is a paragraph
        #
        # This is another paragraph.

### Example Markdown:

    # Header one

    Hello there

    How are you? What's going on?

    ## Another Header

    This is a paragraph [with an inline link](http://google.com). Neat, eh?

    ## This is a header [with a link](http://yahoo.com)

### To Setup and Run

   * run **npm install http-server -g**
   * cd into **Markdown** dir
   * run **http-server** and it will output the localhost address e.g. http://127.0.0.1:8080
   * navigate to that address in the browser and you will be able to input your markdown or use default