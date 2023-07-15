var z=Object.defineProperty;var K=(i,u,l)=>u in i?z(i,u,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[u]=l;var v=(i,u,l)=>(K(i,typeof u!="symbol"?u+"":u,l),l);(async()=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();let i;const u=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&u.decode();let l=null;function E(){return(l===null||l.byteLength===0)&&(l=new Uint8Array(i.memory.buffer)),l}function A(e,t){return e=e>>>0,u.decode(E().subarray(e,e+t))}function g(e){return e==null}let m=null;function F(){return(m===null||m.byteLength===0)&&(m=new Int32Array(i.memory.buffer)),m}function S(e){return()=>{throw new Error(`${e} is not defined`)}}const I=Object.freeze({Dead:0,0:"Dead",Alive:1,1:"Alive"});class p{static __wrap(t){t=t>>>0;const r=Object.create(p.prototype);return r.__wbg_ptr=t,r}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();i.__wbg_universe_free(t)}tick(){i.universe_tick(this.__wbg_ptr)}static new(t,r){const n=i.universe_new(!g(t),g(t)?0:t,!g(r),g(r)?0:r);return p.__wrap(n)}render(){let t,r;try{const a=i.__wbindgen_add_to_stack_pointer(-16);i.universe_render(a,this.__wbg_ptr);var n=F()[a/4+0],o=F()[a/4+1];return t=n,r=o,A(n,o)}finally{i.__wbindgen_add_to_stack_pointer(16),i.__wbindgen_free(t,r,1)}}width(){return i.universe_width(this.__wbg_ptr)>>>0}height(){return i.universe_height(this.__wbg_ptr)>>>0}cells(){return i.universe_cells(this.__wbg_ptr)}set_width(t){i.universe_set_width(this.__wbg_ptr,t)}set_height(t){i.universe_set_height(this.__wbg_ptr,t)}toggle_cell(t,r){i.universe_toggle_cell(this.__wbg_ptr,t,r)}}async function O(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(n){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",n);else throw n}const r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{const r=await WebAssembly.instantiate(e,t);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}}function W(){const e={};return e.wbg={},e.wbg.__wbg_random_5f61cd0d6777a993=typeof Math.random=="function"?Math.random:S("Math.random"),e.wbg.__wbindgen_throw=function(t,r){throw new Error(A(t,r))},e}function B(e,t){return i=e.exports,k.__wbindgen_wasm_module=t,m=null,l=null,i}async function k(e){if(i!==void 0)return i;typeof e>"u"&&(e=new URL("/wasm-game-of-life/assets/wasm_game_of_life_bg-b7270621.wasm",self.location));const t=W();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:r,module:n}=await O(await e,t);return B(r,n)}const{memory:C}=await k(),s=5,D="#cccccc",U="#FFFFFF",$="#54e674",w=p.new(128,64),c=document.getElementById("game-of-life-canvas"),d=w.width(),h=w.height();c.height=(s+1)*h+1,c.width=(s+1)*d+1;const f=c.getContext("2d");function T(){f.beginPath(),f.strokeStyle=D;for(let e=0;e<=d;e++)f.moveTo(e*(s+1)+1,0),f.lineTo(e*(s+1)+1,(s+1)*h+1);for(let e=0;e<=h;e++)f.moveTo(0,e*(s+1)+1),f.lineTo((s+1)*d+1,e*(s+1)+1);f.stroke()}function q(e,t){return e*d+t}function x(){const e=w.cells(),t=new Uint8Array(C.buffer,e,d*h);for(let r=0;r<h;r++)for(let n=0;n<d;n++){const o=q(r,n);f.fillStyle=t[o]===I.Alive?$:U,f.fillRect(n*(s+1)+1,r*(s+1)+1,s,s)}}const P=new class{constructor(){v(this,"fps",document.getElementById("fps"));v(this,"frames",[]);v(this,"lastFrameTimeStamp",performance.now())}render(){const e=performance.now(),t=e-this.lastFrameTimeStamp;this.lastFrameTimeStamp=e;const r=1/t*1e3;this.frames.push(r),this.frames.length>100&&this.frames.shift();let n=1/0,o=-1/0,a=0;for(let _=0;_<this.frames.length;_++)a+=this.frames[_],n=Math.min(this.frames[_],n),o=Math.max(this.frames[_],o);let b=a/this.frames.length;this.fps.textContent=`
Frames per Second:
         latest = ${Math.round(r)}
avg of last 100 = ${Math.round(b)}
min of last 100 = ${Math.round(n)}
max of last 100 = ${Math.round(o)}
`.trim()}};let y=null;const M=document.getElementById("play-pause");function L(){f.clearRect(0,0,c.width,c.height),P.render(),w.tick(),T(),x(),y=requestAnimationFrame(L)}const N=()=>y===null,j=()=>{M.textContent="pause",L()},R=()=>{M.textContent="play",cancelAnimationFrame(y),y=null};M.addEventListener("click",()=>{N()?j():R()}),R(),c.addEventListener("click",e=>{const t=c.getBoundingClientRect(),r=c.width/t.width,n=c.height/t.height,o=(e.clientX-t.left)*r,a=(e.clientY-t.top)*n,b=Math.min(Math.floor(a/(s+1)),h-1),_=Math.min(Math.floor(o/(s+1)),d-1);console.log(b,_),w.toggle_cell(b,_),f.clearRect(0,0,c.width,c.height),T(),x()})})();
