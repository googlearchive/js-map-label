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
function d(b){if(!MapLabel.prototype.setValues)for(var a in google.maps.OverlayView.prototype)MapLabel.prototype[a]=google.maps.OverlayView.prototype[a];this.set("align","center");this.set("fontColor","#000000");this.set("fontFamily","Roboto,Arial,sans-serif");this.set("fontSize",12);this.set("strokeColor","#ffffff");this.set("strokeWeight",4);this.set("zIndex",1E3);this.setValues(b)}window.MapLabel=d;
d.prototype.g=function(){var b=this.a=document.createElement("canvas"),a=this.a;if(a){var f=a.style;f.position="absolute";f.zIndex=this.get("zIndex");var c=a.getContext("2d");c.font=this.get("fontSize")+"px "+this.get("fontFamily");var e=Number(this.get("strokeWeight")),g=this.get("text");a.width=Math.ceil(c.measureText(g).width+2*e);a.height=Math.ceil(parseInt(this.get("fontSize"),10)+2*e);1<window.devicePixelRatio&&(f.width=a.width+"px",f.height=a.height+"px",a.width*=window.devicePixelRatio,a.height*=
window.devicePixelRatio,c.scale(window.devicePixelRatio,window.devicePixelRatio));c.lineJoin="round";c.textBaseline="top";c.textAlign="left";c.strokeStyle=this.get("strokeColor");c.fillStyle=this.get("fontColor");c.font=this.get("fontSize")+"px "+this.get("fontFamily");c.clearRect(0,0,a.width,a.height);g&&(e&&(c.lineWidth=e,c.strokeText(g,e,e)),c.fillText(g,e,e))}(a=this.getPanes())&&a.overlayLayer.appendChild(b)};d.prototype.onAdd=d.prototype.g;
d.prototype.c=function(){var b=this.getProjection();if(b&&this.a){var a=this.get("position");if(a){a=b.fromLatLngToDivPixel(a);b=this.a.style;b.top=a.y+"px";switch(this.get("align")){case "left":b.left=a.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:1)+"px";b["margin-left"]="-1em";b["margin-top"]="-0.4em";break;case "right":b["margin-top"]="-0.4em";b["margin-left"]="1em";b.left=a.x+"px";break;default:b["margin-top"]="1em",b.left=a.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:1)/2+"px"}var a=
this.get("minZoom"),f=this.get("maxZoom");if(void 0===a&&void 0===f)a="";else{var c=this.getMap();c?(c=c.getZoom(),a=c<a||c>f?"hidden":""):a=""}b.visibility=a}}};d.prototype.draw=d.prototype.c;d.prototype.h=function(){var b=this.a;b&&b.parentNode&&b.parentNode.removeChild(b)};d.prototype.onRemove=d.prototype.h;
