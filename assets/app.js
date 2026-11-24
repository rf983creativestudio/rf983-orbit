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


/* Interactive RF983 galaxy: select a world and navigate the atlas */
const galaxyWorlds = {
 terra:{label:"DESTINATION 01 / TERRA",name:"Terra — the living world",description:"A vivid world of forests, oceans, wildlife and extraordinary ecosystems. Begin your journey by discovering the wonders of the planet we call home.",href:"#discover",link:"ENTER WORLD"},
 chronos:{label:"DESTINATION 02 / CHRONOS",name:"Chronos — the world of time",description:"Travel through ancient civilisations, lost cities, remarkable people, inventions and turning points that shaped human history.",href:"#learn",link:"ENTER WORLD"},
 nova:{label:"DESTINATION 03 / NOVA",name:"Nova — the science frontier",description:"Explore the universe of science: curious experiments, physics, space discoveries, engineering and ideas that change how we understand reality.",href:"#technology",link:"ENTER WORLD"},
 odyssey:{label:"DESTINATION 04 / ODYSSEY",name:"Odyssey — worlds and cultures",description:"Set out across continents. Discover extraordinary places, languages, architecture, traditions, food and the stories of people around the world.",href:"#explore",link:"ENTER WORLD"},
 lumina:{label:"DESTINATION 05 / LUMINA",name:"Lumina — the creative dimension",description:"A world for imagination: art, design, photography, storytelling, music, digital making and unexpected creative experiments.",href:"#play",link:"ENTER WORLD"},
 nexus:{label:"DESTINATION 06 / NEXUS",name:"Nexus — the future systems",description:"Look ahead at artificial intelligence, robotics, cybersecurity, digital culture, emerging technology and the choices shaping tomorrow.",href:"#technology",link:"ENTER WORLD"},
 arcade:{label:"DESTINATION 07 / ARCADE",name:"Arcade — the play dimension",description:"Take a break from exploring and challenge yourself with quick games, puzzles, quizzes, brain teasers and playful missions.",href:"#play",link:"ENTER WORLD"}
};
const galaxyButtons = [...document.querySelectorAll(".galaxy-world")];
galaxyButtons.forEach(button=>button.addEventListener("click",()=>{
 const item=galaxyWorlds[button.dataset.world];if(!item)return;
 galaxyButtons.forEach(node=>{const active=node===button;node.classList.toggle("active",active);node.setAttribute("aria-pressed",String(active));});
 document.querySelector("#galaxy-label").textContent=item.label;
 document.querySelector("#galaxy-name").textContent=item.name;
 document.querySelector("#galaxy-description").textContent=item.description;
 const link=document.querySelector("#galaxy-link");link.href=item.href;link.textContent=item.link+" ↗";
}));
const galaxyUniverse=document.querySelector("#galaxy-universe");
let galaxyZoom=1;
const setGalaxyZoom=()=>{if(galaxyUniverse)galaxyUniverse.style.setProperty("--galaxy-zoom",galaxyZoom);};
document.querySelector("#galaxy-zoom-in")?.addEventListener("click",()=>{galaxyZoom=Math.min(1.35,+(galaxyZoom+.1).toFixed(2));setGalaxyZoom();});
document.querySelector("#galaxy-zoom-out")?.addEventListener("click",()=>{galaxyZoom=Math.max(.8,+(galaxyZoom-.1).toFixed(2));setGalaxyZoom();});
document.querySelector("#galaxy-reset")?.addEventListener("click",()=>{galaxyZoom=1;setGalaxyZoom();});
