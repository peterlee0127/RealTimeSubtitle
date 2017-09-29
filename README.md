# RealTimeSubtitle

即時字幕器
	
搭配OBS直撥，即時切換講者姓名	
更改背景圖片	
依照座位，輸入對應的JSON格式，產生快速切換按鈕
<hr>

#To do 
- [ ] Code refactor.   
- [ ] Learn React.js

<hr>
輸出結果
<img src="screen.gif">

<hr>


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