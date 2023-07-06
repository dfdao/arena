import{as as Wn,at as Hn,au as zn,av as Qn,aw as Jn,ax as Vn,ay as Gn,az as Yn,aA as Kn,aB as Zn,aC as Xn,aD as er,aE as tr,aF as nr,aG as rr,aH as or,g as nt,e as rt}from"./index.846ecf1a.js";import{b as ir,s as sr,m as ar,c as Q,I as cr,f as Fe,J as je,H as lr}from"./http.ee75e605.js";import{b as ur}from"./browser.2207ffa8.js";import{b as A,l as C,y as k,k as H,S as O,D as Y,E as dr,F as hr,a as X,c as pe,d as ge,V as ot,s as it,_ as st,A as at,e as ct,T as lt,q as ut,x as dt,G as ht,f as ft,P as fr}from"./hooks.module.565abe16.js";const se="Session currently connected",q="Session currently disconnected",_r="Session Rejected",pr="Missing JSON RPC response",gr='JSON-RPC success response must include "result" field',mr='JSON-RPC error response must include "error" field',wr='JSON RPC request must have valid "method" value',yr='JSON RPC request must have valid "id" value',vr="Missing one of the required parameters: bridge / uri / session",$e="JSON RPC response format is invalid",br="URI format is invalid",Er="QRCode Modal not provided",Be="User close QRCode Modal",Cr=["session_request","session_update","exchange_key","connect","disconnect","display_uri","modal_closed","transport_open","transport_close","transport_error"],Sr=["wallet_addEthereumChain","wallet_switchEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode"],me=["eth_sendTransaction","eth_signTransaction","eth_sign","eth_signTypedData","eth_signTypedData_v1","eth_signTypedData_v2","eth_signTypedData_v3","eth_signTypedData_v4","personal_sign",...Sr],le="WALLETCONNECT_DEEPLINK_CHOICE",xr={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",42:"kovan"};var _t=we;we.strict=pt;we.loose=gt;var kr=Object.prototype.toString,Ir={"[object Int8Array]":!0,"[object Int16Array]":!0,"[object Int32Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Uint16Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0};function we(t){return pt(t)||gt(t)}function pt(t){return t instanceof Int8Array||t instanceof Int16Array||t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Uint16Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array}function gt(t){return Ir[kr.call(t)]}var Rr=_t.strict,Tr=function(e){if(Rr(e)){var n=Buffer.from(e.buffer);return e.byteLength!==e.buffer.byteLength&&(n=n.slice(e.byteOffset,e.byteOffset+e.byteLength)),n}else return Buffer.from(e)};const ye="hex",ve="utf8",Or="binary",Nr="buffer",Mr="array",Lr="typed-array",qr="array-buffer",ee="0";function F(t){return new Uint8Array(t)}function be(t,e=!1){const n=t.toString(ye);return e?J(n):n}function Ee(t){return t.toString(ve)}function mt(t){return t.readUIntBE(0,t.length)}function $(t){return Tr(t)}function N(t,e=!1){return be($(t),e)}function wt(t){return Ee($(t))}function yt(t){return mt($(t))}function Ce(t){return Buffer.from(j(t),ye)}function M(t){return F(Ce(t))}function Ar(t){return Ee(Ce(t))}function Ur(t){return yt(M(t))}function Se(t){return Buffer.from(t,ve)}function vt(t){return F(Se(t))}function Dr(t,e=!1){return be(Se(t),e)}function Pr(t){const e=parseInt(t,10);return no(to(e),"Number can only safely store up to 53 bits"),e}function Fr(t){return Wr(xe(t))}function jr(t){return ke(xe(t))}function $r(t,e){return Hr(xe(t),e)}function Br(t){return`${t}`}function xe(t){const e=(t>>>0).toString(2);return Re(e)}function Wr(t){return $(ke(t))}function ke(t){return new Uint8Array(Yr(t).map(e=>parseInt(e,2)))}function Hr(t,e){return N(ke(t),e)}function zr(t){return!(typeof t!="string"||!new RegExp(/^[01]+$/).test(t)||t.length%8!==0)}function bt(t,e){return!(typeof t!="string"||!t.match(/^0x[0-9A-Fa-f]*$/)||e&&t.length!==2+2*e)}function te(t){return Buffer.isBuffer(t)}function Ie(t){return _t.strict(t)&&!te(t)}function Et(t){return!Ie(t)&&!te(t)&&typeof t.byteLength<"u"}function Qr(t){return te(t)?Nr:Ie(t)?Lr:Et(t)?qr:Array.isArray(t)?Mr:typeof t}function Jr(t){return zr(t)?Or:bt(t)?ye:ve}function Vr(...t){return Buffer.concat(t)}function Ct(...t){let e=[];return t.forEach(n=>e=e.concat(Array.from(n))),new Uint8Array([...e])}function Gr(t,e=8){const n=t%e;return n?(t-n)/e*e+e:t}function Yr(t,e=8){const n=Re(t).match(new RegExp(`.{${e}}`,"gi"));return Array.from(n||[])}function Re(t,e=8,n=ee){return Kr(t,Gr(t.length,e),n)}function Kr(t,e,n=ee){return ro(t,e,!0,n)}function j(t){return t.replace(/^0x/,"")}function J(t){return t.startsWith("0x")?t:`0x${t}`}function Zr(t){return t=j(t),t=Re(t,2),t&&(t=J(t)),t}function Xr(t){const e=t.startsWith("0x");return t=j(t),t=t.startsWith(ee)?t.substring(1):t,e?J(t):t}function eo(t){return typeof t>"u"}function to(t){return!eo(t)}function no(t,e){if(!t)throw new Error(e)}function ro(t,e,n,r=ee){const o=e-t.length;let i=t;if(o>0){const u=r.repeat(o);i=n?u+t:t+u}return i}function K(t){return $(new Uint8Array(t))}function oo(t){return wt(new Uint8Array(t))}function St(t,e){return N(new Uint8Array(t),!e)}function io(t){return yt(new Uint8Array(t))}function so(...t){return M(t.map(e=>N(new Uint8Array(e))).join("")).buffer}function xt(t){return F(t).buffer}function ao(t){return Ee(t)}function co(t,e){return be(t,!e)}function lo(t){return mt(t)}function uo(...t){return Vr(...t)}function ho(t){return vt(t).buffer}function fo(t){return Se(t)}function _o(t,e){return Dr(t,!e)}function po(t){return Pr(t)}function go(t){return Ce(t)}function kt(t){return M(t).buffer}function mo(t){return Ar(t)}function wo(t){return Ur(t)}function yo(t){return Fr(t)}function vo(t){return jr(t).buffer}function bo(t){return Br(t)}function It(t,e){return $r(Number(t),!e)}const Eo=Qn,Co=Jn,So=Vn,xo=Gn,ko=Yn,Rt=zn,Io=Kn,Tt=Wn,Ro=Zn,To=Xn,Oo=er,ne=Hn;function re(t){return tr(t)}function oe(){const t=re();return t&&t.os?t.os:void 0}function Ot(){const t=oe();return t?t.toLowerCase().includes("android"):!1}function Nt(){const t=oe();return t?t.toLowerCase().includes("ios")||t.toLowerCase().includes("mac")&&navigator.maxTouchPoints>1:!1}function Mt(){return oe()?Ot()||Nt():!1}function Lt(){const t=re();return t&&t.name?t.name.toLowerCase()==="node":!1}function qt(){return!Lt()&&!!Rt()}const At=ir,Ut=sr;function Te(t,e){const n=Ut(e),r=ne();r&&r.setItem(t,n)}function Oe(t){let e=null,n=null;const r=ne();return r&&(n=r.getItem(t)),e=n&&At(n),e}function Ne(t){const e=ne();e&&e.removeItem(t)}function ue(){return nr()}function No(t){return Zr(t)}function Mo(t){return J(t)}function Lo(t){return j(t)}function qo(t){return Xr(J(t))}const Dt=ar;function G(){return((e,n)=>{for(n=e="";e++<36;n+=e*51&52?(e^15?8^Math.random()*(e^20?16:4):4).toString(16):"-");return n})()}function Ao(){console.warn("DEPRECATION WARNING: This WalletConnect client library will be deprecated in favor of @walletconnect/client. Please check docs.walletconnect.org to learn more about this migration!")}function Pt(t,e){let n;const r=xr[t];return r&&(n=`https://${r}.infura.io/v3/${e}`),n}function Ft(t,e){let n;const r=Pt(t,e.infuraId);return e.custom&&e.custom[t]?n=e.custom[t]:r&&(n=r),n}function Uo(t,e){const n=encodeURIComponent(t);return e.universalLink?`${e.universalLink}/wc?uri=${n}`:e.deepLink?`${e.deepLink}${e.deepLink.endsWith(":")?"//":"/"}wc?uri=${n}`:""}function Do(t){const e=t.href.split("?")[0];Te(le,Object.assign(Object.assign({},t),{href:e}))}function jt(t,e){return t.filter(n=>n.name.toLowerCase().includes(e.toLowerCase()))[0]}function Po(t,e){let n=t;return e&&(n=e.map(r=>jt(t,r)).filter(Boolean)),n}function Fo(t,e){return async(...r)=>new Promise((o,i)=>{const u=(h,p)=>{(h===null||typeof h>"u")&&i(h),o(p)};t.apply(e,[...r,u])})}function $t(t){const e=t.message||"Failed or Rejected Request";let n=-32e3;if(t&&!t.code)switch(e){case"Parse error":n=-32700;break;case"Invalid request":n=-32600;break;case"Method not found":n=-32601;break;case"Invalid params":n=-32602;break;case"Internal error":n=-32603;break;default:n=-32e3;break}const r={code:n,message:e};return t.data&&(r.data=t.data),r}const Bt="https://registry.walletconnect.com";function jo(){return Bt+"/api/v2/wallets"}function $o(){return Bt+"/api/v2/dapps"}function Wt(t,e="mobile"){var n;return{name:t.name||"",shortName:t.metadata.shortName||"",color:t.metadata.colors.primary||"",logo:(n=t.image_url.sm)!==null&&n!==void 0?n:"",universalLink:t[e].universal||"",deepLink:t[e].native||""}}function Bo(t,e="mobile"){return Object.values(t).filter(n=>!!n[e].universal||!!n[e].native).map(n=>Wt(n,e))}var Me={},Ht="%[a-f0-9]{2}",We=new RegExp(Ht,"gi"),He=new RegExp("("+Ht+")+","gi");function de(t,e){try{return decodeURIComponent(t.join(""))}catch{}if(t.length===1)return t;e=e||1;var n=t.slice(0,e),r=t.slice(e);return Array.prototype.concat.call([],de(n),de(r))}function Wo(t){try{return decodeURIComponent(t)}catch{for(var e=t.match(We),n=1;n<e.length;n++)t=de(e,n).join(""),e=t.match(We);return t}}function Ho(t){for(var e={"%FE%FF":"\uFFFD\uFFFD","%FF%FE":"\uFFFD\uFFFD"},n=He.exec(t);n;){try{e[n[0]]=decodeURIComponent(n[0])}catch{var r=Wo(n[0]);r!==n[0]&&(e[n[0]]=r)}n=He.exec(t)}e["%C2"]="\uFFFD";for(var o=Object.keys(e),i=0;i<o.length;i++){var u=o[i];t=t.replace(new RegExp(u,"g"),e[u])}return t}var zo=function(t){if(typeof t!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch{return Ho(t)}},Qo=function(t,e){for(var n={},r=Object.keys(t),o=Array.isArray(e),i=0;i<r.length;i++){var u=r[i],h=t[u];(o?e.indexOf(u)!==-1:e(u,h,t))&&(n[u]=h)}return n};(function(t){const e=or,n=zo,r=rr,o=Qo,i=s=>s==null;function u(s){switch(s.arrayFormat){case"index":return a=>(d,c)=>{const f=d.length;return c===void 0||s.skipNull&&c===null||s.skipEmptyString&&c===""?d:c===null?[...d,[g(a,s),"[",f,"]"].join("")]:[...d,[g(a,s),"[",g(f,s),"]=",g(c,s)].join("")]};case"bracket":return a=>(d,c)=>c===void 0||s.skipNull&&c===null||s.skipEmptyString&&c===""?d:c===null?[...d,[g(a,s),"[]"].join("")]:[...d,[g(a,s),"[]=",g(c,s)].join("")];case"comma":case"separator":return a=>(d,c)=>c==null||c.length===0?d:d.length===0?[[g(a,s),"=",g(c,s)].join("")]:[[d,g(c,s)].join(s.arrayFormatSeparator)];default:return a=>(d,c)=>c===void 0||s.skipNull&&c===null||s.skipEmptyString&&c===""?d:c===null?[...d,g(a,s)]:[...d,[g(a,s),"=",g(c,s)].join("")]}}function h(s){let a;switch(s.arrayFormat){case"index":return(d,c,f)=>{if(a=/\[(\d*)\]$/.exec(d),d=d.replace(/\[\d*\]$/,""),!a){f[d]=c;return}f[d]===void 0&&(f[d]={}),f[d][a[1]]=c};case"bracket":return(d,c,f)=>{if(a=/(\[\])$/.exec(d),d=d.replace(/\[\]$/,""),!a){f[d]=c;return}if(f[d]===void 0){f[d]=[c];return}f[d]=[].concat(f[d],c)};case"comma":case"separator":return(d,c,f)=>{const m=typeof c=="string"&&c.includes(s.arrayFormatSeparator),_=typeof c=="string"&&!m&&w(c,s).includes(s.arrayFormatSeparator);c=_?w(c,s):c;const b=m||_?c.split(s.arrayFormatSeparator).map(T=>w(T,s)):c===null?c:w(c,s);f[d]=b};default:return(d,c,f)=>{if(f[d]===void 0){f[d]=c;return}f[d]=[].concat(f[d],c)}}}function p(s){if(typeof s!="string"||s.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function g(s,a){return a.encode?a.strict?e(s):encodeURIComponent(s):s}function w(s,a){return a.decode?n(s):s}function y(s){return Array.isArray(s)?s.sort():typeof s=="object"?y(Object.keys(s)).sort((a,d)=>Number(a)-Number(d)).map(a=>s[a]):s}function v(s){const a=s.indexOf("#");return a!==-1&&(s=s.slice(0,a)),s}function S(s){let a="";const d=s.indexOf("#");return d!==-1&&(a=s.slice(d)),a}function x(s){s=v(s);const a=s.indexOf("?");return a===-1?"":s.slice(a+1)}function I(s,a){return a.parseNumbers&&!Number.isNaN(Number(s))&&typeof s=="string"&&s.trim()!==""?s=Number(s):a.parseBooleans&&s!==null&&(s.toLowerCase()==="true"||s.toLowerCase()==="false")&&(s=s.toLowerCase()==="true"),s}function R(s,a){a=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},a),p(a.arrayFormatSeparator);const d=h(a),c=Object.create(null);if(typeof s!="string"||(s=s.trim().replace(/^[?#&]/,""),!s))return c;for(const f of s.split("&")){if(f==="")continue;let[m,_]=r(a.decode?f.replace(/\+/g," "):f,"=");_=_===void 0?null:["comma","separator"].includes(a.arrayFormat)?_:w(_,a),d(w(m,a),_,c)}for(const f of Object.keys(c)){const m=c[f];if(typeof m=="object"&&m!==null)for(const _ of Object.keys(m))m[_]=I(m[_],a);else c[f]=I(m,a)}return a.sort===!1?c:(a.sort===!0?Object.keys(c).sort():Object.keys(c).sort(a.sort)).reduce((f,m)=>{const _=c[m];return Boolean(_)&&typeof _=="object"&&!Array.isArray(_)?f[m]=y(_):f[m]=_,f},Object.create(null))}t.extract=x,t.parse=R,t.stringify=(s,a)=>{if(!s)return"";a=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},a),p(a.arrayFormatSeparator);const d=_=>a.skipNull&&i(s[_])||a.skipEmptyString&&s[_]==="",c=u(a),f={};for(const _ of Object.keys(s))d(_)||(f[_]=s[_]);const m=Object.keys(f);return a.sort!==!1&&m.sort(a.sort),m.map(_=>{const b=s[_];return b===void 0?"":b===null?g(_,a):Array.isArray(b)?b.reduce(c(_),[]).join("&"):g(_,a)+"="+g(b,a)}).filter(_=>_.length>0).join("&")},t.parseUrl=(s,a)=>{a=Object.assign({decode:!0},a);const[d,c]=r(s,"#");return Object.assign({url:d.split("?")[0]||"",query:R(x(s),a)},a&&a.parseFragmentIdentifier&&c?{fragmentIdentifier:w(c,a)}:{})},t.stringifyUrl=(s,a)=>{a=Object.assign({encode:!0,strict:!0},a);const d=v(s.url).split("?")[0]||"",c=t.extract(s.url),f=t.parse(c,{sort:!1}),m=Object.assign(f,s.query);let _=t.stringify(m,a);_&&(_=`?${_}`);let b=S(s.url);return s.fragmentIdentifier&&(b=`#${g(s.fragmentIdentifier,a)}`),`${d}${_}${b}`},t.pick=(s,a,d)=>{d=Object.assign({parseFragmentIdentifier:!0},d);const{url:c,query:f,fragmentIdentifier:m}=t.parseUrl(s,d);return t.stringifyUrl({url:c,query:o(f,a),fragmentIdentifier:m},d)},t.exclude=(s,a,d)=>{const c=Array.isArray(a)?f=>!a.includes(f):(f,m)=>!a(f,m);return t.pick(s,c,d)}})(Me);function zt(t){const e=t.indexOf("?")!==-1?t.indexOf("?"):void 0;return typeof e<"u"?t.substr(e):""}function Qt(t,e){let n=Le(t);return n=Object.assign(Object.assign({},n),e),t=Jt(n),t}function Le(t){return Me.parse(t)}function Jt(t){return Me.stringify(t)}function Vt(t){return typeof t.bridge<"u"}function Gt(t){const e=t.indexOf(":"),n=t.indexOf("?")!==-1?t.indexOf("?"):void 0,r=t.substring(0,e),o=t.substring(e+1,n);function i(y){const v="@",S=y.split(v);return{handshakeTopic:S[0],version:parseInt(S[1],10)}}const u=i(o),h=typeof n<"u"?t.substr(n):"";function p(y){const v=Le(y);return{key:v.key||"",bridge:v.bridge||""}}const g=p(h);return Object.assign(Object.assign({protocol:r},u),g)}function Jo(t){return t===""||typeof t=="string"&&t.trim()===""}function Vo(t){return!(t&&t.length)}function Go(t){return te(t)}function Yo(t){return Ie(t)}function Ko(t){return Et(t)}function Zo(t){return Qr(t)}function Xo(t){return Jr(t)}function ei(t,e){return bt(t,e)}function ti(t){return typeof t.params=="object"}function Yt(t){return typeof t.method<"u"}function D(t){return typeof t.result<"u"}function z(t){return typeof t.error<"u"}function he(t){return typeof t.event<"u"}function Kt(t){return Cr.includes(t)||t.startsWith("wc_")}function Zt(t){return t.method.startsWith("wc_")?!0:!me.includes(t.method)}const ni=Object.freeze(Object.defineProperty({__proto__:null,convertArrayBufferToBuffer:K,convertArrayBufferToUtf8:oo,convertArrayBufferToHex:St,convertArrayBufferToNumber:io,concatArrayBuffers:so,convertBufferToArrayBuffer:xt,convertBufferToUtf8:ao,convertBufferToHex:co,convertBufferToNumber:lo,concatBuffers:uo,convertUtf8ToArrayBuffer:ho,convertUtf8ToBuffer:fo,convertUtf8ToHex:_o,convertUtf8ToNumber:po,convertHexToBuffer:go,convertHexToArrayBuffer:kt,convertHexToUtf8:mo,convertHexToNumber:wo,convertNumberToBuffer:yo,convertNumberToArrayBuffer:vo,convertNumberToUtf8:bo,convertNumberToHex:It,detectEnv:re,detectOS:oe,isAndroid:Ot,isIOS:Nt,isMobile:Mt,isNode:Lt,isBrowser:qt,safeJsonParse:At,safeJsonStringify:Ut,setLocal:Te,getLocal:Oe,removeLocal:Ne,getClientMeta:ue,sanitizeHex:No,addHexPrefix:Mo,removeHexPrefix:Lo,removeHexLeadingZeros:qo,payloadId:Dt,uuid:G,logDeprecationWarning:Ao,getInfuraRpcUrl:Pt,getRpcUrl:Ft,formatIOSMobile:Uo,saveMobileLinkInfo:Do,getMobileRegistryEntry:jt,getMobileLinkRegistry:Po,promisify:Fo,formatRpcError:$t,getWalletRegistryUrl:jo,getDappRegistryUrl:$o,formatMobileRegistryEntry:Wt,formatMobileRegistry:Bo,isWalletConnectSession:Vt,parseWalletConnectUri:Gt,getQueryString:zt,appendToQueryString:Qt,parseQueryString:Le,formatQueryString:Jt,isEmptyString:Jo,isEmptyArray:Vo,isBuffer:Go,isTypedArray:Yo,isArrayBuffer:Ko,getType:Zo,getEncoding:Xo,isHexString:ei,isJsonRpcSubscription:ti,isJsonRpcRequest:Yt,isJsonRpcResponseSuccess:D,isJsonRpcResponseError:z,isInternalEvent:he,isReservedEvent:Kt,isSilentPayload:Zt,getFromWindow:Eo,getFromWindowOrThrow:Co,getDocumentOrThrow:So,getDocument:xo,getNavigatorOrThrow:ko,getNavigator:Rt,getLocationOrThrow:Io,getLocation:Tt,getCryptoOrThrow:Ro,getCrypto:To,getLocalStorageOrThrow:Oo,getLocalStorage:ne},Symbol.toStringTag,{value:"Module"}));class ri{constructor(){this._eventEmitters=[],typeof window<"u"&&typeof window.addEventListener<"u"&&(window.addEventListener("online",()=>this.trigger("online")),window.addEventListener("offline",()=>this.trigger("offline")))}on(e,n){this._eventEmitters.push({event:e,callback:n})}trigger(e){let n=[];e&&(n=this._eventEmitters.filter(r=>r.event===e)),n.forEach(r=>{r.callback()})}}const oi=typeof global.WebSocket<"u"?global.WebSocket:require("ws");class ii{constructor(e){if(this.opts=e,this._queue=[],this._events=[],this._subscriptions=[],this._protocol=e.protocol,this._version=e.version,this._url="",this._netMonitor=null,this._socket=null,this._nextSocket=null,this._subscriptions=e.subscriptions||[],this._netMonitor=e.netMonitor||new ri,!e.url||typeof e.url!="string")throw new Error("Missing or invalid WebSocket url");this._url=e.url,this._netMonitor.on("online",()=>this._socketCreate())}set readyState(e){}get readyState(){return this._socket?this._socket.readyState:-1}set connecting(e){}get connecting(){return this.readyState===0}set connected(e){}get connected(){return this.readyState===1}set closing(e){}get closing(){return this.readyState===2}set closed(e){}get closed(){return this.readyState===3}open(){this._socketCreate()}close(){this._socketClose()}send(e,n,r){if(!n||typeof n!="string")throw new Error("Missing or invalid topic field");this._socketSend({topic:n,type:"pub",payload:e,silent:!!r})}subscribe(e){this._socketSend({topic:e,type:"sub",payload:"",silent:!0})}on(e,n){this._events.push({event:e,callback:n})}_socketCreate(){if(this._nextSocket)return;const e=si(this._url,this._protocol,this._version);if(this._nextSocket=new oi(e),!this._nextSocket)throw new Error("Failed to create socket");this._nextSocket.onmessage=n=>this._socketReceive(n),this._nextSocket.onopen=()=>this._socketOpen(),this._nextSocket.onerror=n=>this._socketError(n),this._nextSocket.onclose=()=>{setTimeout(()=>{this._nextSocket=null,this._socketCreate()},1e3)}}_socketOpen(){this._socketClose(),this._socket=this._nextSocket,this._nextSocket=null,this._queueSubscriptions(),this._pushQueue()}_socketClose(){this._socket&&(this._socket.onclose=()=>{},this._socket.close())}_socketSend(e){const n=JSON.stringify(e);this._socket&&this._socket.readyState===1?this._socket.send(n):(this._setToQueue(e),this._socketCreate())}async _socketReceive(e){let n;try{n=JSON.parse(e.data)}catch{return}if(this._socketSend({topic:n.topic,type:"ack",payload:"",silent:!0}),this._socket&&this._socket.readyState===1){const r=this._events.filter(o=>o.event==="message");r&&r.length&&r.forEach(o=>o.callback(n))}}_socketError(e){const n=this._events.filter(r=>r.event==="error");n&&n.length&&n.forEach(r=>r.callback(e))}_queueSubscriptions(){this._subscriptions.forEach(n=>this._queue.push({topic:n,type:"sub",payload:"",silent:!0})),this._subscriptions=this.opts.subscriptions||[]}_setToQueue(e){this._queue.push(e)}_pushQueue(){this._queue.forEach(n=>this._socketSend(n)),this._queue=[]}}function si(t,e,n){var r,o;const u=(t.startsWith("https")?t.replace("https","wss"):t.startsWith("http")?t.replace("http","ws"):t).split("?"),h=qt()?{protocol:e,version:n,env:"browser",host:((r=Tt())===null||r===void 0?void 0:r.host)||""}:{protocol:e,version:n,env:((o=re())===null||o===void 0?void 0:o.name)||""},p=Qt(zt(u[1]||""),h);return u[0]+"?"+p}class ai{constructor(){this._eventEmitters=[]}subscribe(e){this._eventEmitters.push(e)}unsubscribe(e){this._eventEmitters=this._eventEmitters.filter(n=>n.event!==e)}trigger(e){let n=[],r;Yt(e)?r=e.method:D(e)||z(e)?r=`response:${e.id}`:he(e)?r=e.event:r="",r&&(n=this._eventEmitters.filter(o=>o.event===r)),(!n||!n.length)&&!Kt(r)&&!he(r)&&(n=this._eventEmitters.filter(o=>o.event==="call_request")),n.forEach(o=>{if(z(e)){const i=new Error(e.error.message);o.callback(i,null)}else o.callback(null,e)})}}class ci{constructor(e="walletconnect"){this.storageId=e}getSession(){let e=null;const n=Oe(this.storageId);return n&&Vt(n)&&(e=n),e}setSession(e){return Te(this.storageId,e),e}removeSession(){Ne(this.storageId)}}const li="walletconnect.org",ui="abcdefghijklmnopqrstuvwxyz0123456789",Xt=ui.split("").map(t=>`https://${t}.bridge.walletconnect.org`);function di(t){let e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return e=e.split(":")[0],e=e.split("?")[0],e}function hi(t){return di(t).split(".").slice(-2).join(".")}function fi(){return Math.floor(Math.random()*Xt.length)}function _i(){return Xt[fi()]}function pi(t){return hi(t)===li}function gi(t){return pi(t)?_i():t}class mi{constructor(e){if(this.protocol="wc",this.version=1,this._bridge="",this._key=null,this._clientId="",this._clientMeta=null,this._peerId="",this._peerMeta=null,this._handshakeId=0,this._handshakeTopic="",this._connected=!1,this._accounts=[],this._chainId=0,this._networkId=0,this._rpcUrl="",this._eventManager=new ai,this._clientMeta=ue()||e.connectorOpts.clientMeta||null,this._cryptoLib=e.cryptoLib,this._sessionStorage=e.sessionStorage||new ci(e.connectorOpts.storageId),this._qrcodeModal=e.connectorOpts.qrcodeModal,this._qrcodeModalOptions=e.connectorOpts.qrcodeModalOptions,this._signingMethods=[...me,...e.connectorOpts.signingMethods||[]],!e.connectorOpts.bridge&&!e.connectorOpts.uri&&!e.connectorOpts.session)throw new Error(vr);e.connectorOpts.bridge&&(this.bridge=gi(e.connectorOpts.bridge)),e.connectorOpts.uri&&(this.uri=e.connectorOpts.uri);const n=e.connectorOpts.session||this._getStorageSession();n&&(this.session=n),this.handshakeId&&this._subscribeToSessionResponse(this.handshakeId,"Session request rejected"),this._transport=e.transport||new ii({protocol:this.protocol,version:this.version,url:this.bridge,subscriptions:[this.clientId]}),this._subscribeToInternalEvents(),this._initTransport(),e.connectorOpts.uri&&this._subscribeToSessionRequest(),e.pushServerOpts&&this._registerPushServer(e.pushServerOpts)}set bridge(e){!e||(this._bridge=e)}get bridge(){return this._bridge}set key(e){if(!e)return;const n=kt(e);this._key=n}get key(){return this._key?St(this._key,!0):""}set clientId(e){!e||(this._clientId=e)}get clientId(){let e=this._clientId;return e||(e=this._clientId=G()),this._clientId}set peerId(e){!e||(this._peerId=e)}get peerId(){return this._peerId}set clientMeta(e){}get clientMeta(){let e=this._clientMeta;return e||(e=this._clientMeta=ue()),e}set peerMeta(e){this._peerMeta=e}get peerMeta(){return this._peerMeta}set handshakeTopic(e){!e||(this._handshakeTopic=e)}get handshakeTopic(){return this._handshakeTopic}set handshakeId(e){!e||(this._handshakeId=e)}get handshakeId(){return this._handshakeId}get uri(){return this._formatUri()}set uri(e){if(!e)return;const{handshakeTopic:n,bridge:r,key:o}=this._parseUri(e);this.handshakeTopic=n,this.bridge=r,this.key=o}set chainId(e){this._chainId=e}get chainId(){return this._chainId}set networkId(e){this._networkId=e}get networkId(){return this._networkId}set accounts(e){this._accounts=e}get accounts(){return this._accounts}set rpcUrl(e){this._rpcUrl=e}get rpcUrl(){return this._rpcUrl}set connected(e){}get connected(){return this._connected}set pending(e){}get pending(){return!!this._handshakeTopic}get session(){return{connected:this.connected,accounts:this.accounts,chainId:this.chainId,bridge:this.bridge,key:this.key,clientId:this.clientId,clientMeta:this.clientMeta,peerId:this.peerId,peerMeta:this.peerMeta,handshakeId:this.handshakeId,handshakeTopic:this.handshakeTopic}}set session(e){!e||(this._connected=e.connected,this.accounts=e.accounts,this.chainId=e.chainId,this.bridge=e.bridge,this.key=e.key,this.clientId=e.clientId,this.clientMeta=e.clientMeta,this.peerId=e.peerId,this.peerMeta=e.peerMeta,this.handshakeId=e.handshakeId,this.handshakeTopic=e.handshakeTopic)}on(e,n){const r={event:e,callback:n};this._eventManager.subscribe(r)}off(e){this._eventManager.unsubscribe(e)}async createInstantRequest(e){this._key=await this._generateKey();const n=this._formatRequest({method:"wc_instantRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,request:this._formatRequest(e)}]});this.handshakeId=n.id,this.handshakeTopic=G(),this._eventManager.trigger({event:"display_uri",params:[this.uri]}),this.on("modal_closed",()=>{throw new Error(Be)});const r=()=>{this.killSession()};try{const o=await this._sendCallRequest(n);return o&&r(),o}catch(o){throw r(),o}}async connect(e){if(!this._qrcodeModal)throw new Error(Er);return this.connected?{chainId:this.chainId,accounts:this.accounts}:(await this.createSession(e),new Promise(async(n,r)=>{this.on("modal_closed",()=>r(new Error(Be))),this.on("connect",(o,i)=>{if(o)return r(o);n(i.params[0])})}))}async createSession(e){if(this._connected)throw new Error(se);if(this.pending)return;this._key=await this._generateKey();const n=this._formatRequest({method:"wc_sessionRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,chainId:e&&e.chainId?e.chainId:null}]});this.handshakeId=n.id,this.handshakeTopic=G(),this._sendSessionRequest(n,"Session update rejected",{topic:this.handshakeTopic}),this._eventManager.trigger({event:"display_uri",params:[this.uri]})}approveSession(e){if(this._connected)throw new Error(se);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl,peerId:this.clientId,peerMeta:this.clientMeta},r={id:this.handshakeId,jsonrpc:"2.0",result:n};this._sendResponse(r),this._connected=!0,this._setStorageSession(),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})}rejectSession(e){if(this._connected)throw new Error(se);const n=e&&e.message?e.message:_r,r=this._formatResponse({id:this.handshakeId,error:{message:n}});this._sendResponse(r),this._connected=!1,this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession()}updateSession(e){if(!this._connected)throw new Error(q);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl},r=this._formatRequest({method:"wc_sessionUpdate",params:[n]});this._sendSessionRequest(r,"Session update rejected"),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]}),this._manageStorageSession()}async killSession(e){const n=e?e.message:"Session Disconnected",r={approved:!1,chainId:null,networkId:null,accounts:null},o=this._formatRequest({method:"wc_sessionUpdate",params:[r]});await this._sendRequest(o),this._handleSessionDisconnect(n)}async sendTransaction(e){if(!this._connected)throw new Error(q);const n=e,r=this._formatRequest({method:"eth_sendTransaction",params:[n]});return await this._sendCallRequest(r)}async signTransaction(e){if(!this._connected)throw new Error(q);const n=e,r=this._formatRequest({method:"eth_signTransaction",params:[n]});return await this._sendCallRequest(r)}async signMessage(e){if(!this._connected)throw new Error(q);const n=this._formatRequest({method:"eth_sign",params:e});return await this._sendCallRequest(n)}async signPersonalMessage(e){if(!this._connected)throw new Error(q);const n=this._formatRequest({method:"personal_sign",params:e});return await this._sendCallRequest(n)}async signTypedData(e){if(!this._connected)throw new Error(q);const n=this._formatRequest({method:"eth_signTypedData",params:e});return await this._sendCallRequest(n)}async updateChain(e){if(!this._connected)throw new Error("Session currently disconnected");const n=this._formatRequest({method:"wallet_updateChain",params:[e]});return await this._sendCallRequest(n)}unsafeSend(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),new Promise((r,o)=>{this._subscribeToResponse(e.id,(i,u)=>{if(i){o(i);return}if(!u)throw new Error(pr);r(u)})})}async sendCustomRequest(e,n){if(!this._connected)throw new Error(q);switch(e.method){case"eth_accounts":return this.accounts;case"eth_chainId":return It(this.chainId);case"eth_sendTransaction":case"eth_signTransaction":e.params;break;case"personal_sign":e.params;break}const r=this._formatRequest(e);return await this._sendCallRequest(r,n)}approveRequest(e){if(D(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(gr)}rejectRequest(e){if(z(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(mr)}transportClose(){this._transport.close()}async _sendRequest(e,n){const r=this._formatRequest(e),o=await this._encrypt(r),i=typeof n?.topic<"u"?n.topic:this.peerId,u=JSON.stringify(o),h=typeof n?.forcePushNotification<"u"?!n.forcePushNotification:Zt(r);this._transport.send(u,i,h)}async _sendResponse(e){const n=await this._encrypt(e),r=this.peerId,o=JSON.stringify(n),i=!0;this._transport.send(o,r,i)}async _sendSessionRequest(e,n,r){this._sendRequest(e,r),this._subscribeToSessionResponse(e.id,n)}_sendCallRequest(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),this._subscribeToCallResponse(e.id)}_formatRequest(e){if(typeof e.method>"u")throw new Error(wr);return{id:typeof e.id>"u"?Dt():e.id,jsonrpc:"2.0",method:e.method,params:typeof e.params>"u"?[]:e.params}}_formatResponse(e){if(typeof e.id>"u")throw new Error(yr);const n={id:e.id,jsonrpc:"2.0"};if(z(e)){const r=$t(e.error);return Object.assign(Object.assign(Object.assign({},n),e),{error:r})}else if(D(e))return Object.assign(Object.assign({},n),e);throw new Error($e)}_handleSessionDisconnect(e){const n=e||"Session Disconnected";this._connected||(this._qrcodeModal&&this._qrcodeModal.close(),Ne(le)),this._connected&&(this._connected=!1),this._handshakeId&&(this._handshakeId=0),this._handshakeTopic&&(this._handshakeTopic=""),this._peerId&&(this._peerId=""),this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession(),this.transportClose()}_handleSessionResponse(e,n){n?n.approved?(this._connected?(n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]})):(this._connected=!0,n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),n.peerId&&!this.peerId&&(this.peerId=n.peerId),n.peerMeta&&!this.peerMeta&&(this.peerMeta=n.peerMeta),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})),this._manageStorageSession()):this._handleSessionDisconnect(e):this._handleSessionDisconnect(e)}async _handleIncomingMessages(e){if(![this.clientId,this.handshakeTopic].includes(e.topic))return;let r;try{r=JSON.parse(e.payload)}catch{return}const o=await this._decrypt(r);o&&this._eventManager.trigger(o)}_subscribeToSessionRequest(){this._transport.subscribe(this.handshakeTopic)}_subscribeToResponse(e,n){this.on(`response:${e}`,n)}_subscribeToSessionResponse(e,n){this._subscribeToResponse(e,(r,o)=>{if(r){this._handleSessionResponse(r.message);return}D(o)?this._handleSessionResponse(n,o.result):o.error&&o.error.message?this._handleSessionResponse(o.error.message):this._handleSessionResponse(n)})}_subscribeToCallResponse(e){return new Promise((n,r)=>{this._subscribeToResponse(e,(o,i)=>{if(o){r(o);return}D(i)?n(i.result):i.error&&i.error.message?r(i.error):r(new Error($e))})})}_subscribeToInternalEvents(){this.on("display_uri",()=>{this._qrcodeModal&&this._qrcodeModal.open(this.uri,()=>{this._eventManager.trigger({event:"modal_closed",params:[]})},this._qrcodeModalOptions)}),this.on("connect",()=>{this._qrcodeModal&&this._qrcodeModal.close()}),this.on("call_request_sent",(e,n)=>{const{request:r}=n.params[0];if(Mt()&&this._signingMethods.includes(r.method)){const o=Oe(le);o&&(window.location.href=o.href)}}),this.on("wc_sessionRequest",(e,n)=>{e&&this._eventManager.trigger({event:"error",params:[{code:"SESSION_REQUEST_ERROR",message:e.toString()}]}),this.handshakeId=n.id,this.peerId=n.params[0].peerId,this.peerMeta=n.params[0].peerMeta;const r=Object.assign(Object.assign({},n),{method:"session_request"});this._eventManager.trigger(r)}),this.on("wc_sessionUpdate",(e,n)=>{e&&this._handleSessionResponse(e.message),this._handleSessionResponse("Session disconnected",n.params[0])})}_initTransport(){this._transport.on("message",e=>this._handleIncomingMessages(e)),this._transport.on("open",()=>this._eventManager.trigger({event:"transport_open",params:[]})),this._transport.on("close",()=>this._eventManager.trigger({event:"transport_close",params:[]})),this._transport.on("error",()=>this._eventManager.trigger({event:"transport_error",params:["Websocket connection failed"]})),this._transport.open()}_formatUri(){const e=this.protocol,n=this.handshakeTopic,r=this.version,o=encodeURIComponent(this.bridge),i=this.key;return`${e}:${n}@${r}?bridge=${o}&key=${i}`}_parseUri(e){const n=Gt(e);if(n.protocol===this.protocol){if(!n.handshakeTopic)throw Error("Invalid or missing handshakeTopic parameter value");const r=n.handshakeTopic;if(!n.bridge)throw Error("Invalid or missing bridge url parameter value");const o=decodeURIComponent(n.bridge);if(!n.key)throw Error("Invalid or missing key parameter value");const i=n.key;return{handshakeTopic:r,bridge:o,key:i}}else throw new Error(br)}async _generateKey(){return this._cryptoLib?await this._cryptoLib.generateKey():null}async _encrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.encrypt(e,n):null}async _decrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.decrypt(e,n):null}_getStorageSession(){let e=null;return this._sessionStorage&&(e=this._sessionStorage.getSession()),e}_setStorageSession(){this._sessionStorage&&this._sessionStorage.setSession(this.session)}_removeStorageSession(){this._sessionStorage&&this._sessionStorage.removeSession()}_manageStorageSession(){this._connected?this._setStorageSession():this._removeStorageSession()}_registerPushServer(e){if(!e.url||typeof e.url!="string")throw Error("Invalid or missing pushServerOpts.url parameter value");if(!e.type||typeof e.type!="string")throw Error("Invalid or missing pushServerOpts.type parameter value");if(!e.token||typeof e.token!="string")throw Error("Invalid or missing pushServerOpts.token parameter value");const n={bridge:this.bridge,topic:this.clientId,type:e.type,token:e.token,peerName:"",language:e.language||""};this.on("connect",async(r,o)=>{if(r)throw r;if(e.peerMeta){const i=o.params[0].peerMeta.name;n.peerName=i}try{if(!(await(await fetch(`${e.url}/new`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).json()).success)throw Error("Failed to register in Push Server")}catch{throw Error("Failed to register in Push Server")}})}}function wi(t){return Q.getBrowerCrypto().getRandomValues(new Uint8Array(t))}const en=256,tn=en,yi=en,L="AES-CBC",vi=`SHA-${tn}`,fe="HMAC",bi="encrypt",Ei="decrypt",Ci="sign",Si="verify";function xi(t){return t===L?{length:tn,name:L}:{hash:{name:vi},name:fe}}function ki(t){return t===L?[bi,Ei]:[Ci,Si]}async function qe(t,e=L){return Q.getSubtleCrypto().importKey("raw",t,xi(e),!0,ki(e))}async function Ii(t,e,n){const r=Q.getSubtleCrypto(),o=await qe(e,L),i=await r.encrypt({iv:t,name:L},o,n);return new Uint8Array(i)}async function Ri(t,e,n){const r=Q.getSubtleCrypto(),o=await qe(e,L),i=await r.decrypt({iv:t,name:L},o,n);return new Uint8Array(i)}async function Ti(t,e){const n=Q.getSubtleCrypto(),r=await qe(t,fe),o=await n.sign({length:yi,name:fe},r,e);return new Uint8Array(o)}function Oi(t,e,n){return Ii(t,e,n)}function Ni(t,e,n){return Ri(t,e,n)}async function nn(t,e){return await Ti(t,e)}async function rn(t){const e=(t||256)/8,n=wi(e);return xt($(n))}async function on(t,e){const n=M(t.data),r=M(t.iv),o=M(t.hmac),i=N(o,!1),u=Ct(n,r),h=await nn(e,u),p=N(h,!1);return j(i)===j(p)}async function Mi(t,e,n){const r=F(K(e)),o=n||await rn(128),i=F(K(o)),u=N(i,!1),h=JSON.stringify(t),p=vt(h),g=await Oi(i,r,p),w=N(g,!1),y=Ct(g,i),v=await nn(r,y),S=N(v,!1);return{data:w,hmac:S,iv:u}}async function Li(t,e){const n=F(K(e));if(!n)throw new Error("Missing key: required for decryption");if(!await on(t,n))return null;const o=M(t.data),i=M(t.iv),u=await Ni(i,n,o),h=wt(u);let p;try{p=JSON.parse(h)}catch{return null}return p}const qi=Object.freeze(Object.defineProperty({__proto__:null,generateKey:rn,verifyHmac:on,encrypt:Mi,decrypt:Li},Symbol.toStringTag,{value:"Module"}));class Ai extends mi{constructor(e,n){super({cryptoLib:qi,connectorOpts:e,pushServerOpts:n})}}const Ui=nt(ni);var Di=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,n=[],r=0;r<t.rangeCount;r++)n.push(t.getRangeAt(r));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||n.forEach(function(o){t.addRange(o)}),e&&e.focus()}},Pi=Di,ze={"text/plain":"Text","text/html":"Url",default:"Text"},Fi="Copy to clipboard: #{key}, Enter";function ji(t){var e=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function $i(t,e){var n,r,o,i,u,h,p=!1;e||(e={}),n=e.debug||!1;try{o=Pi(),i=document.createRange(),u=document.getSelection(),h=document.createElement("span"),h.textContent=t,h.ariaHidden="true",h.style.all="unset",h.style.position="fixed",h.style.top=0,h.style.clip="rect(0, 0, 0, 0)",h.style.whiteSpace="pre",h.style.webkitUserSelect="text",h.style.MozUserSelect="text",h.style.msUserSelect="text",h.style.userSelect="text",h.addEventListener("copy",function(w){if(w.stopPropagation(),e.format)if(w.preventDefault(),typeof w.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var y=ze[e.format]||ze.default;window.clipboardData.setData(y,t)}else w.clipboardData.clearData(),w.clipboardData.setData(e.format,t);e.onCopy&&(w.preventDefault(),e.onCopy(w.clipboardData))}),document.body.appendChild(h),i.selectNodeContents(h),u.addRange(i);var g=document.execCommand("copy");if(!g)throw new Error("copy command was unsuccessful");p=!0}catch(w){n&&console.error("unable to copy using execCommand: ",w),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),p=!0}catch(y){n&&console.error("unable to copy using clipboardData: ",y),n&&console.error("falling back to prompt"),r=ji("message"in e?e.message:Fi),window.prompt(r,t)}}finally{u&&(typeof u.removeRange=="function"?u.removeRange(i):u.removeAllRanges()),h&&document.body.removeChild(h),o()}return p}var Bi=$i;function sn(t,e){for(var n in e)t[n]=e[n];return t}function _e(t,e){for(var n in t)if(n!=="__source"&&!(n in e))return!0;for(var r in e)if(r!=="__source"&&t[r]!==e[r])return!0;return!1}function ae(t,e){return t===e&&(t!==0||1/t==1/e)||t!=t&&e!=e}function Z(t){this.props=t}function an(t,e){function n(o){var i=this.props.ref,u=i==o.ref;return!u&&i&&(i.call?i(null):i.current=null),e?!e(this.props,o)||!u:_e(this.props,o)}function r(o){return this.shouldComponentUpdate=n,k(t,o)}return r.displayName="Memo("+(t.displayName||t.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(Z.prototype=new A).isPureReactComponent=!0,Z.prototype.shouldComponentUpdate=function(t,e){return _e(this.props,t)||_e(this.state,e)};var Qe=C.__b;C.__b=function(t){t.type&&t.type.__f&&t.ref&&(t.props.ref=t.ref,t.ref=null),Qe&&Qe(t)};var Wi=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function cn(t){function e(n){var r=sn({},n);return delete r.ref,t(r,n.ref||null)}return e.$$typeof=Wi,e.render=e,e.prototype.isReactComponent=e.__f=!0,e.displayName="ForwardRef("+(t.displayName||t.name)+")",e}var Je=function(t,e){return t==null?null:O(O(t).map(e))},ln={map:Je,forEach:Je,count:function(t){return t?O(t).length:0},only:function(t){var e=O(t);if(e.length!==1)throw"Children.only";return e[0]},toArray:O},Hi=C.__e;C.__e=function(t,e,n,r){if(t.then){for(var o,i=e;i=i.__;)if((o=i.__c)&&o.__c)return e.__e==null&&(e.__e=n.__e,e.__k=n.__k),o.__c(t,e)}Hi(t,e,n,r)};var Ve=C.unmount;function un(t,e,n){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),t.__c.__H=null),(t=sn({},t)).__c!=null&&(t.__c.__P===n&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(r){return un(r,e,n)})),t}function dn(t,e,n){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(r){return dn(r,e,n)}),t.__c&&t.__c.__P===e&&(t.__e&&n.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=n)),t}function W(){this.__u=0,this.t=null,this.__b=null}function hn(t){var e=t.__.__c;return e&&e.__a&&e.__a(t)}function fn(t){var e,n,r;function o(i){if(e||(e=t()).then(function(u){n=u.default||u},function(u){r=u}),r)throw r;if(!n)throw e;return k(n,i)}return o.displayName="Lazy",o.__f=!0,o}function P(){this.u=null,this.o=null}C.unmount=function(t){var e=t.__c;e&&e.__R&&e.__R(),e&&t.__h===!0&&(t.type=null),Ve&&Ve(t)},(W.prototype=new A).__c=function(t,e){var n=e.__c,r=this;r.t==null&&(r.t=[]),r.t.push(n);var o=hn(r.__v),i=!1,u=function(){i||(i=!0,n.__R=null,o?o(h):h())};n.__R=u;var h=function(){if(!--r.__u){if(r.state.__a){var g=r.state.__a;r.__v.__k[0]=dn(g,g.__c.__P,g.__c.__O)}var w;for(r.setState({__a:r.__b=null});w=r.t.pop();)w.forceUpdate()}},p=e.__h===!0;r.__u++||p||r.setState({__a:r.__b=r.__v.__k[0]}),t.then(u,u)},W.prototype.componentWillUnmount=function(){this.t=[]},W.prototype.render=function(t,e){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=un(this.__b,n,r.__O=r.__P)}this.__b=null}var o=e.__a&&k(H,null,t.fallback);return o&&(o.__h=null),[k(H,null,e.__a?null:t.children),o]};var Ge=function(t,e,n){if(++n[1]===n[0]&&t.o.delete(e),t.props.revealOrder&&(t.props.revealOrder[0]!=="t"||!t.o.size))for(n=t.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;t.u=n=n[2]}};function zi(t){return this.getChildContext=function(){return t.context},t.children}function Qi(t){var e=this,n=t.i;e.componentWillUnmount=function(){Y(null,e.l),e.l=null,e.i=null},e.i&&e.i!==n&&e.componentWillUnmount(),t.__v?(e.l||(e.i=n,e.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(r){this.childNodes.push(r),e.i.appendChild(r)},insertBefore:function(r,o){this.childNodes.push(r),e.i.appendChild(r)},removeChild:function(r){this.childNodes.splice(this.childNodes.indexOf(r)>>>1,1),e.i.removeChild(r)}}),Y(k(zi,{context:e.context},t.__v),e.l)):e.l&&e.componentWillUnmount()}function _n(t,e){var n=k(Qi,{__v:t,i:e});return n.containerInfo=e,n}(P.prototype=new A).__a=function(t){var e=this,n=hn(e.__v),r=e.o.get(t);return r[0]++,function(o){var i=function(){e.props.revealOrder?(r.push(o),Ge(e,t,r)):o()};n?n(i):i()}},P.prototype.render=function(t){this.u=null,this.o=new Map;var e=O(t.children);t.revealOrder&&t.revealOrder[0]==="b"&&e.reverse();for(var n=e.length;n--;)this.o.set(e[n],this.u=[1,0,this.u]);return t.children},P.prototype.componentDidUpdate=P.prototype.componentDidMount=function(){var t=this;this.o.forEach(function(e,n){Ge(t,n,e)})};var pn=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Ji=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Vi=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Gi=/[A-Z0-9]/g,Yi=typeof document<"u",Ki=function(t){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(t)};function gn(t,e,n){return e.__k==null&&(e.textContent=""),Y(t,e),typeof n=="function"&&n(),t?t.__c:null}function mn(t,e,n){return dr(t,e),typeof n=="function"&&n(),t?t.__c:null}A.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(A.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})});var Ye=C.event;function Zi(){}function Xi(){return this.cancelBubble}function es(){return this.defaultPrevented}C.event=function(t){return Ye&&(t=Ye(t)),t.persist=Zi,t.isPropagationStopped=Xi,t.isDefaultPrevented=es,t.nativeEvent=t};var Ae,ts={enumerable:!1,configurable:!0,get:function(){return this.class}},Ke=C.vnode;C.vnode=function(t){typeof t.type=="string"&&function(e){var n=e.props,r=e.type,o={};for(var i in n){var u=n[i];if(!(i==="value"&&"defaultValue"in n&&u==null||Yi&&i==="children"&&r==="noscript"||i==="class"||i==="className")){var h=i.toLowerCase();i==="defaultValue"&&"value"in n&&n.value==null?i="value":i==="download"&&u===!0?u="":h==="ondoubleclick"?i="ondblclick":h!=="onchange"||r!=="input"&&r!=="textarea"||Ki(n.type)?h==="onfocus"?i="onfocusin":h==="onblur"?i="onfocusout":Vi.test(i)?i=h:r.indexOf("-")===-1&&Ji.test(i)?i=i.replace(Gi,"-$&").toLowerCase():u===null&&(u=void 0):h=i="oninput",h==="oninput"&&o[i=h]&&(i="oninputCapture"),o[i]=u}}r=="select"&&o.multiple&&Array.isArray(o.value)&&(o.value=O(n.children).forEach(function(p){p.props.selected=o.value.indexOf(p.props.value)!=-1})),r=="select"&&o.defaultValue!=null&&(o.value=O(n.children).forEach(function(p){p.props.selected=o.multiple?o.defaultValue.indexOf(p.props.value)!=-1:o.defaultValue==p.props.value})),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",ts)):(n.className&&!n.class||n.class&&n.className)&&(o.class=o.className=n.className),e.props=o}(t),t.$$typeof=pn,Ke&&Ke(t)};var Ze=C.__r;C.__r=function(t){Ze&&Ze(t),Ae=t.__c};var Xe=C.diffed;C.diffed=function(t){Xe&&Xe(t);var e=t.props,n=t.__e;n!=null&&t.type==="textarea"&&"value"in e&&e.value!==n.value&&(n.value=e.value==null?"":e.value),Ae=null};var wn={ReactCurrentDispatcher:{current:{readContext:function(t){return Ae.__n[t.__c].props.value}}}},ns="17.0.2";function yn(t){return k.bind(null,t)}function Ue(t){return!!t&&t.$$typeof===pn}function vn(t){return Ue(t)?hr.apply(null,arguments):t}function bn(t){return!!t.__k&&(Y(null,t),!0)}function En(t){return t&&(t.base||t.nodeType===1&&t)||null}var Cn=function(t,e){return t(e)},Sn=function(t,e){return t(e)},xn=H;function De(t){t()}function kn(t){return t}function In(){return[!1,De]}var Rn=X;function Tn(t,e){var n=e(),r=pe({h:{__:n,v:e}}),o=r[0].h,i=r[1];return X(function(){o.__=n,o.v=e,ae(o.__,e())||i({h:o})},[t,n,e]),ge(function(){return ae(o.__,o.v())||i({h:o}),t(function(){ae(o.__,o.v())||i({h:o})})},[t]),n}var rs={useState:pe,useId:ot,useReducer:it,useEffect:ge,useLayoutEffect:X,useInsertionEffect:Rn,useTransition:In,useDeferredValue:kn,useSyncExternalStore:Tn,startTransition:De,useRef:st,useImperativeHandle:at,useMemo:ct,useCallback:lt,useContext:ut,useDebugValue:dt,version:"17.0.2",Children:ln,render:gn,hydrate:mn,unmountComponentAtNode:bn,createPortal:_n,createElement:k,createContext:ht,createFactory:yn,cloneElement:vn,createRef:ft,Fragment:H,isValidElement:Ue,findDOMNode:En,Component:A,PureComponent:Z,memo:an,forwardRef:cn,flushSync:Sn,unstable_batchedUpdates:Cn,StrictMode:xn,Suspense:W,SuspenseList:P,lazy:fn,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:wn};const os=Object.freeze(Object.defineProperty({__proto__:null,Children:ln,PureComponent:Z,StrictMode:xn,Suspense:W,SuspenseList:P,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:wn,cloneElement:vn,createFactory:yn,createPortal:_n,default:rs,findDOMNode:En,flushSync:Sn,forwardRef:cn,hydrate:mn,isValidElement:Ue,lazy:fn,memo:an,render:gn,startTransition:De,unmountComponentAtNode:bn,unstable_batchedUpdates:Cn,useDeferredValue:kn,useInsertionEffect:Rn,useSyncExternalStore:Tn,useTransition:In,version:ns,Component:A,Fragment:H,createContext:ht,createElement:k,createRef:ft,useCallback:lt,useContext:ut,useDebugValue:dt,useEffect:ge,useErrorBoundary:fr,useId:ot,useImperativeHandle:at,useLayoutEffect:X,useMemo:ct,useReducer:it,useRef:st,useState:pe},Symbol.toStringTag,{value:"Module"})),is=nt(os);function On(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var E=Ui,Nn=On(ur),ss=On(Bi),l=is;function as(t){Nn.toString(t,{type:"terminal"}).then(console.log)}var cs=`:root {
  --animation-duration: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.animated {
  animation-duration: var(--animation-duration);
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

.fadeOut {
  animation-name: fadeOut;
}

#walletconnect-wrapper {
  -webkit-user-select: none;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100%;
  z-index: 99999999999999;
}

.walletconnect-modal__headerLogo {
  height: 21px;
}

.walletconnect-modal__header p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  align-items: flex-start;
  display: flex;
  flex: 1;
  margin-left: 5px;
}

.walletconnect-modal__close__wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10000;
  background: white;
  border-radius: 26px;
  padding: 6px;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.walletconnect-modal__close__icon {
  position: relative;
  top: 7px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}

.walletconnect-modal__close__line1 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
}

.walletconnect-modal__close__line2 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
  transform: rotate(90deg);
}

.walletconnect-qrcode__base {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: rgba(37, 41, 46, 0.95);
  height: 100%;
  left: 0;
  pointer-events: auto;
  position: fixed;
  top: 0;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  will-change: opacity;
  padding: 40px;
  box-sizing: border-box;
}

.walletconnect-qrcode__text {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 10px 0 20px 0;
  text-align: center;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .walletconnect-qrcode__text {
    font-size: 4vw;
  }
}

@media only screen and (max-width: 320px) {
  .walletconnect-qrcode__text {
    font-size: 14px;
  }
}

.walletconnect-qrcode__image {
  width: calc(100% - 30px);
  box-sizing: border-box;
  cursor: none;
  margin: 0 auto;
}

.walletconnect-qrcode__notification {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.1s ease-in-out;
  background: white;
  color: black;
  margin-bottom: -60px;
  opacity: 0;
}

.walletconnect-qrcode__notification.notification__show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__header {
    height: 130px;
  }
  .walletconnect-modal__base {
    overflow: auto;
  }
}

@media only screen and (min-device-width: 415px) and (max-width: 768px) {
  #content {
    max-width: 768px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 375px) and (max-width: 415px) {
  #content {
    max-width: 414px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 320px) and (max-width: 375px) {
  #content {
    max-width: 375px;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 320px) {
  #content {
    max-width: 320px;
    box-sizing: border-box;
  }
}

.walletconnect-modal__base {
  -webkit-font-smoothing: antialiased;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);
  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,
    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 41px;
  padding: 24px 24px 22px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  overflow: visible;
  transform: translateY(-50%);
  top: 50%;
  max-width: 500px;
  margin: auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__base {
    padding: 24px 12px;
  }
}

.walletconnect-modal__base .hidden {
  transform: translateY(150%);
  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);
}

.walletconnect-modal__header {
  align-items: center;
  display: flex;
  height: 26px;
  left: 0;
  justify-content: space-between;
  position: absolute;
  top: -42px;
  width: 100%;
}

.walletconnect-modal__base .wc-logo {
  align-items: center;
  display: flex;
  height: 26px;
  margin-top: 15px;
  padding-bottom: 15px;
  pointer-events: auto;
}

.walletconnect-modal__base .wc-logo div {
  background-color: #3399ff;
  height: 21px;
  margin-right: 5px;
  mask-image: url("images/wc-logo.svg") center no-repeat;
  width: 32px;
}

.walletconnect-modal__base .wc-logo p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.walletconnect-modal__base h2 {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 0 0 19px 0;
  text-align: center;
  width: 100%;
}

.walletconnect-modal__base__row {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
  margin: 0px 0px 8px;
  text-align: left;
  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  text-decoration: none;
}

.walletconnect-modal__base__row:hover {
  background: rgba(60, 66, 82, 0.06);
}

.walletconnect-modal__base__row:active {
  background: rgba(60, 66, 82, 0.06);
  transform: scale(0.975);
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.walletconnect-modal__base__row__h3 {
  color: #25292e;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 3px;
}

.walletconnect-modal__base__row__right {
  align-items: center;
  display: flex;
  justify-content: center;
}

.walletconnect-modal__base__row__right__app-icon {
  border-radius: 8px;
  height: 34px;
  margin: 0 11px 2px 0;
  width: 34px;
  background-size: 100%;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-modal__base__row__right__caret {
  height: 18px;
  opacity: 0.3;
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 8px;
  will-change: opacity;
}

.walletconnect-modal__base__row:hover .caret,
.walletconnect-modal__base__row:active .caret {
  opacity: 0.6;
}

.walletconnect-modal__mobile__toggle {
  width: 80%;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 18px;
  background: #d4d5d9;
}

.walletconnect-modal__single_wallet {
  display: flex;
  justify-content: center;
  margin-top: 7px;
  margin-bottom: 18px;
}

.walletconnect-modal__single_wallet a {
  cursor: pointer;
  color: rgb(64, 153, 255);
  font-size: 21px;
  font-weight: 800;
  text-decoration: none !important;
  margin: 0 auto;
}

.walletconnect-modal__mobile__toggle_selector {
  width: calc(50% - 8px);
  background: white;
  position: absolute;
  border-radius: 5px;
  height: calc(100% - 8px);
  top: 4px;
  transition: all 0.2s ease-in-out;
  transform: translate3d(4px, 0, 0);
}

.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {
  transform: translate3d(calc(100% + 12px), 0, 0);
}

.walletconnect-modal__mobile__toggle a {
  font-size: 12px;
  width: 50%;
  text-align: center;
  padding: 8px;
  margin: 0;
  font-weight: 600;
  z-index: 1;
}

.walletconnect-modal__footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__footer {
    margin-top: 5vw;
  }
}

.walletconnect-modal__footer a {
  cursor: pointer;
  color: #898d97;
  font-size: 15px;
  margin: 0 auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__footer a {
    font-size: 14px;
  }
}

.walletconnect-connect__buttons__wrapper {
  max-height: 44vh;
}

.walletconnect-connect__buttons__wrapper__android {
  margin: 50% 0;
}

.walletconnect-connect__buttons__wrapper__wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px 0;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__buttons__wrapper__wrap {
    margin-top: 40px;
  }
}

.walletconnect-connect__button {
  background-color: rgb(64, 153, 255);
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: 500;
}

.walletconnect-connect__button__icon_anchor {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px;
  width: 42px;
  justify-self: center;
  flex-direction: column;
  text-decoration: none !important;
}

@media only screen and (max-width: 320px) {
  .walletconnect-connect__button__icon_anchor {
    margin: 4px;
  }
}

.walletconnect-connect__button__icon {
  border-radius: 10px;
  height: 42px;
  margin: 0;
  width: 42px;
  background-size: cover !important;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-connect__button__text {
  color: #424952;
  font-size: 2.7vw;
  text-decoration: none !important;
  padding: 0;
  margin-top: 1.8vw;
  font-weight: 600;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__button__text {
    font-size: 16px;
    margin-top: 12px;
  }
}

.walletconnect-search__input {
  border: none;
  background: #d4d5d9;
  border-style: none;
  padding: 8px 16px;
  outline: none;
  font-style: normal;
  font-stretch: normal;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  border-radius: 8px;
  width: calc(100% - 16px);
  margin: 0;
  margin-bottom: 8px;
}
`;typeof Symbol<"u"&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")));typeof Symbol<"u"&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function ls(t,e){try{var n=t()}catch(r){return e(r)}return n&&n.then?n.then(void 0,e):n}var us="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E",ds="WalletConnect",hs=300,fs="rgb(64, 153, 255)",Mn="walletconnect-wrapper",et="walletconnect-style-sheet",Ln="walletconnect-qrcode-modal",_s="walletconnect-qrcode-close",qn="walletconnect-qrcode-text",ps="walletconnect-connect-button";function gs(t){return l.createElement("div",{className:"walletconnect-modal__header"},l.createElement("img",{src:us,className:"walletconnect-modal__headerLogo"}),l.createElement("p",null,ds),l.createElement("div",{className:"walletconnect-modal__close__wrapper",onClick:t.onClose},l.createElement("div",{id:_s,className:"walletconnect-modal__close__icon"},l.createElement("div",{className:"walletconnect-modal__close__line1"}),l.createElement("div",{className:"walletconnect-modal__close__line2"}))))}function ms(t){return l.createElement("a",{className:"walletconnect-connect__button",href:t.href,id:ps+"-"+t.name,onClick:t.onClick,rel:"noopener noreferrer",style:{backgroundColor:t.color},target:"_blank"},t.name)}var ws="data:image/svg+xml,%3Csvg width='8' height='18' viewBox='0 0 8 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.586301 0.213898C0.150354 0.552968 0.0718197 1.18124 0.41089 1.61719L5.2892 7.88931C5.57007 8.25042 5.57007 8.75608 5.2892 9.11719L0.410889 15.3893C0.071819 15.8253 0.150353 16.4535 0.586301 16.7926C1.02225 17.1317 1.65052 17.0531 1.98959 16.6172L6.86791 10.3451C7.7105 9.26174 7.7105 7.74476 6.86791 6.66143L1.98959 0.38931C1.65052 -0.0466374 1.02225 -0.125172 0.586301 0.213898Z' fill='%233C4252'/%3E %3C/svg%3E";function ys(t){var e=t.color,n=t.href,r=t.name,o=t.logo,i=t.onClick;return l.createElement("a",{className:"walletconnect-modal__base__row",href:n,onClick:i,rel:"noopener noreferrer",target:"_blank"},l.createElement("h3",{className:"walletconnect-modal__base__row__h3"},r),l.createElement("div",{className:"walletconnect-modal__base__row__right"},l.createElement("div",{className:"walletconnect-modal__base__row__right__app-icon",style:{background:"url('"+o+"') "+e,backgroundSize:"100%"}}),l.createElement("img",{src:ws,className:"walletconnect-modal__base__row__right__caret"})))}function vs(t){var e=t.color,n=t.href,r=t.name,o=t.logo,i=t.onClick,u=window.innerWidth<768?(r.length>8?2.5:2.7)+"vw":"inherit";return l.createElement("a",{className:"walletconnect-connect__button__icon_anchor",href:n,onClick:i,rel:"noopener noreferrer",target:"_blank"},l.createElement("div",{className:"walletconnect-connect__button__icon",style:{background:"url('"+o+"') "+e,backgroundSize:"100%"}}),l.createElement("div",{style:{fontSize:u},className:"walletconnect-connect__button__text"},r))}var bs=5,ce=12;function Es(t){var e=E.isAndroid(),n=l.useState(""),r=n[0],o=n[1],i=l.useState(""),u=i[0],h=i[1],p=l.useState(1),g=p[0],w=p[1],y=u?t.links.filter(function(c){return c.name.toLowerCase().includes(u.toLowerCase())}):t.links,v=t.errorMessage,S=u||y.length>bs,x=Math.ceil(y.length/ce),I=[(g-1)*ce+1,g*ce],R=y.length?y.filter(function(c,f){return f+1>=I[0]&&f+1<=I[1]}):[],s=!e&&x>1,a=void 0;function d(c){o(c.target.value),clearTimeout(a),c.target.value?a=setTimeout(function(){h(c.target.value),w(1)},1e3):(o(""),h(""),w(1))}return l.createElement("div",null,l.createElement("p",{id:qn,className:"walletconnect-qrcode__text"},e?t.text.connect_mobile_wallet:t.text.choose_preferred_wallet),!e&&l.createElement("input",{className:"walletconnect-search__input",placeholder:"Search",value:r,onChange:d}),l.createElement("div",{className:"walletconnect-connect__buttons__wrapper"+(e?"__android":S&&y.length?"__wrap":"")},e?l.createElement(ms,{name:t.text.connect,color:fs,href:t.uri,onClick:l.useCallback(function(){E.saveMobileLinkInfo({name:"Unknown",href:t.uri})},[])}):R.length?R.map(function(c){var f=c.color,m=c.name,_=c.shortName,b=c.logo,T=E.formatIOSMobile(t.uri,c),U=l.useCallback(function(){E.saveMobileLinkInfo({name:m,href:T})},[R]);return S?l.createElement(vs,{color:f,href:T,name:_||m,logo:b,onClick:U}):l.createElement(ys,{color:f,href:T,name:m,logo:b,onClick:U})}):l.createElement(l.Fragment,null,l.createElement("p",null,v.length?t.errorMessage:!!t.links.length&&!y.length?t.text.no_wallets_found:t.text.loading))),s&&l.createElement("div",{className:"walletconnect-modal__footer"},Array(x).fill(0).map(function(c,f){var m=f+1,_=g===m;return l.createElement("a",{style:{margin:"auto 10px",fontWeight:_?"bold":"normal"},onClick:function(){return w(m)}},m)})))}function Cs(t){var e=!!t.message.trim();return l.createElement("div",{className:"walletconnect-qrcode__notification"+(e?" notification__show":"")},t.message)}var Ss=function(t){try{var e="";return Promise.resolve(Nn.toString(t,{margin:0,type:"svg"})).then(function(n){return typeof n=="string"&&(e=n.replace("<svg",'<svg class="walletconnect-qrcode__image"')),e})}catch(n){return Promise.reject(n)}};function xs(t){var e=l.useState(""),n=e[0],r=e[1],o=l.useState(""),i=o[0],u=o[1];l.useEffect(function(){try{return Promise.resolve(Ss(t.uri)).then(function(p){u(p)})}catch(p){Promise.reject(p)}},[]);var h=function(){var p=ss(t.uri);p?(r(t.text.copied_to_clipboard),setInterval(function(){return r("")},1200)):(r("Error"),setInterval(function(){return r("")},1200))};return l.createElement("div",null,l.createElement("p",{id:qn,className:"walletconnect-qrcode__text"},t.text.scan_qrcode_with_wallet),l.createElement("div",{dangerouslySetInnerHTML:{__html:i}}),l.createElement("div",{className:"walletconnect-modal__footer"},l.createElement("a",{onClick:h},t.text.copy_to_clipboard)),l.createElement(Cs,{message:n}))}function ks(t){var e=E.isAndroid(),n=E.isMobile(),r=n?t.qrcodeModalOptions&&t.qrcodeModalOptions.mobileLinks?t.qrcodeModalOptions.mobileLinks:void 0:t.qrcodeModalOptions&&t.qrcodeModalOptions.desktopLinks?t.qrcodeModalOptions.desktopLinks:void 0,o=l.useState(!1),i=o[0],u=o[1],h=l.useState(!1),p=h[0],g=h[1],w=l.useState(!n),y=w[0],v=w[1],S={mobile:n,text:t.text,uri:t.uri,qrcodeModalOptions:t.qrcodeModalOptions},x=l.useState(""),I=x[0],R=x[1],s=l.useState(!1),a=s[0],d=s[1],c=l.useState([]),f=c[0],m=c[1],_=l.useState(""),b=_[0],T=_[1],U=function(){p||i||r&&!r.length||f.length>0||l.useEffect(function(){var Pn=function(){try{if(e)return Promise.resolve();u(!0);var ie=ls(function(){var B=t.qrcodeModalOptions&&t.qrcodeModalOptions.registryUrl?t.qrcodeModalOptions.registryUrl:E.getWalletRegistryUrl();return Promise.resolve(fetch(B)).then(function(Fn){return Promise.resolve(Fn.json()).then(function(jn){var $n=jn.listings,Bn=n?"mobile":"desktop",V=E.getMobileLinkRegistry(E.formatMobileRegistry($n,Bn),r);u(!1),g(!0),T(V.length?"":t.text.no_supported_wallets),m(V);var Pe=V.length===1;Pe&&(R(E.formatIOSMobile(t.uri,V[0])),v(!0)),d(Pe)})})},function(B){u(!1),g(!0),T(t.text.something_went_wrong),console.error(B)});return Promise.resolve(ie&&ie.then?ie.then(function(){}):void 0)}catch(B){return Promise.reject(B)}};Pn()})};U();var Dn=n?y:!y;return l.createElement("div",{id:Ln,className:"walletconnect-qrcode__base animated fadeIn"},l.createElement("div",{className:"walletconnect-modal__base"},l.createElement(gs,{onClose:t.onClose}),a&&y?l.createElement("div",{className:"walletconnect-modal__single_wallet"},l.createElement("a",{onClick:function(){return E.saveMobileLinkInfo({name:f[0].name,href:I})},href:I,rel:"noopener noreferrer",target:"_blank"},t.text.connect_with+" "+(a?f[0].name:"")+" \u203A")):e||i||!i&&f.length?l.createElement("div",{className:"walletconnect-modal__mobile__toggle"+(Dn?" right__selected":"")},l.createElement("div",{className:"walletconnect-modal__mobile__toggle_selector"}),n?l.createElement(l.Fragment,null,l.createElement("a",{onClick:function(){return v(!1),U()}},t.text.mobile),l.createElement("a",{onClick:function(){return v(!0)}},t.text.qrcode)):l.createElement(l.Fragment,null,l.createElement("a",{onClick:function(){return v(!0)}},t.text.qrcode),l.createElement("a",{onClick:function(){return v(!1),U()}},t.text.desktop))):null,l.createElement("div",null,y||!e&&!i&&!f.length?l.createElement(xs,Object.assign({},S)):l.createElement(Es,Object.assign({},S,{links:f,errorMessage:b})))))}var Is={choose_preferred_wallet:"W\xE4hle bevorzugte Wallet",connect_mobile_wallet:"Verbinde mit Mobile Wallet",scan_qrcode_with_wallet:"Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",connect:"Verbinden",qrcode:"QR-Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"In die Zwischenablage kopieren",copied_to_clipboard:"In die Zwischenablage kopiert!",connect_with:"Verbinden mit Hilfe von",loading:"Laden...",something_went_wrong:"Etwas ist schief gelaufen",no_supported_wallets:"Es gibt noch keine unterst\xFCtzten Wallet",no_wallets_found:"keine Wallet gefunden"},Rs={choose_preferred_wallet:"Choose your preferred wallet",connect_mobile_wallet:"Connect to Mobile Wallet",scan_qrcode_with_wallet:"Scan QR code with a WalletConnect-compatible wallet",connect:"Connect",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copy to clipboard",copied_to_clipboard:"Copied to clipboard!",connect_with:"Connect with",loading:"Loading...",something_went_wrong:"Something went wrong",no_supported_wallets:"There are no supported wallets yet",no_wallets_found:"No wallets found"},Ts={choose_preferred_wallet:"Elige tu billetera preferida",connect_mobile_wallet:"Conectar a billetera m\xF3vil",scan_qrcode_with_wallet:"Escanea el c\xF3digo QR con una billetera compatible con WalletConnect",connect:"Conectar",qrcode:"C\xF3digo QR",mobile:"M\xF3vil",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Conectar mediante",loading:"Cargando...",something_went_wrong:"Algo sali\xF3 mal",no_supported_wallets:"Todav\xEDa no hay billeteras compatibles",no_wallets_found:"No se encontraron billeteras"},Os={choose_preferred_wallet:"Choisissez votre portefeuille pr\xE9f\xE9r\xE9",connect_mobile_wallet:"Se connecter au portefeuille mobile",scan_qrcode_with_wallet:"Scannez le QR code avec un portefeuille compatible WalletConnect",connect:"Se connecter",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copier",copied_to_clipboard:"Copi\xE9!",connect_with:"Connectez-vous \xE0 l'aide de",loading:"Chargement...",something_went_wrong:"Quelque chose a mal tourn\xE9",no_supported_wallets:"Il n'y a pas encore de portefeuilles pris en charge",no_wallets_found:"Aucun portefeuille trouv\xE9"},Ns={choose_preferred_wallet:"\uC6D0\uD558\uB294 \uC9C0\uAC11\uC744 \uC120\uD0DD\uD558\uC138\uC694",connect_mobile_wallet:"\uBAA8\uBC14\uC77C \uC9C0\uAC11\uACFC \uC5F0\uACB0",scan_qrcode_with_wallet:"WalletConnect \uC9C0\uC6D0 \uC9C0\uAC11\uC5D0\uC11C QR\uCF54\uB4DC\uB97C \uC2A4\uCE94\uD558\uC138\uC694",connect:"\uC5F0\uACB0",qrcode:"QR \uCF54\uB4DC",mobile:"\uBAA8\uBC14\uC77C",desktop:"\uB370\uC2A4\uD06C\uD0D1",copy_to_clipboard:"\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC",copied_to_clipboard:"\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4!",connect_with:"\uC640 \uC5F0\uACB0\uD558\uB2E4",loading:"\uB85C\uB4DC \uC911...",something_went_wrong:"\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",no_supported_wallets:"\uC544\uC9C1 \uC9C0\uC6D0\uB418\uB294 \uC9C0\uAC11\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",no_wallets_found:"\uC9C0\uAC11\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"},Ms={choose_preferred_wallet:"Escolha sua carteira preferida",connect_mobile_wallet:"Conectar-se \xE0 carteira m\xF3vel",scan_qrcode_with_wallet:"Ler o c\xF3digo QR com uma carteira compat\xEDvel com WalletConnect",connect:"Conectar",qrcode:"C\xF3digo QR",mobile:"M\xF3vel",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Ligar por meio de",loading:"Carregamento...",something_went_wrong:"Algo correu mal",no_supported_wallets:"Ainda n\xE3o h\xE1 carteiras suportadas",no_wallets_found:"Nenhuma carteira encontrada"},Ls={choose_preferred_wallet:"\u9009\u62E9\u4F60\u7684\u94B1\u5305",connect_mobile_wallet:"\u8FDE\u63A5\u81F3\u79FB\u52A8\u7AEF\u94B1\u5305",scan_qrcode_with_wallet:"\u4F7F\u7528\u517C\u5BB9 WalletConnect \u7684\u94B1\u5305\u626B\u63CF\u4E8C\u7EF4\u7801",connect:"\u8FDE\u63A5",qrcode:"\u4E8C\u7EF4\u7801",mobile:"\u79FB\u52A8",desktop:"\u684C\u9762",copy_to_clipboard:"\u590D\u5236\u5230\u526A\u8D34\u677F",copied_to_clipboard:"\u590D\u5236\u5230\u526A\u8D34\u677F\u6210\u529F\uFF01",connect_with:"\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u8FDE\u63A5",loading:"\u6B63\u5728\u52A0\u8F7D...",something_went_wrong:"\u51FA\u4E86\u95EE\u9898",no_supported_wallets:"\u76EE\u524D\u8FD8\u6CA1\u6709\u652F\u6301\u7684\u94B1\u5305",no_wallets_found:"\u6CA1\u6709\u627E\u5230\u94B1\u5305"},qs={choose_preferred_wallet:"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u062E\u0648\u062F \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",connect_mobile_wallet:"\u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0648\u0635\u0644 \u0634\u0648\u06CC\u062F",scan_qrcode_with_wallet:"\u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u06CC\u06A9 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0633\u0627\u0632\u06AF\u0627\u0631 \u0628\u0627 WalletConnect \u0627\u0633\u06A9\u0646 \u06A9\u0646\u06CC\u062F",connect:"\u0627\u062A\u0635\u0627\u0644",qrcode:"\u06A9\u062F QR",mobile:"\u0633\u06CC\u0627\u0631",desktop:"\u062F\u0633\u06A9\u062A\u0627\u067E",copy_to_clipboard:"\u06A9\u067E\u06CC \u0628\u0647 \u06A9\u0644\u06CC\u067E \u0628\u0648\u0631\u062F",copied_to_clipboard:"\u062F\u0631 \u06A9\u0644\u06CC\u067E \u0628\u0648\u0631\u062F \u06A9\u067E\u06CC \u0634\u062F!",connect_with:"\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627",loading:"...\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",something_went_wrong:"\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F",no_supported_wallets:"\u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0634\u062F\u0647 \u0627\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F",no_wallets_found:"\u0647\u06CC\u0686 \u06A9\u06CC\u0641 \u067E\u0648\u0644\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F"},tt={de:Is,en:Rs,es:Ts,fr:Os,ko:Ns,pt:Ms,zh:Ls,fa:qs};function As(){var t=E.getDocumentOrThrow(),e=t.getElementById(et);e&&t.head.removeChild(e);var n=t.createElement("style");n.setAttribute("id",et),n.innerText=cs,t.head.appendChild(n)}function Us(){var t=E.getDocumentOrThrow(),e=t.createElement("div");return e.setAttribute("id",Mn),t.body.appendChild(e),e}function An(){var t=E.getDocumentOrThrow(),e=t.getElementById(Ln);e&&(e.className=e.className.replace("fadeIn","fadeOut"),setTimeout(function(){var n=t.getElementById(Mn);n&&t.body.removeChild(n)},hs))}function Ds(t){return function(){An(),t&&t()}}function Ps(){var t=E.getNavigatorOrThrow().language.split("-")[0]||"en";return tt[t]||tt.en}function Fs(t,e,n){As();var r=Us();l.render(l.createElement(ks,{text:Ps(),uri:t,onClose:Ds(e),qrcodeModalOptions:n}),r)}function js(){An()}var Un=function(){return typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u"};function $s(t,e,n){console.log(t),Un()?as(t):Fs(t,e,n)}function Bs(){Un()||js()}var Ws={open:$s,close:Bs},Hs=Ws;class zs extends cr{constructor(e){super(),this.events=new rt.exports,this.accounts=[],this.chainId=1,this.pending=!1,this.bridge="https://bridge.walletconnect.org",this.qrcode=!0,this.qrcodeModalOptions=void 0,this.opts=e,this.chainId=e?.chainId||this.chainId,this.wc=this.register(e)}get connected(){return typeof this.wc<"u"&&this.wc.connected}get connecting(){return this.pending}get connector(){return this.wc=this.register(this.opts),this.wc}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}off(e,n){this.events.off(e,n)}removeListener(e,n){this.events.removeListener(e,n)}async open(e){if(this.connected){this.onOpen();return}return new Promise((n,r)=>{this.on("error",o=>{r(o)}),this.on("open",()=>{n()}),this.create(e)})}async close(){typeof this.wc>"u"||(this.wc.connected&&this.wc.killSession(),this.onClose())}async send(e){this.wc=this.register(this.opts),this.connected||await this.open(),this.sendPayload(e).then(n=>this.events.emit("payload",n)).catch(n=>this.events.emit("payload",Fe(e.id,n.message)))}register(e){if(this.wc)return this.wc;this.opts=e||this.opts,this.bridge=e?.connector?e.connector.bridge:e?.bridge||"https://bridge.walletconnect.org",this.qrcode=typeof e?.qrcode>"u"||e.qrcode!==!1,this.chainId=typeof e?.chainId<"u"?e.chainId:this.chainId,this.qrcodeModalOptions=e?.qrcodeModalOptions;const n={bridge:this.bridge,qrcodeModal:this.qrcode?Hs:void 0,qrcodeModalOptions:this.qrcodeModalOptions,storageId:e?.storageId,signingMethods:e?.signingMethods,clientMeta:e?.clientMeta};if(this.wc=typeof e?.connector<"u"?e.connector:new Ai(n),typeof this.wc>"u")throw new Error("Failed to register WalletConnect connector");return this.wc.accounts.length&&(this.accounts=this.wc.accounts),this.wc.chainId&&(this.chainId=this.wc.chainId),this.registerConnectorEvents(),this.wc}onOpen(e){this.pending=!1,e&&(this.wc=e),this.events.emit("open")}onClose(){this.pending=!1,this.wc&&(this.wc=void 0),this.events.emit("close")}onError(e,n="Failed or Rejected Request",r=-32e3){const o={id:e.id,jsonrpc:e.jsonrpc,error:{code:r,message:n}};return this.events.emit("payload",o),o}create(e){this.wc=this.register(this.opts),this.chainId=e||this.chainId,!(this.connected||this.pending)&&(this.pending=!0,this.registerConnectorEvents(),this.wc.createSession({chainId:this.chainId}).then(()=>this.events.emit("created")).catch(n=>this.events.emit("error",n)))}registerConnectorEvents(){this.wc=this.register(this.opts),this.wc.on("connect",e=>{var n,r;if(e){this.events.emit("error",e);return}this.accounts=((n=this.wc)===null||n===void 0?void 0:n.accounts)||[],this.chainId=((r=this.wc)===null||r===void 0?void 0:r.chainId)||this.chainId,this.onOpen()}),this.wc.on("disconnect",e=>{if(e){this.events.emit("error",e);return}this.onClose()}),this.wc.on("modal_closed",()=>{this.events.emit("error",new Error("User closed modal"))}),this.wc.on("session_update",(e,n)=>{const{accounts:r,chainId:o}=n.params[0];(!this.accounts||r&&this.accounts!==r)&&(this.accounts=r,this.events.emit("accountsChanged",r)),(!this.chainId||o&&this.chainId!==o)&&(this.chainId=o,this.events.emit("chainChanged",o))})}async sendPayload(e){this.wc=this.register(this.opts);try{const n=await this.wc.unsafeSend(e);return this.sanitizeResponse(n)}catch(n){return this.onError(e,n.message)}}sanitizeResponse(e){return typeof e.error<"u"&&typeof e.error.code>"u"?Fe(e.id,e.error.message,e.error.data):e}}class Ys{constructor(e){this.events=new rt.exports,this.rpc={infuraId:e?.infuraId,custom:e?.rpc},this.signer=new je(new zs(e));const n=this.signer.connection.chainId||e?.chainId||1;this.http=this.setHttpProvider(n),this.registerEventListeners()}get connected(){return this.signer.connection.connected}get connector(){return this.signer.connection.connector}get accounts(){return this.signer.connection.accounts}get chainId(){return this.signer.connection.chainId}get rpcUrl(){var e;return((e=this.http)===null||e===void 0?void 0:e.connection).url||""}async request(e){switch(e.method){case"eth_requestAccounts":return await this.connect(),this.signer.connection.accounts;case"eth_accounts":return this.signer.connection.accounts;case"eth_chainId":return this.signer.connection.chainId}if(me.includes(e.method))return this.signer.request(e);if(typeof this.http>"u")throw new Error(`Cannot request JSON-RPC method (${e.method}) without provided rpc url`);return this.http.request(e)}sendAsync(e,n){this.request(e).then(r=>n(null,r)).catch(r=>n(r,void 0))}async enable(){return await this.request({method:"eth_requestAccounts"})}async connect(){this.signer.connection.connected||await this.signer.connect()}async disconnect(){this.signer.connection.connected&&await this.signer.disconnect()}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}removeListener(e,n){this.events.removeListener(e,n)}off(e,n){this.events.off(e,n)}get isWalletConnect(){return!0}registerEventListeners(){this.signer.connection.on("accountsChanged",e=>{this.events.emit("accountsChanged",e)}),this.signer.connection.on("chainChanged",e=>{this.http=this.setHttpProvider(e),this.events.emit("chainChanged",e)}),this.signer.on("disconnect",()=>{this.events.emit("disconnect")})}setHttpProvider(e){const n=Ft(e,this.rpc);return typeof n>"u"?void 0:new je(new lr(n))}}export{Ys as default};
