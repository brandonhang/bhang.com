(function() {

var audioElement     = document.getElementById('achievement-sound');
var inputs           = document.getElementsByClassName('achievement-input');
var globalTimers     = [];
var bookmarklet =
"javascript:(function()%7B(function()%20%7Bvar%20soundSource%20%20%20%20%20%2" +
"0%3D%20'https%3A%2F%2Fbrandonhang.com%2Fmedia%2Fxbox_achievement.wav'%3Bvar%" +
"20inputs%20%20%20%20%20%20%20%20%20%20%20%3D%20document.getElementsByClassNa" +
"me('achievement-input')%3Bvar%20globalTimers%20%20%20%20%20%3D%20%5B%5D%3Bva" +
"r%20safeHaven%20%3D%20function%20(string)%20%7Breturn%20string.replace(%2F%2" +
"6%2Fg%2C%20%22%26amp%3B%22).replace(%2F%3C%2Fg%2C%20%22%26lt%3B%22).replace(" +
"%2F%3E%2Fg%2C%20%22%26gt%3B%22).replace(%2F%22%2Fg%2C%20%22%26quot%3B%22).re" +
"place(%2F'%2Fg%2C%20%22%26%23039%3B%22)%3B%7D%3Bvar%20doTheThing%20%3D%20fun" +
"ction(achievementText%2C%20gamerscore%2C%20achievementDescription)%20%7Bvar%" +
"20achievementCss%20%3D%22.hidden%7Bdisplay%3Anone!important%7D.invisible%7Bo" +
"pacity%3A0!important%7D.green%7Bbackgro%22%20%2B%22und-color%3A%23008d00!imp" +
"ortant%7D.dark-green%7Bbackground-color%3A%230b670c!important%7D.%22%20%2B%2" +
"2darkest-green%7Bbackground-color%3A%23003102!important%7D%23super-amazing-h" +
"igh-scoring%22%20%2B%22-achievement%7Bcolor%3A%23fff!important%3Bwidth%3A590" +
"px!important%3Bheight%3A104px!importa%22%20%2B%22nt%3Bposition%3Afixed!impor" +
"tant%3Bleft%3A50%25!important%3Bbottom%3A60px!important%3Btransfo%22%20%2B%2" +
"2rm%3AtranslateX(-50%25)!important%3B-webkit-transform%3AtranslateX(-50%25)!" +
"important%3B-%22%20%2B%22moz-transform%3AtranslateX(-50%25)!important%3B-o-t" +
"ransform%3AtranslateX(-50%25)!impor%22%20%2B%22tant%3Bborder-radius%3A52px!i" +
"mportant%3B-webkit-border-radius%3A52px!important%3B-moz-%22%20%2B%22border-" +
"radius%3A52px!important%3Boverflow%3Ahidden!important%3Btransition%3Awidth%2" +
"01s%20c%22%20%2B%22ubic-bezier(.7%2C.1%2C.1%2C.7)!important%3B-webkit-transi" +
"tion%3Awidth%201s%20cubic-bezier(%22%20%2B%22.7%2C.1%2C.1%2C.7)!important%3B" +
"-moz-transition%3Awidth%201s%20cubic-bezier(.7%2C.1%2C.1%2C.7)!im%22%20%2B%2" +
"2portant%3B-o-transition%3Awidth%201s%20cubic-bezier(.7%2C.1%2C.1%2C.7)!impo" +
"rtant%3Bz-index%3A9%22%20%2B%22001!important%3Bfont-family%3A'Open%20Sans'%2" +
"CVerdana%2Csans-serif!important%7D%23super-am%22%20%2B%22azing-high-scoring-" +
"achievement.smushed%7Bheight%3A0!important%7D%23super-amazing-hig%22%20%2B%2" +
"2h-scoring-achievement.squeezed%7Bwidth%3A0!important%7D%23super-amazing-hig" +
"h-scoring%22%20%2B%22-achievement.clear%7Bbackground-color%3Atransparent!imp" +
"ortant%7D%23super-amazing-hig%22%20%2B%22h-scoring-achievement.ball%7Bwidth%" +
"3A104px!important%3Btransition%3Awidth%20.25s%20linea%22%20%2B%22r%2Cheight%" +
"20.25s%20linear!important%3B-webkit-transition%3Awidth%20.25s%20linear%2Chei" +
"ght%20.%22%20%2B%2225s%20linear!important%3B-moz-transition%3Awidth%20.25s%2" +
"0linear%2Cheight%20.25s%20linear!im%22%20%2B%22portant%3B-o-transition%3Awid" +
"th%20.25s%20linear%2Cheight%20.25s%20linear!important%7D%23super-%22%20%2B%2" +
"2amazing-high-scoring-achievement.ball%20.sphere%7Bleft%3A50%25!important%3B" +
"top%3A50%25!imp%22%20%2B%22ortant%3Btransform%3Atranslate(-50%25%2C-50%25)!i" +
"mportant%3B-webkit-transform%3Atranslate(%22%20%2B%22-50%25%2C-50%25)!import" +
"ant%3B-moz-transform%3Atranslate(-50%25%2C-50%25)!important%3B-o-transf%22%2" +
"0%2B%22orm%3Atranslate(-50%25%2C-50%25)!important%7D%23super-amazing-high-sc" +
"oring-achievement.r%22%20%2B%22ock%7Bwidth%3A104px!important%7D%23super-amaz" +
"ing-high-scoring-achievement.rock%20.circ%22%20%2B%22le%7Bleft%3A50%25!impor" +
"tant%3Btop%3A50%25!important%3Btransform%3Atranslate(-50%25%2C-50%25)!impor%" +
"22%20%2B%22tant%3B-webkit-transform%3Atranslate(-50%25%2C-50%25)!important%3" +
"B-moz-transform%3Atransla%22%20%2B%22te(-50%25%2C-50%25)!important%3B-o-tran" +
"sform%3Atranslate(-50%25%2C-50%25)!important%7D%23super-a%22%20%2B%22mazing-" +
"high-scoring-achievement%20.sphere%7Bborder-radius%3A52px!important%3B-webki" +
"t%22%20%2B%22-border-radius%3A52px!important%3B-moz-border-radius%3A52px!imp" +
"ortant%3Bwidth%3A104px!%22%20%2B%22important%3Bheight%3A100%25!important%3Bp" +
"osition%3Aabsolute!important%3Bleft%3A0!important%22%20%2B%22%3Btop%3A0!impo" +
"rtant%3Btransition%3Awidth%20.25s%20linear%2Cheight%20.25s%20linear!importan" +
"t%3B-%22%20%2B%22webkit-transition%3Awidth%20.25s%20linear%2Cheight%20.25s%2" +
"0linear!important%3B-moz-transi%22%20%2B%22tion%3Awidth%20.25s%20linear%2Che" +
"ight%20.25s%20linear!important%3B-o-transition%3Awidth%20.25s%22%20%2B%22%20" +
"linear%2Cheight%20.25s%20linear!important%7D%23super-amazing-high-scoring-ac" +
"hievement%22%20%2B%22%20.sphere.trophy-icon%7Bbackground-image%3Aurl(https%3" +
"A%2F%2Fbrandonhang.com%2Fimg%2Ficons%2F%22%20%2B%22trophy.svg)!important%3Bb" +
"ackground-size%3A60%25!important%3Bbackground-position%3Acent%22%20%2B%22er%" +
"20center!important%3Bbackground-repeat%3Ano-repeat!important%3Btransition%3A" +
"width%20.%22%20%2B%2225s%20linear%2Cheight%20.25s%20linear%2Cbackground-colo" +
"r%201s%20ease-in!important%3B-webkit-%22%20%2B%22transition%3Awidth%20.25s%2" +
"0linear%2Cheight%20.25s%20linear%2Cbackground-color%201s%20ease-in!%22%20%2B" +
"%22important%3B-moz-transition%3Awidth%20.25s%20linear%2Cheight%20.25s%20lin" +
"ear%2Cbackground-co%22%20%2B%22lor%201s%20ease-in!important%3B-o-transition%" +
"3Awidth%20.25s%20linear%2Cheight%20.25s%20linear%2C%22%20%2B%22background-co" +
"lor%201s%20ease-in!important%7D%23super-amazing-high-scoring-achievemen%22%2" +
"0%2B%22t%20.sphere.smushed%7Bheight%3A0!important%7D%23super-amazing-high-sc" +
"oring-achievement%22%20%2B%22%20.sphere.squeezed%7Bwidth%3A0!important%7D%23" +
"super-amazing-high-scoring-achievement%20%22%20%2B%22.title-wrapper%7Bpositi" +
"on%3Aabsolute!important%3Bleft%3A120px!important%3Btop%3A50%25!impo%22%20%2B" +
"%22rtant%3Bwidth%3Acalc(100%25%20-%20130px)!important%3Btransform%3Atranslat" +
"eY(-50%25)!importan%22%20%2B%22t%3B-webkit-transform%3AtranslateY(-50%25)!im" +
"portant%3B-moz-transform%3AtranslateY(-50%22%20%2B%22%25)!important%3B-o-tra" +
"nsform%3AtranslateY(-50%25)!important%3Btransition%3Aleft%20.4s%20eas%22%20%" +
"2B%22e-out%2Copacity%20.4s%20ease-out%2Ctop%20.4s%20ease-out%2Cbottom%20.4s%" +
"20ease-out!important%3B-w%22%20%2B%22ebkit-transition%3Aleft%20.4s%20ease-ou" +
"t%2Copacity%20.4s%20ease-out%2Ctop%20.4s%20ease-out%2Cbot%22%20%2B%22tom%20." +
"4s%20ease-out!important%3B-moz-transition%3Aleft%20.4s%20ease-out%2Copacity%" +
"20.4s%20eas%22%20%2B%22e-out%2Ctop%20.4s%20ease-out%2Cbottom%20.4s%20ease-ou" +
"t!important%3B-o-transition%3Aleft%20.4s%20%22%20%2B%22ease-out%2Copacity%20" +
".4s%20ease-out%2Ctop%20.4s%20ease-out%2Cbottom%20.4s%20ease-out!important%22" +
"%20%2B%22%7D%23super-amazing-high-scoring-achievement%20.title-wrapper.tucke" +
"d-away%7Bleft%3A50%25%22%20%2B%22!important%3Bopacity%3A0!important%7D%23sup" +
"er-amazing-high-scoring-achievement%20.titl%22%20%2B%22e-wrapper.underground" +
"%7Btop%3A125%25!important%3Bopacity%3A0!important%7D%23super-amazing-%22%20%" +
"2B%22high-scoring-achievement%20.title-wrapper.sky-high%7Btop%3A-50%25!impor" +
"tant%3Bopacity%3A%22%20%2B%220!important%7D%23super-amazing-high-scoring-ach" +
"ievement%20.title-wrapper%20.title%7Bfo%22%20%2B%22nt-weight%3A400!important" +
"%3Bfont-size%3A20px!important%3Bmargin%3A8px%200!important%3Bwhit%22%20%2B%2" +
"2e-space%3Anowrap!important%3Boverflow%3Ahidden!important%7D%23super-amazing" +
"-high-scori%22%20%2B%22ng-achievement%20.title-wrapper%20.title.bottom%7Btex" +
"t-overflow%3Aellipsis!important%22%20%2B%22%7D%23super-amazing-high-scoring-" +
"achievement%20.title-wrapper%20.title%20.gamerscore-i%22%20%2B%22con%7Bbackg" +
"round-color%3A%23fff!important%3Bcolor%3A%230b670c!important%3Bfont-size%3A1" +
"8px!i%22%20%2B%22mportant%3Bdisplay%3Ainline-block!important%3Bwidth%3A28px!" +
"important%3Bheight%3A28px!imp%22%20%2B%22ortant%3Bline-height%3A28px!importa" +
"nt%3Btext-align%3Acenter!important%3Bborder-radius%3A%22%20%2B%2252px!import" +
"ant%3B-webkit-border-radius%3A52px!important%3B-moz-border-radius%3A52px!%22" +
"%20%2B%22important%7D%22%3Bvar%20iframeId%20%20%20%20%20%20%3D%20'super-achi" +
"evement-audio-iframe'%3Bvar%20iframeElement%20%3D%20document.getElementById(" +
"iframeId)%3Bvar%20audioElement%3Bif%20(!iframeElement)%20%7BiframeElement%20" +
"%20%20%20%20%20%20%20%20%20%20%3D%20document.createElement('iframe')%3Bifram" +
"eElement.id%20%20%20%20%20%20%20%20%3D%20iframeId%3BiframeElement.className%" +
"20%3D%20'hidden'%3Bvar%20iframeBody%20%20%20%20%20%20%20%20%20%3D%20document" +
".createElement('body')%3BaudioElement%20%20%20%20%20%20%20%20%20%20%20%3D%20" +
"document.createElement('audio')%3BaudioElement%20%20%20%20%20%20%20%20%20%20" +
"%20%3D%20document.createElement('audio')%3BaudioElement.id%20%20%20%20%20%20" +
"%20%20%3D%20'super-achievement-sound'%3BaudioElement.className%20%3D%20'hidd" +
"en'%3BaudioElement.src%20%20%20%20%20%20%20%3D%20soundSource%3BaudioElement." +
"type%20%20%20%20%20%20%3D%20'audio%2Fx-wav'%3BiframeBody.appendChild(audioEl" +
"ement)%3BiframeElement.src%20%3D%20'data%3Atext%2Fhtml%3Bcharset%3Dutf-8'%20" +
"%2BencodeURI(iframeBody.outerHTML)%3Bdocument.body.appendChild(iframeElement" +
")%3BaudioElement.load()%3B%7Dvar%20cssId%20%20%20%20%20%20%20%20%20%20%20%20" +
"%3D%20'super-stylish-achievement-css'%3Bvar%20achievementStyle%20%3D%20docum" +
"ent.getElementById(cssId)%3Bif%20(!achievementStyle)%20%7Bvar%20head%20%20%2" +
"0%20%20%20%20%20%20%20%3D%20document.head%20%7C%7C%20document.getElementsByT" +
"agName('head')%5B0%5D%3BachievementStyle%20%3D%20document.createElement('sty" +
"le')%3BachievementStyle.id%20%20%20%3D%20'super-stylish-achievement-css'%3Ba" +
"chievementStyle.type%20%3D%20'text%2Fcss'%3Bif%20(achievementStyle.styleShee" +
"t)%20%7BachievementStyle.styleSheet.cssText%20%3D%20achievementCss%3B%7Delse" +
"%20%7BachievementStyle.appendChild(document.createTextNode(achievementCss))%" +
"3B%7Dhead.appendChild(achievementStyle)%3B%7Dvar%20popupId%20%20%20%20%20%20" +
"%20%20%20%20%3D%20'super-amazing-high-scoring-achievement'%3Bvar%20achieveme" +
"ntPopup%20%3D%20document.getElementById(popupId)%3Bif%20(achievementPopup)%2" +
"0%7BachievementPopup.parentElement.removeChild(achievementPopup)%3B%7Dvar%20" +
"outerDiv%20%20%20%20%20%20%20%3D%20document.createElement('div')%3BouterDiv." +
"id%20%20%20%20%20%20%20%20%3D%20popupId%3BouterDiv.className%20%3D%20'dark-g" +
"reen%20smushed%20squeezed%20ball%20clear'%3Bvar%20sphere1%20%20%20%20%20%20%" +
"20%3D%20document.createElement('div')%3Bsphere1.id%20%20%20%20%20%20%20%20%3" +
"D%20'ball-1'%3Bsphere1.className%20%3D%20'sphere%20darkest-green%20smushed%2" +
"0squeezed'%3BouterDiv.appendChild(sphere1)%3Bvar%20sphere2%20%20%20%20%20%20" +
"%20%3D%20document.createElement('div')%3Bsphere2.id%20%20%20%20%20%20%20%20%" +
"3D%20'ball-2'%3Bsphere2.className%20%3D%20'sphere%20green%20smushed%20squeez" +
"ed'%3BouterDiv.appendChild(sphere2)%3Bvar%20sphere3%20%20%20%20%20%20%20%3D%" +
"20document.createElement('div')%3Bsphere3.id%20%20%20%20%20%20%20%20%3D%20'b" +
"all-3'%3Bsphere3.className%20%3D%20'sphere%20dark-green%20smushed%20squeezed" +
"'%3BouterDiv.appendChild(sphere3)%3Bvar%20sphere4%20%20%20%20%20%20%20%3D%20" +
"document.createElement('div')%3Bsphere4.id%20%20%20%20%20%20%20%20%3D%20'bal" +
"l-4'%3Bsphere4.className%20%3D%20'sphere%20green%20smushed%20squeezed'%3Bout" +
"erDiv.appendChild(sphere4)%3Bvar%20trophyIcon%20%20%20%20%20%20%20%3D%20docu" +
"ment.createElement('div')%3BtrophyIcon.className%20%3D%20'sphere%20trophy-ic" +
"on%20dark-green%20smushed%20squeezed'%3BouterDiv.appendChild(trophyIcon)%3Bv" +
"ar%20titleWrapper%20%20%20%20%20%20%20%3D%20document.createElement('div')%3B" +
"titleWrapper.className%20%3D%20'title-wrapper%20tucked-away'%3BouterDiv.appe" +
"ndChild(titleWrapper)%3Bvar%20titleTop%20%20%20%20%20%20%20%3D%20document.cr" +
"eateElement('h3')%3BtitleTop.className%20%3D%20'title%20top'%3BtitleTop.appe" +
"ndChild(document.createTextNode('Achievement%20unlocked'))%3BtitleWrapper.ap" +
"pendChild(titleTop)%3Bvar%20titleBottom%20%20%20%20%20%20%20%3D%20document.c" +
"reateElement('h3')%3BtitleBottom.className%20%3D%20'title%20bottom'%3BtitleW" +
"rapper.appendChild(titleBottom)%3Bvar%20gamerscoreIcon%20%20%20%20%20%20%20%" +
"3D%20document.createElement('span')%3BgamerscoreIcon.className%20%3D%20'game" +
"rscore-icon'%3BgamerscoreIcon.appendChild(document.createTextNode('G'))%3Bti" +
"tleBottom.appendChild(gamerscoreIcon)%3BtitleBottom.innerHTML%20%2B%3D%20'%2" +
"6nbsp%3B'%3Bvar%20achievementGamerscore%20%3D%20document.createElement('span" +
"')%3BachievementGamerscore.id%20%20%3D%20'achievement-gamerscore'%3Bachievem" +
"entGamerscore.appendChild(document.createTextNode(gamerscore))%3BtitleBottom" +
".appendChild(achievementGamerscore)%3BtitleBottom.innerHTML%20%2B%3D%20'%26n" +
"bsp%3B-%26nbsp%3B'%3Bvar%20achievementTitle%20%3D%20document.createElement('" +
"span')%3BachievementTitle.id%20%20%3D%20'achievement-title'%3BachievementTit" +
"le.innerHTML%20%3D%20achievementText%3BtitleBottom.appendChild(achievementTi" +
"tle)%3Bvar%20descriptionWrapper%20%3D%20document.createElement('div')%3Bdesc" +
"riptionWrapper.className%20%3D%20'title-wrapper%20tucked-away%20underground'" +
"%3BouterDiv.appendChild(descriptionWrapper)%3Bvar%20descTitle%20%3D%20docume" +
"nt.createElement('h3')%3BdescTitle.className%20%3D%20'title'%3BdescTitle.inn" +
"erHTML%20%3D%20achievementDescription%3BdescriptionWrapper.appendChild(descT" +
"itle)%3Bdocument.body.appendChild(outerDiv)%3Bvar%20revealAchievement%20%3D%" +
"20function()%20%7BouterDiv.classList.remove('smushed')%3BouterDiv.classList." +
"remove('squeezed')%3Bif%20(audioElement)%20%7Bif%20(audioElement.paused)%20%" +
"7BaudioElement.play()%3B%7Delse%20%7BaudioElement.currentTime%20%3D%200%3B%7" +
"D%7Dvar%20revealTimer%20%3D%20setTimeout(function()%20%7BrevealSpheres()%3B%" +
"7D%2C%20350)%3BglobalTimers.push(revealTimer)%3B%7D%3Bvar%20revealSpheres%20" +
"%3D%20function()%20%7Bvar%20spheres%20%3D%20%5B%20sphere1%2C%20sphere2%2C%20" +
"sphere3%2C%20sphere4%2C%20trophyIcon%20%5D%3Bvar%20timer%20%3D%200%3Bfor%20(" +
"var%20i%20%3D%200%3B%20i%20%3C%20spheres.length%3B%20i%2B%2B)%20%7B(function" +
"(i)%20%7Bvar%20sphere%20%3D%20spheres%5Bi%5D%3Bvar%20timeout%20%3D%20setTime" +
"out(function()%20%7Bsphere.classList.remove('smushed')%3Bsphere.classList.re" +
"move('squeezed')%3Bif%20(i%20%3D%3D%3D%20spheres.length%20-%201)%20%7BouterD" +
"iv.classList.remove('clear')%3Bvar%20expandoTimeout%20%3D%20setTimeout(funct" +
"ion()%20%7BexpandAchievement()%3B%7D%2C%20250)%3BglobalTimers.push(expandoTi" +
"meout)%3B%7D%7D%2C%20timer)%3Btimer%20%2B%3D%20200%3BglobalTimers.push(timeo" +
"ut)%3B%7D)(i)%3B%7D%7D%3Bvar%20expandAchievement%20%3D%20function()%20%7Bout" +
"erDiv.classList.remove('ball')%3BtrophyIcon.classList.add('green')%3BtrophyI" +
"con.classList.remove('dark-green')%3Bvar%20textTimeout%20%3D%20setTimeout(fu" +
"nction()%20%7BshowAchievementText()%3B%7D%2C%20800)%3BglobalTimers.push(text" +
"Timeout)%3B%7D%3Bvar%20showAchievementText%20%3D%20function()%20%7BtitleWrap" +
"per.classList.remove('tucked-away')%3BdescriptionWrapper.classList.remove('t" +
"ucked-away')%3Bsphere3.classList.add('hidden')%3Bsphere4.classList.add('hidd" +
"en')%3Bvar%20textTimer%20%3D%20setTimeout(function()%20%7BshowAchievementDes" +
"cription()%3B%7D%2C%202000)%3BglobalTimers.push(textTimer)%3B%7D%3Bvar%20sho" +
"wAchievementDescription%20%3D%20function()%20%7BtitleWrapper.classList.add('" +
"sky-high')%3BdescriptionWrapper.classList.remove('underground')%3Bvar%20hide" +
"Timeout%20%3D%20setTimeout(function()%20%7BhideDescription()%3B%7D%2C%202000" +
")%3BglobalTimers.push(hideTimeout)%3Bvar%20shrinkTimeout%20%3D%20setTimeout(" +
"function()%20%7BdeflateGate()%3B%7D%2C%202200)%3BglobalTimers.push(shrinkTim" +
"eout)%3B%7D%3Bvar%20hideDescription%20%3D%20function()%20%7BdescriptionWrapp" +
"er.classList.add('invisible')%3B%7D%3Bvar%20deflateGate%20%3D%20function()%2" +
"0%7BouterDiv.classList.add('rock')%3BtrophyIcon.classList.add('dark-green')%" +
"3BtrophyIcon.classList.remove('green')%3Bvar%20downsizeTimeout%20%3D%20setTi" +
"meout(function()%20%7Bdownsize()%3B%7D%2C%201000)%3BglobalTimers.push(downsi" +
"zeTimeout)%3B%7D%3Bvar%20downsize%20%3D%20function()%20%7Bvar%20circles%20%3" +
"D%20%5B%20trophyIcon%2C%20sphere2%2C%20sphere1%20%5D%3Bvar%20timer%20%3D%200" +
"%3Bfor%20(var%20i%20%3D%200%3B%20i%20%3C%20circles.length%3B%20i%2B%2B)%20%7" +
"B(function(i)%20%7Bvar%20circle%20%3D%20circles%5Bi%5D%3Bvar%20timeout%20%3D" +
"%20setTimeout(function()%20%7Bcircle.classList.add('circle')%3Bcircle.classL" +
"ist.add('smushed')%3Bcircle.classList.add('squeezed')%3Bif%20(i%20%3D%3D%3D%" +
"20circles.length%20-%201)%20%7BouterDiv.classList.add('clear')%3Bvar%20remov" +
"eTimeout%20%3D%20setTimeout(function()%20%7BhideAchievement()%3B%7D%2C%20250" +
")%3BglobalTimers.push(removeTimeout)%3B%7D%7D%2C%20timer)%3Btimer%20%2B%3D%2" +
"0200%3BglobalTimers.push(timeout)%3B%7D)(i)%3B%7D%7D%3Bvar%20hideAchievement" +
"%20%3D%20function()%20%7BiframeElement.parentNode.removeChild(iframeElement)" +
"%3BouterDiv.parentNode.removeChild(outerDiv)%3BachievementStyle.parentNode.r" +
"emoveChild(achievementStyle)%3B%7D%3Bfor%20(var%20i%20%3D%200%3B%20i%20%3C%2" +
"0globalTimers.length%3B%20i%2B%2B)%20%7BclearTimeout(globalTimers.shift())%3" +
"B%7DrevealAchievement()%3B%7D%3BdoTheThing('$TITLE_STRING'%2C%20'$GAMERSCORE" +
"_POINTS'%2C%20'$DESCRIPTION_STRING')%3B%7D)()%7D)()"
;

var safeHaven = function (string) {
    return string.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&apos;");
};

var doTheThing = function(achievementText, gamerscore, achievementDescription) {
    var achievementCss =
".hidden{display:none!important}.invisible{opacity:0!important}.green{backgro" +
"und-color:#008d00!important}.dark-green{background-color:#0b670c!important}." +
"darkest-green{background-color:#003102!important}#super-amazing-high-scoring" +
"-achievement{color:#fff!important;width:590px!important;height:104px!importa" +
"nt;position:fixed!important;left:50%!important;bottom:60px!important;transfo" +
"rm:translateX(-50%)!important;-webkit-transform:translateX(-50%)!important;-" +
"moz-transform:translateX(-50%)!important;-o-transform:translateX(-50%)!impor" +
"tant;border-radius:52px!important;-webkit-border-radius:52px!important;-moz-" +
"border-radius:52px!important;overflow:hidden!important;transition:width 1s c" +
"ubic-bezier(.7,.1,.1,.7)!important;-webkit-transition:width 1s cubic-bezier(" +
".7,.1,.1,.7)!important;-moz-transition:width 1s cubic-bezier(.7,.1,.1,.7)!im" +
"portant;-o-transition:width 1s cubic-bezier(.7,.1,.1,.7)!important;z-index:9" +
"001!important;font-family:'Open Sans',Verdana,sans-serif!important}#super-am" +
"azing-high-scoring-achievement.smushed{height:0!important}#super-amazing-hig" +
"h-scoring-achievement.squeezed{width:0!important}#super-amazing-high-scoring" +
"-achievement.clear{background-color:transparent!important}#super-amazing-hig" +
"h-scoring-achievement.ball{width:104px!important;transition:width .25s linea" +
"r,height .25s linear!important;-webkit-transition:width .25s linear,height ." +
"25s linear!important;-moz-transition:width .25s linear,height .25s linear!im" +
"portant;-o-transition:width .25s linear,height .25s linear!important}#super-" +
"amazing-high-scoring-achievement.ball .sphere{left:50%!important;top:50%!imp" +
"ortant;transform:translate(-50%,-50%)!important;-webkit-transform:translate(" +
"-50%,-50%)!important;-moz-transform:translate(-50%,-50%)!important;-o-transf" +
"orm:translate(-50%,-50%)!important}#super-amazing-high-scoring-achievement.r" +
"ock{width:104px!important}#super-amazing-high-scoring-achievement.rock .circ" +
"le{left:50%!important;top:50%!important;transform:translate(-50%,-50%)!impor" +
"tant;-webkit-transform:translate(-50%,-50%)!important;-moz-transform:transla" +
"te(-50%,-50%)!important;-o-transform:translate(-50%,-50%)!important}#super-a" +
"mazing-high-scoring-achievement .sphere{border-radius:52px!important;-webkit" +
"-border-radius:52px!important;-moz-border-radius:52px!important;width:104px!" +
"important;height:100%!important;position:absolute!important;left:0!important" +
";top:0!important;transition:width .25s linear,height .25s linear!important;-" +
"webkit-transition:width .25s linear,height .25s linear!important;-moz-transi" +
"tion:width .25s linear,height .25s linear!important;-o-transition:width .25s" +
" linear,height .25s linear!important}#super-amazing-high-scoring-achievement" +
" .sphere.trophy-icon{background-image:url(https://brandonhang.com/img/icons/" +
"trophy.svg)!important;background-size:60%!important;background-position:cent" +
"er center!important;background-repeat:no-repeat!important;transition:width ." +
"25s linear,height .25s linear,background-color 1s ease-in!important;-webkit-" +
"transition:width .25s linear,height .25s linear,background-color 1s ease-in!" +
"important;-moz-transition:width .25s linear,height .25s linear,background-co" +
"lor 1s ease-in!important;-o-transition:width .25s linear,height .25s linear," +
"background-color 1s ease-in!important}#super-amazing-high-scoring-achievemen" +
"t .sphere.smushed{height:0!important}#super-amazing-high-scoring-achievement" +
" .sphere.squeezed{width:0!important}#super-amazing-high-scoring-achievement " +
".title-wrapper{position:absolute!important;left:120px!important;top:50%!impo" +
"rtant;width:calc(100% - 130px)!important;transform:translateY(-50%)!importan" +
"t;-webkit-transform:translateY(-50%)!important;-moz-transform:translateY(-50" +
"%)!important;-o-transform:translateY(-50%)!important;transition:left .4s eas" +
"e-out,opacity .4s ease-out,top .4s ease-out,bottom .4s ease-out!important;-w" +
"ebkit-transition:left .4s ease-out,opacity .4s ease-out,top .4s ease-out,bot" +
"tom .4s ease-out!important;-moz-transition:left .4s ease-out,opacity .4s eas" +
"e-out,top .4s ease-out,bottom .4s ease-out!important;-o-transition:left .4s " +
"ease-out,opacity .4s ease-out,top .4s ease-out,bottom .4s ease-out!important" +
"}#super-amazing-high-scoring-achievement .title-wrapper.tucked-away{left:50%" +
"!important;opacity:0!important}#super-amazing-high-scoring-achievement .titl" +
"e-wrapper.underground{top:125%!important;opacity:0!important}#super-amazing-" +
"high-scoring-achievement .title-wrapper.sky-high{top:-50%!important;opacity:" +
"0!important}#super-amazing-high-scoring-achievement .title-wrapper .title{fo" +
"nt-weight:400!important;font-size:20px!important;margin:8px 0!important;whit" +
"e-space:nowrap!important;overflow:hidden!important}#super-amazing-high-scori" +
"ng-achievement .title-wrapper .title.bottom{text-overflow:ellipsis!important" +
"}#super-amazing-high-scoring-achievement .title-wrapper .title .gamerscore-i" +
"con{background-color:#fff!important;color:#0b670c!important;font-size:18px!i" +
"mportant;display:inline-block!important;width:28px!important;height:28px!imp" +
"ortant;line-height:28px!important;text-align:center!important;border-radius:" +
"52px!important;-webkit-border-radius:52px!important;-moz-border-radius:52px!" +
"important}"
;

    var popupId          = 'super-amazing-high-scoring-achievement';
    var achievementPopup = document.getElementById(popupId);

    if (achievementPopup) {
        achievementPopup.parentElement.removeChild(achievementPopup);
    }

    var outerDiv       = document.createElement('div');
    outerDiv.id        = popupId;
    outerDiv.className = 'dark-green smushed squeezed ball clear';

    var sphere1       = document.createElement('div');
    sphere1.id        = 'ball-1';
    sphere1.className = 'sphere darkest-green smushed squeezed';
    outerDiv.appendChild(sphere1);

    var sphere2       = document.createElement('div');
    sphere2.id        = 'ball-2';
    sphere2.className = 'sphere green smushed squeezed';
    outerDiv.appendChild(sphere2);

    var sphere3       = document.createElement('div');
    sphere3.id        = 'ball-3';
    sphere3.className = 'sphere dark-green smushed squeezed';
    outerDiv.appendChild(sphere3);

    var sphere4       = document.createElement('div');
    sphere4.id        = 'ball-4';
    sphere4.className = 'sphere green smushed squeezed';
    outerDiv.appendChild(sphere4);

    var trophyIcon       = document.createElement('div');
    trophyIcon.className = 'sphere trophy-icon dark-green smushed squeezed';
    outerDiv.appendChild(trophyIcon);

    var titleWrapper       = document.createElement('div');
    titleWrapper.className = 'title-wrapper tucked-away';
    outerDiv.appendChild(titleWrapper);

    var titleTop       = document.createElement('h3');
    titleTop.className = 'title top';
    titleTop.appendChild(document.createTextNode('Achievement unlocked'));
    titleWrapper.appendChild(titleTop);

    var titleBottom       = document.createElement('h3');
    titleBottom.className = 'title bottom';
    titleWrapper.appendChild(titleBottom);

    var gamerscoreIcon       = document.createElement('span');
    gamerscoreIcon.className = 'gamerscore-icon';
    gamerscoreIcon.appendChild(document.createTextNode('G'));
    titleBottom.appendChild(gamerscoreIcon);
    titleBottom.innerHTML += '&nbsp;';

    var achievementGamerscore = document.createElement('span');
    achievementGamerscore.id  = 'achievement-gamerscore';
    achievementGamerscore.appendChild(document.createTextNode(gamerscore));

    titleBottom.appendChild(achievementGamerscore);
    titleBottom.innerHTML += '&nbsp;-&nbsp;';

    var achievementTitle = document.createElement('span');
    achievementTitle.id  = 'achievement-title';
    achievementTitle.innerHTML = achievementText;
    titleBottom.appendChild(achievementTitle);

    var descriptionWrapper       = document.createElement('div');
    descriptionWrapper.className = 'title-wrapper tucked-away underground';
    outerDiv.appendChild(descriptionWrapper);

    var descTitle = document.createElement('h3');
    descTitle.className = 'title';
    descTitle.innerHTML = achievementDescription;
    descriptionWrapper.appendChild(descTitle);

    document.body.appendChild(outerDiv);

    var revealAchievement = function() {
        outerDiv.classList.remove('smushed');
        outerDiv.classList.remove('squeezed');

        if (audioElement.paused) {
            audioElement.play().catch(function() {});
        }
        else {
            audioElement.currentTime = 0;
        }

        var revealTimer = setTimeout(function() {
            revealSpheres();
        }, 350);
        globalTimers.push(revealTimer);
    };

    var revealSpheres = function() {
        var spheres = [ sphere1, sphere2, sphere3, sphere4, trophyIcon ];
        var timer = 0;

        for (var i = 0; i < spheres.length; i++) {
            (function(i) {
                var sphere = spheres[i];
                var timeout = setTimeout(function() {
                    sphere.classList.remove('smushed');
                    sphere.classList.remove('squeezed');

                    if (i === spheres.length - 1) {
                        outerDiv.classList.remove('clear');

                        var expandoTimeout = setTimeout(function() {
                            expandAchievement();
                        }, 250);
                        globalTimers.push(expandoTimeout);
                    }
                }, timer);

                timer += 200;
                globalTimers.push(timeout);
            })(i);
        }
    };

    var expandAchievement = function() {
        outerDiv.classList.remove('ball');
        trophyIcon.classList.add('green');
        trophyIcon.classList.remove('dark-green');

        var textTimeout = setTimeout(function() {
            showAchievementText();
        }, 800);
        globalTimers.push(textTimeout);
    };

    var showAchievementText = function() {
        titleWrapper.classList.remove('tucked-away');
        descriptionWrapper.classList.remove('tucked-away');
        sphere3.classList.add('hidden');
        sphere4.classList.add('hidden');

        var textTimer = setTimeout(function() {
            showAchievementDescription();
        }, 2000);
        globalTimers.push(textTimer);
    };

    var showAchievementDescription = function() {
        titleWrapper.classList.add('sky-high');
        descriptionWrapper.classList.remove('underground');

        var hideTimeout = setTimeout(function() {
            hideDescription();
        }, 2000);
        globalTimers.push(hideTimeout);

        var shrinkTimeout = setTimeout(function() {
            deflateGate();
        }, 2200);
        globalTimers.push(shrinkTimeout);
    };

    var hideDescription = function() {
        descriptionWrapper.classList.add('invisible');
    };

    var deflateGate = function() {
        outerDiv.classList.add('rock');
        trophyIcon.classList.add('dark-green');
        trophyIcon.classList.remove('green');

        var downsizeTimeout = setTimeout(function() {
            downsize();
        }, 1000);
        globalTimers.push(downsizeTimeout);
    };

    var downsize = function() {
        var circles = [ trophyIcon, sphere2, sphere1 ];
        var timer = 0;

        for (var i = 0; i < circles.length; i++) {
            (function(i) {
                var circle = circles[i];

                var timeout = setTimeout(function() {
                    circle.classList.add('circle');
                    circle.classList.add('smushed');
                    circle.classList.add('squeezed');

                    if (i === circles.length - 1) {
                        outerDiv.classList.add('clear');

                        var removeTimeout = setTimeout(function() {
                            hideAchievement();
                        }, 250);
                        globalTimers.push(removeTimeout);
                    }
                }, timer);

                timer += 200;
                globalTimers.push(timeout);
            })(i);
        }
    };

    var hideAchievement = function() {
        outerDiv.parentNode.removeChild(outerDiv);
    };

    for (var i = 0; i < globalTimers.length; i++) {
        clearTimeout(globalTimers.shift());
    }
    revealAchievement();
};

var extraEscape = function(string) {
    return encodeURIComponent(safeHaven(string));
};

var validateString = function(string, length) {
    return string ? string.substr(0, length) : '';
};

var validateInteger = function(number) {
    if (isNaN(number)) {
        return 0;
    }
    else if (number < 0) {
        return 0;
    }

    number = parseInt(number, 10);

    if (number > 1000000) {
        number = 1000000;
    }

    return number.toLocaleString();
};

var test = document.getElementById('you-will-submit');
test.addEventListener('click', function(event) {
    event.preventDefault();
    var inputTitle  = document.getElementById('input-title');
    var inputPoints = document.getElementById('input-points');
    var inputDesc   = document.getElementById('input-description');
    doTheThing(
        validateString(inputTitle.value, 30),
        validateInteger(inputPoints.value),
        validateString(inputDesc.value, 50)
    );
});

var submit = document.getElementById('gimme-gimme');
submit.addEventListener('click', function(event) {
    event.preventDefault();
    var inputTitle  = document.getElementById('input-title');
    var inputPoints = document.getElementById('input-points');
    var inputDesc   = document.getElementById('input-description');

    inputTitle  = extraEscape(validateString(inputTitle.value, 30));
    inputPoints = extraEscape(validateInteger(inputPoints.value));
    inputDesc   = extraEscape(validateString(inputDesc.value, 50));

    bookmarklet = bookmarklet.replace('$TITLE_STRING', inputTitle);
    bookmarklet = bookmarklet.replace('$GAMERSCORE_POINTS', inputPoints);
    bookmarklet = bookmarklet.replace('$DESCRIPTION_STRING', inputDesc);

    var bookmarkletButton       = document.getElementById('bookmarklet-button');
    var bookmarkletText         = document.getElementById('bookmarklet-text');
    bookmarkletButton.href      = bookmarklet;
    bookmarkletText.value       = bookmarklet;
    bookmarkletButton.className = '';
    bookmarkletText.className   = '';
});

if (window.location.search) {
    var queryString = window.location.search.substr(1);
    var queryMap = {};

    queryString.split('&').map(function(keyValueStr) {
        var splits = keyValueStr.split('=');
        queryMap[splits.shift()] = splits.shift();
    });

    if (queryMap.title && queryMap.points && queryMap.description) {
        var title       = validateString(decodeURI(queryMap.title), 30);
        var points      = validateInteger(decodeURI(queryMap.points));
        var description = validateString(decodeURI(queryMap.description), 50);

        setTimeout(function() {
            doTheThing(title, points, description);
        }, 100);
    }
}

})();


