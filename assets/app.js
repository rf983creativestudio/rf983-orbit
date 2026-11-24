const menuButton=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close navigation":"Open navigation")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}));document.addEventListener("keydown",e=>{if(e.key==="Escape"){nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}})}
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();
const toast=document.querySelector("#toast");let toastTimer;function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),2400)}
const searchable=[...document.querySelectorAll(".searchable")],searchForm=document.querySelector("#search-form"),searchInput=document.querySelector("#search"),searchStatus=document.querySelector("#search-status"),empty=document.querySelector("#empty");
function runSearch(term){term=term.trim().toLowerCase();let count=0;searchable.forEach(item=>{const hay=((item.dataset.search||"")+" "+item.textContent).toLowerCase(),match=!term||hay.includes(term);item.classList.toggle("search-hidden",!match);if(match)count++});if(empty)empty.hidden=count>0;if(searchStatus)searchStatus.textContent=term?count+" matching items found. Clear the search to show everything.":"Search all six destinations and featured content."}
if(searchForm&&searchInput){searchForm.addEventListener("submit",e=>{e.preventDefault();runSearch(searchInput.value);document.querySelector("#destinations")?.scrollIntoView({behavior:"smooth"})});searchInput.addEventListener("input",()=>{if(!searchInput.value.trim())runSearch("")})}
const facts=["A day on Venus lasts longer than its year. Explore the science of our neighbouring planet.","Octopuses have three hearts, and their blood is blue. The ocean is full of surprises.","Antarctica is a desert because it receives very little precipitation.","Earth's atmosphere gradually thins into space; it has no sharp outer edge.","A group of flamingos is often called a flamboyance."];
function surprise(){const result=document.querySelector("#random-result");if(result)result.textContent=facts[Math.floor(Math.random()*facts.length)];notify("A new discovery is waiting below.");document.querySelector("#discover")?.scrollIntoView({behavior:"smooth"})}
document.querySelector("#surprise")?.addEventListener("click",surprise);document.querySelector("#random")?.addEventListener("click",surprise);
const discoveryDeck=[
{cat:"SPACE / 002",title:"The universe is still expanding.",text:"Galaxies, on the largest scales, are moving farther apart as space itself expands."},
{cat:"OCEAN / 003",title:"Most of the ocean remains unexplored.",text:"The deep sea is difficult to study, and many underwater places and species are still waiting to be documented."},
{cat:"ANIMAL LIFE / 004",title:"Some turtles can sense Earth's magnetic field.",text:"Several turtle species use Earth's magnetic field as a navigation aid during long migrations."},
{cat:"NATURE / 005",title:"A single tree can host a whole ecosystem.",text:"Trees provide food, shelter and breeding places for countless organisms, from fungi to insects and birds."},
{cat:"HISTORY / 006",title:"The oldest known writing systems are thousands of years old.",text:"Early writing emerged in ancient Mesopotamia and Egypt more than five millennia ago."},
{cat:"PLANET EARTH / 007",title:"Earth is not a perfect sphere.",text:"Our planet bulges slightly around the equator because of its rotation."}
];
let discoveryIndex=0;
const revealButton=document.querySelector("#next-discovery");
revealButton?.addEventListener("click",()=>{
 const item=discoveryDeck[discoveryIndex];
 document.querySelector("#lab-category").textContent=item.cat;
 document.querySelector("#lab-title").textContent=item.title;
 document.querySelector("#lab-text").textContent=item.text;
 document.querySelector("#lab-count").textContent="DISCOVERY "+String(discoveryIndex+1).padStart(2,"0")+" / "+String(discoveryDeck.length).padStart(2,"0");
 discoveryIndex=(discoveryIndex+1)%discoveryDeck.length;
 revealButton.innerHTML=discoveryIndex===0?'Explore again <span>↗</span>':'Reveal another <span>↗</span>';
});
const techTopics={
ai:{label:"SIGNAL 01 / THE BIG IDEA",title:"Artificial intelligence, made approachable.",description:"Artificial intelligence (AI) describes computer systems designed to perform tasks that usually require human-like abilities, such as recognising patterns, understanding language or making predictions.",takeaway:"AI is a broad field of technology. It can be useful, but its output still needs human judgement and checking."},
safety:{label:"SIGNAL 02 / STAY SECURE",title:"Cybersecurity is digital self-defence.",description:"Cybersecurity is the practice of protecting devices, accounts, networks and information from unauthorised access, damage or disruption.",takeaway:"Use unique passwords, turn on multi-factor authentication where possible, keep software updated and pause before opening unexpected links."},
future:{label:"SIGNAL 03 / LOOK AHEAD",title:"Tomorrow's technology starts with questions.",description:"Fields such as robotics, clean energy, space science and advanced materials are exploring new ways to solve difficult problems. Progress often comes through many small discoveries.",takeaway:"A promising technology should be judged not only by what it can do, but also by its safety, accessibility and real-world impact."},
create:{label:"SIGNAL 04 / MAKE SOMETHING",title:"Digital creativity turns ideas into experiences.",description:"Design, coding, animation, audio and digital storytelling let people communicate ideas and build useful things with accessible creative tools.",takeaway:"Start with a small project, experiment, get feedback and improve it. You do not need to master every tool before you begin."}
};
const techTabs=[...document.querySelectorAll(".radar-tab")];
techTabs.forEach(tab=>tab.addEventListener("click",()=>{
 const item=techTopics[tab.dataset.tech];
 if(!item)return;
 techTabs.forEach(button=>{const active=button===tab;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
 document.querySelector("#tech-label").textContent=item.label;
 document.querySelector("#tech-title").textContent=item.title;
 document.querySelector("#tech-description").textContent=item.description;
 document.querySelector("#tech-takeaway").textContent=item.takeaway;
}));
const quiz=[{cat:"SCIENCE",q:"Which planet has the most prominent ring system?",a:["Jupiter","Saturn","Mars"],correct:1,why:"Saturn's bright, extensive rings are made mostly of ice particles, with rocky debris and dust."},{cat:"GEOGRAPHY",q:"Which is the largest ocean on Earth?",a:["Atlantic Ocean","Indian Ocean","Pacific Ocean"],correct:2,why:"The Pacific Ocean is the largest and deepest of Earth's ocean basins."},{cat:"NATURE",q:"What is the only mammal capable of true sustained flight?",a:["Flying squirrel","Bat","Sugar glider"],correct:1,why:"Bats are the only mammals capable of sustained powered flight. Flying squirrels glide."}];
let qi=0,answered=false;const qNode=document.querySelector("#question"),answers=document.querySelector("#answers"),feedback=document.querySelector("#feedback"),next=document.querySelector("#next");
function renderQuiz(){const q=quiz[qi];answered=false;document.querySelector("#quiz-category").textContent=q.cat;document.querySelector("#quiz-count").textContent="QUESTION "+String(qi+1).padStart(2,"0")+" / 03";document.querySelector("#progress").style.width=((qi+1)/3*100)+"%";qNode.textContent=q.q;feedback.textContent="Choose your answer to reveal the explanation.";next.disabled=true;next.textContent=qi===2?"Start again →":"Next question →";answers.replaceChildren();q.a.forEach((label,i)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",()=>{if(answered)return;answered=true;[...answers.children].forEach((el,j)=>{el.disabled=true;if(j===q.correct)el.classList.add("correct");else if(j===i)el.classList.add("incorrect")});feedback.textContent=(i===q.correct?"Correct! ":"Not quite. ")+q.why;next.disabled=false});answers.append(b)})}
if(qNode&&answers&&next){renderQuiz();next.addEventListener("click",()=>{qi=(qi+1)%quiz.length;renderQuiz()})}
const wordInput=document.querySelector("#word-input");wordInput?.addEventListener("input",()=>{const value=wordInput.value;document.querySelector("#words").textContent=value.trim()?value.trim().split(/\s+/).length:0;document.querySelector("#chars").textContent=value.length});
const km=document.querySelector("#km");km?.addEventListener("input",()=>{const v=Number(km.value);document.querySelector("#miles").textContent=km.value.trim()&&Number.isFinite(v)&&v>=0?(v*.621371).toFixed(2):"0.00"});
function clock(){const now=new Date();document.querySelector("#clock").textContent=new Intl.DateTimeFormat(undefined,{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(now);document.querySelector("#timezone").textContent=Intl.DateTimeFormat().resolvedOptions().timeZone||"YOUR LOCAL TIME"}clock();setInterval(clock,1000);


/* RF983 ORBIT World Explorer */
const worldRegions={
 asia:{label:"CONTINENT 01 / ASIA",symbol:"🌏",title:"A world of ancient stories and bold new ideas.",description:"Asia is the largest continent, home to extraordinary landscapes, languages, cuisines and cultural traditions.",landmark:"The Great Wall of China",culture:"Temples, festivals and food traditions"},
 africa:{label:"CONTINENT 02 / AFRICA",symbol:"🌍",title:"A continent rich in life, rhythm and heritage.",description:"Africa's landscapes range from vast deserts and savannas to tropical forests, alongside an extraordinary diversity of communities and creative traditions.",landmark:"The Pyramids of Giza",culture:"Music, textiles and living heritage"},
 europe:{label:"CONTINENT 03 / EUROPE",symbol:"🏛️",title:"Centuries of art, ideas and architecture.",description:"Europe brings together varied languages, landscapes and histories, from Mediterranean coastlines to northern forests and alpine peaks.",landmark:"The Colosseum in Rome",culture:"Art, architecture and regional cuisines"},
 northamerica:{label:"CONTINENT 04 / NORTH AMERICA",symbol:"🗽",title:"Big landscapes and many cultural stories.",description:"From Arctic regions to tropical coastlines, North America includes immense natural variety and communities shaped by many histories.",landmark:"The Grand Canyon",culture:"Indigenous knowledge, music and festivals"},
 southamerica:{label:"CONTINENT 05 / SOUTH AMERICA",symbol:"🌿",title:"Where rainforest, mountains and creativity meet.",description:"South America is known for the Andes, the Amazon basin and vibrant cultural expressions across its many countries.",landmark:"Machu Picchu in Peru",culture:"Dance, craft and diverse food traditions"},
 oceania:{label:"CONTINENT 06 / OCEANIA",symbol:"🐚",title:"Island worlds connected by the ocean.",description:"Oceania spans Australia, Aotearoa New Zealand and thousands of Pacific islands, with unique ecosystems and deep maritime traditions.",landmark:"The Great Barrier Reef",culture:"Pacific navigation and island cultures"}
};
const continentButtons=[...document.querySelectorAll(".continent-btn")];
continentButtons.forEach(button=>button.addEventListener("click",()=>{
 const region=worldRegions[button.dataset.continent];if(!region)return;
 continentButtons.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));});
 document.querySelector("#world-region").textContent=region.label;
 document.querySelector("#world-symbol").textContent=region.symbol;
 document.querySelector("#world-title").textContent=region.title;
 document.querySelector("#world-description").textContent=region.description;
 document.querySelector("#world-landmark").textContent=region.landmark;
 document.querySelector("#world-culture").textContent=region.culture;
 document.querySelector("#world-count").textContent=region.label.split(" / ")[0]+" / 06 REGIONS";
}));


/* RF983 ORBIT — interactive solar-system planet files */
const planetFiles={
 mercury:{type:"THE SMALLEST PLANET / EXTREME WORLD",name:"Mercury",description:"Mercury is the smallest planet and the closest to the Sun. Its surface is covered with ancient craters, and temperatures swing dramatically between day and night.",value:"88",label:"EARTH DAYS / ONE ORBIT"},
 venus:{type:"THE HOTTEST PLANET / CLOUD-WRAPPED WORLD",name:"Venus",description:"Venus has a thick atmosphere rich in carbon dioxide. Its powerful greenhouse effect makes it hotter than Mercury, even though it is farther from the Sun.",value:"225",label:"EARTH DAYS / ONE ORBIT"},
 earth:{type:"THE BLUE PLANET / OUR HOME",name:"Earth",description:"The only world we currently know to support life, with vast oceans, a protective atmosphere and a remarkable diversity of ecosystems.",value:"365.25",label:"EARTH DAYS / ONE ORBIT"},
 mars:{type:"THE RED PLANET / A WORLD OF EXPLORATION",name:"Mars",description:"Mars is a cold desert world with giant volcanoes, deep canyons and evidence that liquid water once flowed across its surface.",value:"687",label:"EARTH DAYS / ONE ORBIT"},
 jupiter:{type:"THE GIANT / KING OF THE PLANETS",name:"Jupiter",description:"Jupiter is the largest planet in our solar system. Its Great Red Spot is a gigantic storm that has been observed for centuries.",value:"11.86",label:"EARTH YEARS / ONE ORBIT"},
 saturn:{type:"THE RINGED PLANET / GAS GIANT",name:"Saturn",description:"Saturn's spectacular rings are made mostly of countless pieces of ice, along with rocky material and dust. The planet is so low in density that its average density is less than water.",value:"29.4",label:"EARTH YEARS / ONE ORBIT"},
 uranus:{type:"THE SIDEWAYS PLANET / ICE GIANT",name:"Uranus",description:"Uranus rotates on its side, giving it extreme seasons. Its blue-green colour comes from methane in its atmosphere.",value:"84",label:"EARTH YEARS / ONE ORBIT"},
 neptune:{type:"THE WINDY WORLD / DISTANT ICE GIANT",name:"Neptune",description:"Neptune is the most distant recognised planet from the Sun. It is dark, cold and swept by supersonic winds.",value:"165",label:"EARTH YEARS / ONE ORBIT"}
};
const planetButtons=[...document.querySelectorAll(".planet-choice")];
planetButtons.forEach(button=>button.addEventListener("click",()=>{
 const planet=planetFiles[button.dataset.planet];if(!planet)return;
 planetButtons.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));});
 document.querySelector("#planet-type").textContent=planet.type;
 document.querySelector("#planet-name").textContent=planet.name;
 document.querySelector("#planet-description").textContent=planet.description;
 document.querySelector("#planet-stat-value").textContent=planet.value;
 document.querySelector("#planet-stat-label").textContent=planet.label;
}));


