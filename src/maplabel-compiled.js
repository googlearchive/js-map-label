/*


 Copyright 2011 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function d(a){if(!MapLabel.prototype.setValues)for(var b in google.maps.OverlayView.prototype)MapLabel.prototype.hasOwnProperty(b)||(MapLabel.prototype[b]=google.maps.OverlayView.prototype[b]);this.set("align","center");this.set("fontColor","#000000");this.set("fontFamily","Roboto,Arial,sans-serif");this.set("fontSize",12);this.set("strokeColor","#ffffff");this.set("strokeWeight",4);this.set("zIndex",1E3);this.setValues(a)}window.MapLabel=d;
d.prototype.changed=function(a){switch(a){case "fontFamily":case "fontSize":case "fontColor":case "strokeWeight":case "strokeColor":case "text":h(this);case "align":case "maxZoom":case "minZoom":case "position":return this.b()}};
function h(a){var b=a.a;if(b){var f=b.style;f.position="absolute";f.zIndex=a.get("zIndex");var c=b.getContext("2d");c.font=a.get("fontSize")+"px "+a.get("fontFamily");var e=Number(a.get("strokeWeight")),g=a.get("text");b.width=Math.ceil(c.measureText(g).width+2*e);b.height=Math.ceil(parseInt(a.get("fontSize"),10)+2*e);1<window.devicePixelRatio&&(f.width=b.width+"px",f.height=b.height+"px",b.width*=window.devicePixelRatio,b.height*=window.devicePixelRatio,c.scale(window.devicePixelRatio,window.devicePixelRatio));
c.lineJoin="round";c.textBaseline="top";c.textAlign="left";c.strokeStyle=a.get("strokeColor");c.fillStyle=a.get("fontColor");c.font=a.get("fontSize")+"px "+a.get("fontFamily");c.clearRect(0,0,b.width,b.height);g&&(e&&(c.lineWidth=e,c.strokeText(g,e,e)),c.fillText(g,e,e))}}d.prototype.c=function(){var a=this.a=document.createElement("canvas");h(this);var b=this.getPanes();b&&b.overlayLayer.appendChild(a)};d.prototype.onAdd=d.prototype.c;
d.prototype.b=function(){var a=this.getProjection();if(a&&this.a){var b=this.get("position");if(b){b=a.fromLatLngToDivPixel(b);a=this.a.style;a.top=b.y+"px";switch(this.get("align")){case "left":a.left=b.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:1)+"px";a["margin-left"]="-1em";a["margin-top"]="-0.4em";break;case "right":a.left=b.x+"px";a["margin-left"]="1em";a["margin-top"]="-0.4em";break;default:a.left=b.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:1)/2+"px",a["margin-left"]=0,a["margin-top"]=
"1em"}var b=this.get("minZoom"),f=this.get("maxZoom");if(void 0===b&&void 0===f)b="";else{var c=this.g();c?(c=c.getZoom(),b=c<b||c>f?"hidden":""):b=""}a.visibility=b}}};d.prototype.draw=d.prototype.b;d.prototype.onRemove=function(){var a=this.a;a&&a.parentNode&&a.parentNode.removeChild(a)};d.prototype.onRemove=d.prototype.onRemove;
