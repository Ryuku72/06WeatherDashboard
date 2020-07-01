![GitHub last commit](https://img.shields.io/github/last-commit/Ryuku72/06WeatherDashboard?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/Ryuku72/06WeatherDashboard?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/Ryuku72/06WeatherDashboard?style=for-the-badge)

# Weather Dashboard
__PROJECT06: 26 Mar 2020__
<br>
https://ryuku72.github.io/06WeatherDashboard/

## Aim // Introduction
This week was the introduction to AJAX and appending information from an API onto our own websites. Like usual there were a number of previous skills required primarily localStorage, appending, applying attributes, Jquery that played large roles in this weeks project; the Weather API.

The weather API required pulling information from the OpenWeatherMap API through AJAX then applying that information to one's website. Key points was searchbar, saving past results, showing particular peices of information in the current // future, and assign attributes according to the response condition. 

### Key Concepts of Week 6
* AJAX: scoping, printing and appending
* API signup and key generation
* JSON: conversions and local storage 
* HTTP GET requests: success and error
* Server-side API: singular and multiple
* Qjery: additional practice
* Input search elements
* Push Array
* Addition Att() practice
* Attr: Data-name, src, href and switching
* .empty()
* .prepend
* queryParams
* clear()

##  Table of Content
* [Building the Weather API HTML](#HTML)
* [JavaScript, Jquery and API scoping](#JS)
* [Impletement CSS Old and New](#CSS)
* [Learning curve, issues and ongoing problems](#extra)
* [Additional Information](#ref)


<a name="HTML">

### Building the DayPlanner HTML

First the first time I approached this project with the intent to concentrate on the script element. This was in due part that its my greater weakness and something important I need for the group project. So I spent 1.5 day constructing the entire HTML and CSS to mimic a bad version of the mock example. This version of the website can be found in indexold.html, styleold.css and scriptold.js. 

By design the base model or indexold.html needed to just have the following elements.
1. Search bar with a button
2. 1 large box for displaying information for today's weather
3. a box with 4 columns for the future results
4. a side bar for previous search results

Spent sometime playing with bootstrap and just constructing things to play the part and didn't invest much time to how bad it looked. Once the project was constructed I moved straight to the script.


<a name="JS">

### JavaScript, JQuery and API scoping

We were lucky this week because we had an example 'Day 2 / Bujumbura' and 'Day 3/ NYTArticleSearch' to base the WeatherAPI coding. Once that was implemented I set Perth, AU as my default location and used AJAX to pull the information from OpenWeatherMap. Using the scoping exercises like 'Day1 / CustomerObject' finding the information required wasn't too difficult. Experimention really began with using multiple APIs to find information because the Weather Information and the UV index whilst using similar URLs were actually different address. There was an example of multiple API's in 'Day 1 / AJAX_OMDB' which helped but in the end I made the WeatherAPI information a Parents and UV index a Sibling. 

Whilst constructing I found some interesting occurences.

1. Time existed outside of Jquery because how it was coded (laziness).
2. LocalStorage and applying information to the page has to exist outside of the Ajax
3. All Ajax based information has to exist inside the Ajax. Except was appling the time because it was global.

Interesting note was using date + time outside of the AJAX but using days inside the AJAX. Another note was using Jquery and javascript. It appears sometimes when targetting the body I had to resort to javascript. For example creating buttons via Jquery did not work but using createElement did work. 

Maybe the hardest component here was using LocalStorage and JSON because the nature of the Ajax information. It took a while to realise that renewing items only occurs once you clear previous information and applying a limit on the array was something new. 

However, when entering an incorrect location the result still applied to the array. I tried to put the localStorage function inside the AJAX to stop error based inputs applying to the array but lucked out. Theory would be, if the value to the SearchText became Error then input would not be added to array. In other words a checker needs to be implemented. 

I abandoned using data-name for buttons and submitted to using values, was not successful with implementing .done, .success and .fail. I just stuck with .then as well as ended error to create the 'no such location' text in the SearchText input box. Initial included a timeout but found no reason for this project. Could have used more loops especially in regards to Ajax but ran out of time.

Additional script was added like button click vs keypress, hiding elements and the clock component.

Though kind of silly, really liked the queryParams component of constructing a weblink. 

<a name="CSS">

### Implementing CSS old New

When I was nearly done with my project I realised I couldn't accept the look of my build and so I started to reconstruct everything. Initially I tried to make a bubble based webpage with information floating around but without enough experience with animate() or strong handle on grids I had to abondon my ambition. 

The second attempt I went some something a little more simple. Similiar to the initial design I choose pale colours with a black background, looked at google font for some soft fonts and started rearranging the entire project. There was not many additional features I wanted to add except making the search bar require you press enter and actually make the preious search result buttons work.

This took an additional 2 days but I pretty happy with the way it turned out

Things I learnt or want to learn more
1. Better use of grids. Relying to bootstap is not very health to creating more intense designs
2. Controling positions still seems to be an issue. For example making the footer stay at the bottom of the page. when you are generating results the footer became stuck somewhere towards the bottom but never absolute bottom.
3. Still having issues with resizing. Media queries can save the day but I am sure there are better methods.

Currently, I really wanted to implement some more flashing items. 
1. Replace all icons with actual gifs
2. Change the colour backgrounds to pictures of the location I am searching for
3. Make the footer stay at the bottom of the page

As always time runs out and you got to move on.

Note: very minor media queries as bootstrap did a lot of heavy lifting here and the website is simple. Used CSS grid for mobile phone use. Very nice! 

<a name="extra">

### Learning curve, issues and ongoing problems

Im terms of the expectations of the brief I am happy. I had all the major requirements
1. Search function works and presents correct information
2. All statistics are present including UV index, date, humidity and also icons
3. The temperature colour changes according the severity
4. Future dates are supplied with relavent information
5. Previous search results are pinned on the page and can trigger a search

Personal feats
1. Apply a limit to the array
2. bootstrap comfort
3. Jquery knowlegde
4. Starting to see loops and how to constuct them
5. Speed of my logic to build the script

However, there are remaining issues
1. Still don't use loops enough (for example 'future-container'). 
2. Overall website is a little lackluster. Needs icons, picture backgrounds and flare
3. Did not use data-name or data-set
4. Some Javascript code could be written in jquery
5. Implementing a geolocation would have been nice when opening the page
6. When entering an incorrect location make sure it doesn't get pinned to the previous search results

Overall, things feel like they are getting easier to grasp but as a result the expectation is higher.


<a name="ref">

##### Additional references
W3 Schools
GIPHY
Google Font
Developer.mozilla.org
Getbootstrap.com
Stackoverflow.com
Resources provided in Slack
Youtube tutorials
OpenWeatherMap API

## Technology
* HyperText Markup Language
* Cascading Style Sheets
* Visual Studio Code ver 1.42.0
* GitHub
* Google Chrome ver 79.0.3945.130

## Source
Code was originally supplied in the WAUS-CRAW-FSF-PT-02-2020-U-C-MW / Week 5 / Day1 / Homework repository on GitLab (https://waustralia.bootcampcontent.com/the-university-of-western-australia/WAUS-CRAW-FSF-PT-02-2020-U-C-MW/tree/master/Week%205/Day%201/Homework)

## Contributor
Joshua K Bader