/* Interactive RF983 galaxy: world selection, surface environments and zoom */
const galaxyWorlds = {
 terra:{label:"DESTINATION 01 / TERRA",name:"Terra — the living world",description:"A vivid world of forests, oceans, wildlife and extraordinary ecosystems. Begin your journey by discovering the wonders of the planet we call home.",emoji:"🌍",code:"TERRA · SURFACE 01",title:"Welcome to Terra.",summary:"A living world of blue oceans, green continents and extraordinary ecosystems. Your first expedition begins here.",climate:"DIVERSE",sites:[["The wild frontier","Discover forests, wildlife and living ecosystems","#discover"],["Ocean worlds","Journey across seas, reefs and the deep blue","#explore"],["Planet lab","Understand climate, habitats and our home","#learn"]]},
 chronos:{label:"DESTINATION 02 / CHRONOS",name:"Chronos — the world of time",description:"Travel through ancient civilisations, lost cities, remarkable people, inventions and turning points that shaped human history.",emoji:"⌛",code:"CHRONOS · TIME SECTOR",title:"Welcome to Chronos.",summary:"A world of forgotten empires, ancient knowledge and human stories. Follow the traces left behind by time.",climate:"ANCIENT",sites:[["Lost civilisations","Visit the stories of ancient societies","#learn"],["Monuments & mysteries","Explore remarkable heritage and landmarks","#explore"],["Invention archive","Meet ideas that changed history","#technology"]]},
 nova:{label:"DESTINATION 03 / NOVA",name:"Nova — the science frontier",description:"Explore the universe of science: curious experiments, physics, space discoveries, engineering and ideas that change how we understand reality.",emoji:"⚛️",code:"NOVA · RESEARCH SECTOR",title:"Welcome to Nova.",summary:"A bright frontier of experiments, cosmic questions and scientific breakthroughs. Curiosity is your research equipment.",climate:"ENERGETIC",sites:[["Cosmic observatory","Explore planets, stars and space science","#solar-system"],["The experiment deck","Unpack fascinating scientific ideas","#discover"],["Future laboratory","Meet inventions and emerging technology","#technology"]]},
 odyssey:{label:"DESTINATION 04 / ODYSSEY",name:"Odyssey — worlds and cultures",description:"Set out across continents. Discover extraordinary places, languages, architecture, traditions, food and the stories of people around the world.",emoji:"🧭",code:"ODYSSEY · EXPLORATION SECTOR",title:"Welcome to Odyssey.",summary:"A world without borders, filled with landscapes, languages, architecture and the many ways people experience life.",climate:"EVER-CHANGING",sites:[["Continental routes","Explore the world's continents","#explore"],["Culture compass","Discover traditions, food and languages","#earthside"],["Wonder destinations","Find remarkable places and landmarks","#discover"]]},
 lumina:{label:"DESTINATION 05 / LUMINA",name:"Lumina — the creative dimension",description:"A world for imagination: art, design, photography, storytelling, music, digital making and unexpected creative experiments.",emoji:"✦",code:"LUMINA · CREATIVE SECTOR",title:"Welcome to Lumina.",summary:"A luminous dimension where imagination becomes expression. Bring an idea and see where it can take you.",climate:"INSPIRATIONAL",sites:[["The art gallery","Explore colour, design and visual ideas","#earthside"],["Motion Studio","Animate scenes, shapes and visual stories","motion/"],["Sound Lab","Create melodies, rhythms and ambient sound","sound/"],["Creator studio","Make patterns, pixel art and posters","creative/"]]},
 nexus:{label:"DESTINATION 06 / NEXUS",name:"Nexus — the future systems",description:"Look ahead at artificial intelligence, robotics, cybersecurity, digital culture, emerging technology and the choices shaping tomorrow.",emoji:"⌘",code:"NEXUS · FUTURE SECTOR",title:"Welcome to Nexus.",summary:"A connected world of intelligent systems, digital frontiers and technologies reshaping everyday life.",climate:"EVOLVING",sites:[["AI observatory","Understand artificial intelligence","#technology"],["Digital shield","Explore privacy and cybersecurity","#technology"],["Tomorrow's systems","Discover inventions and future ideas","#discover"]]},
 arcade:{label:"DESTINATION 07 / ARCADE",name:"Arcade — the play dimension",description:"Take a break from exploring and challenge yourself with quick games, puzzles, quizzes, brain teasers and playful missions.",emoji:"🎮",code:"ARCADE · PLAY SECTOR",title:"Welcome to Arcade.",summary:"A playful world of quick challenges and curious experiments. Sharpen your mind, test your instincts and have fun.",climate:"HIGH ENERGY",sites:[["Brain break arena","Take on the daily quiz","#play"],["Puzzle station","Put your logic to the test","#play"],["Creative playground","Experiment, make and imagine","#earthside"]]}
};
const galaxyButtons=[...document.querySelectorAll(".galaxy-world")];
const setExpeditionSite=(index,site)=>{
 const link=document.querySelector("#expedition-site-"+index);
 const title=document.querySelector("#expedition-site-title-"+index);
 const desc=document.querySelector("#expedition-site-desc-"+index);
 if(link&&title&&desc){link.href=site[2];title.textContent=site[0];desc.textContent=site[1];}
};
const selectGalaxyWorld=(button)=>{
 const item=galaxyWorlds[button.dataset.world];if(!item)return;
 galaxyButtons.forEach(node=>{const active=node===button;node.classList.toggle("active",active);node.setAttribute("aria-pressed",String(active));});
 document.querySelector("#galaxy-label").textContent=item.label;
 document.querySelector("#galaxy-name").textContent=item.name;
 document.querySelector("#galaxy-description").textContent=item.description;
 const link=document.querySelector("#galaxy-link");link.href="#galaxy-expedition";link.textContent="OPEN EXPEDITION ↗";
 const panel=document.querySelector("#galaxy-expedition");
 if(panel){
  panel.dataset.environment=button.dataset.world;
  document.querySelector("#expedition-planet").textContent=item.emoji;
  document.querySelector("#expedition-code").textContent=item.code;
  document.querySelector("#expedition-title").textContent=item.title;
  document.querySelector("#expedition-summary").textContent=item.summary;
  document.querySelector("#expedition-climate").textContent=item.climate;
  item.sites.forEach((site,index)=>setExpeditionSite(index+1,site));
 }
};
galaxyButtons.forEach(button=>button.addEventListener("click",()=>selectGalaxyWorld(button)));
const galaxyUniverse=document.querySelector("#galaxy-universe");
let galaxyZoom=1;
const setGalaxyZoom=()=>{if(galaxyUniverse)galaxyUniverse.style.setProperty("--galaxy-zoom",galaxyZoom);};
document.querySelector("#galaxy-zoom-in")?.addEventListener("click",()=>{galaxyZoom=Math.min(1.35,+(galaxyZoom+.1).toFixed(2));setGalaxyZoom();});
document.querySelector("#galaxy-zoom-out")?.addEventListener("click",()=>{galaxyZoom=Math.max(.8,+(galaxyZoom-.1).toFixed(2));setGalaxyZoom();});
document.querySelector("#galaxy-reset")?.addEventListener("click",()=>{galaxyZoom=1;setGalaxyZoom();});


