(function(i,d){typeof exports=="object"&&typeof module!="undefined"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(i=typeof globalThis!="undefined"?globalThis:i||self,d(i.DyteClient={}))})(this,function(i){"use strict";let d,y=[];const T={};function b(){return d}function D(e){d=e}function w(){return y}function m(e){y=e}function C(e){return T[e]}function O(e,t){T[e]=t}let u;const S=async({payload:e,type:t})=>{if(t==="audioTranscriptionMessage"){let s=[];w().forEach(o=>{(o.peerId!==e.peerId||o.peerId===e.peerId&&!o.isPartialTranscript)&&s.push(o)}),s.push(e),s=s.slice(-1*u.noOfTranscriptionsToCache),m(s),u==null||u.transcriptionsCallback(s)}};async function E(e){u=e,e.meeting.participants.on("broadcastedMessage",S)}async function P({meeting:e}){try{e.participants.removeListener("broadcastedMessage",S)}catch(t){console.error("Failed to close Symbl websocket. Error: ",t)}}async function h(e){const t=e.createScriptProcessor(1024,1,1);return t.onaudioprocess=s=>{const o=s.inputBuffer;let r=function(a,g){let p=new Int16Array(a.length/3-g);for(let l=0;l<a.length;l+=3){let c=Math.max(-1,Math.min(1,a[l]));p[l/3]=c<0?c*32768:c*32767}return p},f=o.getChannelData(0);const n=b();if((n==null?void 0:n.readyState)===WebSocket.OPEN){let a=r(f,0);n.send(a.buffer)}},t}async function L({meeting:e,symblAccessToken:t,languageCode:s}){I({meeting:e}),e.meta.roomName;const o="ws://216.48.191.199:8000/ws/listen",r=new WebSocket(o);return D(r),r.onmessage=async f=>{var a,g,p,l;const n=JSON.parse(f.data);console.log("data is",n),n.type==="message_response"&&((a=n.messages)==null||a.forEach(c=>{var v,k,M;C((v=c.from)==null?void 0:v.id)===e.self.id&&e.participants.broadcastMessage("audioTranscriptionMessage",{text:c.payload.content,isPartialTranscript:!1,startTimeISO:((k=c.duration)==null?void 0:k.startTime)||new Date().toISOString(),endTimeISO:((M=c.duration)==null?void 0:M.endTime)||new Date().toISOString(),peerId:e.self.id,displayName:e.self.name})})),n.type==="message"&&Object.prototype.hasOwnProperty.call(n.message,"punctuated")&&((g=n.message.user)==null?void 0:g.peerId)===e.self.id&&(O(n.message.user.id,e.self.id),e.participants.broadcastMessage("audioTranscriptionMessage",{text:n.message.punctuated.transcript,isPartialTranscript:!0,startTimeISO:((p=n.message.duration)==null?void 0:p.startTime)||new Date().toISOString(),endTimeISO:((l=n.message.duration)==null?void 0:l.endTime)||new Date().toISOString(),peerId:e.self.id,displayName:e.self.name}))},r.onerror=f=>{console.error("Symbl websocket error: ",f)},r.onclose=()=>{console.info("Connection to Symbl websocket closed")},r.onopen=()=>{r.send(JSON.stringify({event:"config",language:"en-US",timestamp:!0,confidence:!0,api_key:"a1b2c33d4e5f6g7h8i9jakblc",interim_output:!1,profanity:!0,encoding:"LINEAR_PCM"}))},e.self.addAudioMiddleware(h)}async function I({meeting:e}){var t;try{m([]),e.self.removeAudioMiddleware(h),(t=b())==null||t.close()}catch(s){console.error("Failed to close Symbl websocket. Error: ",s)}}async function N(e){var t;if(!((t=e==null?void 0:e.meeting)!=null&&t.self))throw new Error("arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?");if(!(e!=null&&e.symblAccessToken))throw new Error("Missing arguments[0].symblAccessToken. We need symbl access token to retrive conversations and to generate transcriptions");return L(e)}async function _(e){var t;if(!((t=e.meeting)!=null&&t.self))throw new Error("arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?");return I(e)}async function A(e){var t;if(!((t=e==null?void 0:e.meeting)!=null&&t.self))throw new Error("arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?");if(!(e!=null&&e.transcriptionsCallback))throw new Error("arguments[0].transcriptionsCallback is not missing. Please provide transcriptionsCallback.");return E(e)}async function W(e){var t;if(!((t=e.meeting)!=null&&t.self))throw new Error("arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?");return P(e)}function j(){return w()}i.activateTranscriptions=N,i.addTranscriptionsListerner=A,i.deactivateTranscriptions=_,i.getTranscriptions=j,i.removeTranscriptionsListener=W,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
