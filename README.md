# RealTimeSubtitle

即時字幕器

A free plug-in for Broadcast software(support Browser Source). We can show live guest speaking during the live event. Without any commercial software needed, we can use it with any OS (Mac/Windows/Linux......).

Just embeded the display page to your input.

### Sample.   
<img src='sample.png' style='width:100%'>
Different color block means different source. The bottom orange block shows our subtitle systems.   

<a href='https://www.youtube.com/watch?v=VbwKBK24T_g&feature=youtu.be&t=4842'>Sample Video.</a>

<img src='screen.png' style='width:100%'>

<hr>
	
搭配OBS直撥與支援Browser Source的直撥軟體，在直撥時，能夠顯示即時註解與文字.  
不再只能在主控台控制，能夠讓其他人協助控制直播.     

<h2>Feature</h2>   

- [x] Change display subtitle by guest.
- [x] Change subtitle logo.	  
- [x] Input JSON file to generate list.
- [x] drap and drop to change the list.
- 
<hr>
顯示畫面 Display Sample
<img src="manual/screen.gif">
<hr>
架構

     +------------------+  +---------------------+
     |                  |  |                     |
     |                  |  |                     |
     |                  |  |                     |
     | Admin Client(Web)|  | Display Client(Web) |
     |                  |  |                     |
     |                  |  |                     |
     +-----------+-+----+  +---------------------+
                   |           ^
                   +---+       |
                       v    +--+
                   +----------------+
                   |                |
                   |                |
                   | Server(Node.js)|
                   |                |
                   |                |
                   +----------------+