/* RF983 ORBIT — interactive Learn mini-lessons */
const lessonContent={
 focus:{label:"MINI LESSON 01 / LEARNING",title:"Make learning easier to return to.",intro:"A useful learning routine is small enough to repeat and flexible enough to survive a busy day.",steps:[["01","Choose one clear goal","Decide exactly what you want to understand today."],["02","Work in a short session","Try 20 focused minutes, then take a short break."],["03","Recall, don't just reread","Close your notes and explain the idea in your own words."]],task:"Pick one topic and write down one question you want answered."},
 verify:{label:"MINI LESSON 02 / MEDIA LITERACY",title:"Pause before you pass information on.",intro:"Online posts can be useful, misleading or incomplete. A quick check helps you judge what deserves your trust.",steps:[["01","Find the original source","Look for the person, organisation or document behind the claim."],["02","Check the date and context","An old story, cropped image or short clip can leave out important details."],["03","Compare independent sources","See whether other reliable outlets or primary sources support the same claim."]],task:"Choose one claim you recently saw online and trace it back to its original source."},
 create:{label:"MINI LESSON 03 / CREATIVITY",title:"Turn a small idea into something real.",intro:"Creative projects become easier when you make a tiny first version instead of waiting for a perfect plan.",steps:[["01","Write the idea in one sentence","Describe who it helps or what experience it should create."],["02","Build the smallest version","Sketch it, write a sample or make a simple prototype."],["03","Test and improve","Show it to someone, notice what works and make one useful change."]],task:"Give yourself 15 minutes to create a rough first draft of one idea."}
};
const lessonButtons=[...document.querySelectorAll(".lesson-open")];
function showLesson(key){
 const lesson=lessonContent[key];if(!lesson)return;
 lessonButtons.forEach(button=>{const active=button.dataset.lesson===key;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
 const label=document.querySelector("#lesson-label"),title=document.querySelector("#lesson-title"),intro=document.querySelector("#lesson-intro"),steps=document.querySelector("#lesson-steps"),task=document.querySelector("#lesson-task");
 if(!label||!title||!intro||!steps||!task)return;
 label.textContent=lesson.label;title.textContent=lesson.title;intro.textContent=lesson.intro;task.textContent=lesson.task;
 steps.replaceChildren();
 lesson.steps.forEach(([number,heading,description])=>{const item=document.createElement("div"),numberNode=document.createElement("b"),headingNode=document.createElement("strong"),descriptionNode=document.createElement("p");numberNode.textContent=number;headingNode.textContent=heading;descriptionNode.textContent=description;item.append(numberNode,headingNode,descriptionNode);steps.append(item)});
}
lessonButtons.forEach(button=>button.addEventListener("click",()=>showLesson(button.dataset.lesson)));


/* RF983 ORBIT ARCADE — Number Hunt, Reaction Test and Memory Grid */
const arcadeTabs=[...document.querySelectorAll(".arcade-tab")];
const arcadeGames={number:document.querySelector("#arcade-number"),reaction:document.querySelector("#arcade-reaction"),memory:document.querySelector("#arcade-memory")};
arcadeTabs.forEach(tab=>tab.addEventListener("click",()=>{
 const key=tab.dataset.game;
 arcadeTabs.forEach(item=>{const active=item===tab;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));});
 Object.entries(arcadeGames).forEach(([name,panel])=>{if(panel)panel.hidden=name!==key;});
}));
let arcadeCleared=0;
try{const savedArcade=JSON.parse(localStorage.getItem("rf983OrbitArcade")||"{}");arcadeCleared=Number.isFinite(savedArcade.clears)?Math.max(0,savedArcade.clears):0;}catch(error){}
const arcadeScore=document.querySelector("#arcade-score");
if(arcadeScore)arcadeScore.textContent="CHALLENGES CLEARED: "+arcadeCleared;
function markArcadeClear(){arcadeCleared++;if(arcadeScore)arcadeScore.textContent="CHALLENGES CLEARED: "+arcadeCleared;try{localStorage.setItem("rf983OrbitArcade",JSON.stringify({clears:arcadeCleared}));}catch(error){}if(typeof renderOrbitAchievements==="function")renderOrbitAchievements();}
let hiddenNumber=1+Math.floor(Math.random()*20),numberTries=0,numberFinished=false;
const numberForm=document.querySelector("#number-form"),numberGuess=document.querySelector("#number-guess"),numberFeedback=document.querySelector("#number-feedback"),numberAttempts=document.querySelector("#number-attempts");
function resetNumber(){hiddenNumber=1+Math.floor(Math.random()*20);numberTries=0;numberFinished=false;if(numberGuess){numberGuess.value="";numberGuess.disabled=false;}if(numberFeedback)numberFeedback.textContent="Enter a number to begin. You have 5 attempts.";if(numberAttempts)numberAttempts.textContent="ATTEMPTS: 0 / 5";}
numberForm?.addEventListener("submit",event=>{
 event.preventDefault();if(numberFinished||!numberGuess)return;
 const guess=Number(numberGuess.value);
 if(!Number.isInteger(guess)||guess<1||guess>20){numberFeedback.textContent="Choose a whole number from 1 to 20.";return;}
 numberTries++;if(numberAttempts)numberAttempts.textContent="ATTEMPTS: "+numberTries+" / 5";
 if(guess===hiddenNumber){numberFeedback.textContent="Brilliant! You found "+hiddenNumber+" in "+numberTries+" attempt"+(numberTries===1?"":"s")+". New number?";numberFinished=true;numberGuess.disabled=true;markArcadeClear();}
 else if(numberTries>=5){numberFeedback.textContent="Challenge over — the number was "+hiddenNumber+". Try a fresh round!";numberFinished=true;numberGuess.disabled=true;}
 else numberFeedback.textContent=guess<hiddenNumber?"Too low — try a higher number.":"Too high — try a lower number.";
});
document.querySelector("#number-reset")?.addEventListener("click",resetNumber);
let reactionState="idle",reactionTimer=null,reactionStarted=0,reactionBest=null;
const reactionPad=document.querySelector("#reaction-pad"),reactionMessage=document.querySelector("#reaction-message"),reactionSub=document.querySelector("#reaction-sub"),reactionFeedback=document.querySelector("#reaction-feedback");
function reactionIdle(message){reactionState="idle";if(reactionTimer)clearTimeout(reactionTimer);reactionTimer=null;if(reactionPad)reactionPad.dataset.state="idle";if(reactionMessage)reactionMessage.textContent="START REACTION TEST";if(reactionSub)reactionSub.textContent="DON'T CLICK TOO EARLY";if(message&&reactionFeedback)reactionFeedback.textContent=message;}
reactionPad?.addEventListener("click",()=>{
 if(reactionState==="idle"){
  reactionState="waiting";reactionPad.dataset.state="waiting";reactionMessage.textContent="WAIT FOR GREEN…";reactionSub.textContent="HOLD YOUR NERVE";
  reactionTimer=setTimeout(()=>{reactionState="ready";reactionStarted=performance.now();reactionPad.dataset.state="ready";reactionMessage.textContent="CLICK NOW!";reactionSub.textContent="GO GO GO";},1200+Math.random()*2600);
 }else if(reactionState==="waiting"){reactionIdle("Too soon! You clicked before the signal. Try again.");}
 else if(reactionState==="ready"){
  const elapsed=Math.round(performance.now()-reactionStarted);reactionState="result";reactionPad.dataset.state="result";reactionMessage.textContent=elapsed+" ms";reactionSub.textContent="REACTION TIME";
  if(reactionBest===null||elapsed<reactionBest)reactionBest=elapsed;
  reactionFeedback.textContent="Your time: "+elapsed+" ms · Best this visit: "+reactionBest+" ms";markArcadeClear();
  setTimeout(()=>{if(reactionState==="result")reactionIdle("Ready for another round?");},1700);
 }
});
let memorySequence=[],memoryInput=[],memoryLevel=1,memoryBusy=false;
const memoryTiles=[...document.querySelectorAll("#memory-grid [data-tile]")],memoryFeedback=document.querySelector("#memory-feedback"),memoryLevelNode=document.querySelector("#memory-level"),memoryStart=document.querySelector("#memory-start");
function flashMemory(index,duration=340){const tile=memoryTiles[index];if(!tile)return;tile.classList.add("lit");setTimeout(()=>tile.classList.remove("lit"),duration);}
function playMemorySequence(){
 if(memoryBusy)return;memoryBusy=true;memoryInput=[];memorySequence=Array.from({length:Math.min(2+memoryLevel,7)},()=>Math.floor(Math.random()*4));
 if(memoryFeedback)memoryFeedback.textContent="Watch closely…";
 memoryStart.disabled=true;memoryTiles.forEach(tile=>tile.disabled=true);
 memorySequence.forEach((value,index)=>setTimeout(()=>{flashMemory(value,420);if(index===memorySequence.length-1)setTimeout(()=>{memoryBusy=false;memoryTiles.forEach(tile=>tile.disabled=false);if(memoryFeedback)memoryFeedback.textContent="Your turn — repeat the "+memorySequence.length+" signals.";memoryStart.disabled=false;},520);},650+index*760));
}
memoryStart?.addEventListener("click",()=>{memoryLevel=1;if(memoryLevelNode)memoryLevelNode.textContent="LEVEL: "+memoryLevel;playMemorySequence();});
memoryTiles.forEach(tile=>tile.addEventListener("click",()=>{
 if(memoryBusy||!memorySequence.length)return;
 const value=Number(tile.dataset.tile);flashMemory(value,220);memoryInput.push(value);
 const position=memoryInput.length-1;
 if(memorySequence[position]!==value){memoryBusy=true;memoryTiles.forEach(item=>item.disabled=true);if(memoryFeedback)memoryFeedback.textContent="Not quite — you reached level "+memoryLevel+". Start again to retry.";memorySequence=[];memoryBusy=false;memoryStart.disabled=false;memoryStart.textContent="TRY AGAIN ↻";return;}
 if(memoryInput.length===memorySequence.length){memoryLevel++;markArcadeClear();if(memoryLevelNode)memoryLevelNode.textContent="LEVEL: "+memoryLevel;if(memoryFeedback)memoryFeedback.textContent="Perfect sequence! Get ready for the next level.";memoryBusy=true;memoryTiles.forEach(item=>item.disabled=true);setTimeout(()=>{memoryBusy=false;playMemorySequence();},900);}
}));


