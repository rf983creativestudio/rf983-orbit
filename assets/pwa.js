(()=>{"use strict";
const status=document.getElementById("orbit-connection-status");
function updateConnection(){
  if(!status)return;
  const offline=!navigator.onLine;
  status.hidden=!offline;
  status.textContent=offline?"YOU ARE OFFLINE · Previously visited ORBIT pages and saved tools may still be available on this device.":"";
}
window.addEventListener("online",updateConnection);
window.addEventListener("offline",updateConnection);
updateConnection();
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  });
}
})();