/* ORBIT DAILY MISSIONS — date-rotating challenges and local streak */
const dailyMissions=[
 {type:"OBSERVE / WORLD",title:"Find a tiny wonder nearby.",description:"Look closely at a plant, cloud, building or everyday object. Discover one detail you had never noticed before.",action:"Observe something closely and learn one new detail."},
 {type:"CURIOSITY / LEARN",title:"Follow one question.",description:"Choose a question you've wondered about and spend five minutes finding an answer from a reliable source.",action:"Find an answer to one question and check where it came from."},
 {type:"CREATIVITY / MAKE",title:"Create a tiny something.",description:"Make a quick sketch, write a four-line story, design a symbol or invent a playful idea. Small creations count.",action:"Make one small original thing today."},
 {type:"DISCOVERY / EXPLORE",title:"Explore somewhere new.",description:"Discover a place you've never visited — it could be a city, a landmark, a natural wonder or a spot on a map.",action:"Learn three interesting facts about a new place."},
 {type:"TECH / UNDERSTAND",title:"Decode a piece of technology.",description:"Pick a technology you use every day and learn, in simple terms, how one part of it works.",action:"Explain one everyday technology in your own words."},
 {type:"MEMORY / CHALLENGE",title:"Give your memory a workout.",description:"Look at five objects around you, look away, then try to recall all five in order.",action:"Recall five objects in the correct order."},
 {type:"KINDNESS / CONNECT",title:"Send a positive signal.",description:"Share a useful fact, encourage someone or help with a small task. Make someone's day a little brighter.",action:"Do one thoughtful thing for someone today."}
];
const dailyDateNode=document.querySelector("#daily-date"),dailyType=document.querySelector("#daily-type"),dailyTitle=document.querySelector("#daily-title"),dailyDescription=document.querySelector("#daily-description"),dailyProgress=document.querySelector("#daily-progress"),dailyComplete=document.querySelector("#daily-complete"),dailyStreakNode=document.querySelector("#daily-streak"),dailyXpNode=document.querySelector("#daily-xp"),dailyNote=document.querySelector("#daily-note");
function localDateKey(date=new Date()){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");}
function previousDateKey(key){const [year,month,day]=key.split("-").map(Number);const date=new Date(year,month-1,day);date.setDate(date.getDate()-1);return localDateKey(date);}
const todayKey=localDateKey();
const dayOrdinal=Math.floor(Date.UTC(...todayKey.split("-").map((part,index)=>index===1?Number(part)-1:Number(part)))/86400000);
const dailyMission=dailyMissions[((dayOrdinal%dailyMissions.length)+dailyMissions.length)%dailyMissions.length];
let dailyState={lastCompleted:"",streak:0,bestStreak:0,xp:0};
try{const saved=JSON.parse(localStorage.getItem("rf983OrbitDaily")||"{}");if(saved&&typeof saved==="object")dailyState={lastCompleted:typeof saved.lastCompleted==="string"?saved.lastCompleted:"",streak:Number.isFinite(saved.streak)?Math.max(0,saved.streak):0,bestStreak:Number.isFinite(saved.bestStreak)?Math.max(0,saved.bestStreak):(Number.isFinite(saved.streak)?Math.max(0,saved.streak):0),xp:Number.isFinite(saved.xp)?Math.max(0,saved.xp):0};}catch(error){}
function renderDailyMission(){
 if(!dailyTitle)return;
 if(dailyDateNode)dailyDateNode.textContent=new Date().toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"}).toUpperCase();
 dailyType.textContent="MISSION / "+dailyMission.type;
 dailyTitle.textContent=dailyMission.title;
 dailyDescription.textContent=dailyMission.description;
 if(dailyStreakNode)dailyStreakNode.textContent=String(dailyState.streak);
 if(dailyXpNode)dailyXpNode.textContent=String(dailyState.xp);
 const done=dailyState.lastCompleted===todayKey;
 if(dailyProgress)dailyProgress.textContent=done?"MISSION COMPLETE ✓":"MISSION NOT COMPLETED";
 if(dailyComplete){dailyComplete.disabled=done;dailyComplete.textContent=done?"MISSION COMPLETE ✓":"MARK MISSION COMPLETE ↗";}
 if(dailyNote)dailyNote.textContent=done?"Mission logged! "+dailyMission.action+" Come back tomorrow for a new transmission.":"Your mission: "+dailyMission.action+" Progress is saved on this device.";
}
dailyComplete?.addEventListener("click",()=>{
 if(dailyState.lastCompleted===todayKey)return;
 dailyState.streak=dailyState.lastCompleted===previousDateKey(todayKey)?dailyState.streak+1:1;
 dailyState.lastCompleted=todayKey;dailyState.bestStreak=Math.max(dailyState.bestStreak,dailyState.streak);dailyState.xp+=50;
 try{localStorage.setItem("rf983OrbitDaily",JSON.stringify(dailyState));}catch(error){if(dailyNote)dailyNote.textContent="Mission completed for this visit. Your browser may not allow progress to be saved.";}
 renderDailyMission();
 if(typeof renderOrbitAchievements==="function")renderOrbitAchievements();
});
renderDailyMission();


/* ORBIT PROFILE — local XP levels, personal records and collectible badges */
const orbitBadgeDefinitions=[
 {id:"first-mission",icon:"✦",name:"First Signal",detail:"Complete your first daily mission",unlock:()=>dailyState.xp>=50},
 {id:"arcade-ace",icon:"⚡",name:"Arcade Ace",detail:"Clear your first arcade challenge",unlock:()=>arcadeCleared>=1},
 {id:"curious-mind",icon:"🔭",name:"Curious Mind",detail:"Earn 150 mission XP",unlock:()=>dailyState.xp>=150},
 {id:"streak-three",icon:"🔥",name:"On a Roll",detail:"Reach a 3-day mission streak",unlock:()=>dailyState.bestStreak>=3},
 {id:"game-explorer",icon:"🎮",name:"Game Explorer",detail:"Clear 5 arcade challenges",unlock:()=>arcadeCleared>=5},
 {id:"orbit-regular",icon:"🌟",name:"Orbit Regular",detail:"Reach a 7-day mission streak",unlock:()=>dailyState.bestStreak>=7}
];
const orbitLevelNames=["ROOKIE EXPLORER","CURIOUS TRAVELLER","STAR SEEKER","GALAXY GUIDE","ORBIT LEGEND"];
function renderOrbitAchievements(){
 const totalXp=dailyState.xp+arcadeCleared*10;
 const level=Math.min(orbitLevelNames.length-1,Math.floor(totalXp/100));
 const within=totalXp>=500?100:totalXp%100;
 const totalXpNode=document.querySelector("#orbit-total-xp"),missionsNode=document.querySelector("#orbit-missions"),arcadeWinsNode=document.querySelector("#orbit-arcade-wins"),streakNode=document.querySelector("#orbit-best-streak"),levelName=document.querySelector("#orbit-level-name"),levelXp=document.querySelector("#orbit-level-xp"),rank=document.querySelector("#orbit-rank"),progress=document.querySelector("#orbit-progress-fill"),next=document.querySelector("#orbit-next-level"),shelf=document.querySelector("#orbit-badge-shelf"),badgeCount=document.querySelector("#orbit-badge-count");
 if(!shelf)return;
 if(totalXpNode)totalXpNode.textContent=String(totalXp);
 if(missionsNode)missionsNode.textContent=String(Math.floor(dailyState.xp/50));
 if(arcadeWinsNode)arcadeWinsNode.textContent=String(arcadeCleared);
 if(streakNode)streakNode.textContent=String(dailyState.bestStreak);
 if(levelName)levelName.textContent="LEVEL "+String(level+1).padStart(2,"0")+" / "+orbitLevelNames[level];
 if(levelXp)levelXp.textContent=totalXp+" XP";
 if(rank)rank.textContent=["ROOKIE","TRAVELLER","SEEKER","GUIDE","LEGEND"][level];
 if(progress)progress.style.width=within+"%";
 if(next)next.textContent=totalXp>=500?"MAXIMUM PROFILE LEVEL REACHED":(100-within)+" XP TO NEXT LEVEL";
 const unlocked=orbitBadgeDefinitions.filter(item=>item.unlock());
 if(badgeCount)badgeCount.textContent=unlocked.length+" / "+orbitBadgeDefinitions.length+" UNLOCKED";
 shelf.replaceChildren();
 orbitBadgeDefinitions.forEach(item=>{
  const earned=item.unlock(),card=document.createElement("div"),icon=document.createElement("span"),name=document.createElement("b"),detail=document.createElement("small");
  card.className="orbit-badge"+(earned?" unlocked":" locked");icon.textContent=earned?item.icon:"◇";name.textContent=item.name;detail.textContent=earned?"BADGE UNLOCKED":item.detail;card.append(icon,name,detail);shelf.append(card);
 });
}
renderOrbitAchievements();
