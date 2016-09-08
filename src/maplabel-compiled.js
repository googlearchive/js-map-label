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
MapLabel=function(a){if(!MapLabel.prototype.setValues)for(var b in google.maps.OverlayView.prototype)MapLabel.prototype.hasOwnProperty(b)||(MapLabel.prototype[b]=google.maps.OverlayView.prototype[b]);this.set("align","center");this.set("fontColor","#000000");this.set("fontFamily","Roboto,Arial,sans-serif");this.set("fontSize",12);this.set("strokeColor","#ffffff");this.set("strokeWeight",4);this.set("zIndex",1E3);this.setValues(a)};window.MapLabel=MapLabel;
MapLabel.prototype.changed=function(a){switch(a){case "fontFamily":case "fontSize":case "fontColor":case "strokeWeight":case "strokeColor":case "text":g(this);case "align":case "maxZoom":case "minZoom":case "position":return this.draw()}};
function g(a){var b=a.a;if(b){var e=b.style;e.position="absolute";e.zIndex=a.get("zIndex");var c=b.getContext("2d");c.font=a.get("fontSize")+"px "+a.get("fontFamily");var d=Number(a.get("strokeWeight")),f=a.get("text");b.width=Math.ceil(c.measureText(f).width+2*d);b.height=Math.ceil(parseInt(a.get("fontSize"),10)+2*d);1<window.devicePixelRatio&&(e.width=b.width+"px",e.height=b.height+"px",b.width*=window.devicePixelRatio,b.height*=window.devicePixelRatio,c.scale(window.devicePixelRatio,window.devicePixelRatio));
c.lineJoin="round";c.textBaseline="top";c.textAlign="left";c.strokeStyle=a.get("strokeColor");c.fillStyle=a.get("fontColor");c.font=a.get("fontSize")+"px "+a.get("fontFamily");c.clearRect(0,0,b.width,b.height);f&&(d&&(c.lineWidth=d,c.strokeText(f,d,d)),c.fillText(f,d,d))}}MapLabel.prototype.onAdd=function(){var a=this.a=document.createElement("canvas");g(this);var b=this.getPanes();b&&b.overlayLayer.appendChild(a)};MapLabel.prototype.onAdd=MapLabel.prototype.onAdd;
MapLabel.prototype.draw=function(){var a=this.getProjection();if(a&&this.a){var b=this.get("position");if(b){b=a.fromLatLngToDivPixel(b);a=this.a.style;a.top=b.y+"px";switch(this.get("align")){case "left":a.left=b.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:1)+"px";a["margin-left"]="-1em";a["margin-top"]="-0.4em";break;case "right":a.left=b.x+"px";a["margin-left"]="1em";a["margin-top"]="-0.4em";break;default:a.left=b.x-this.a.width/(window.devicePixelRatio?window.devicePixelRatio:
1)/2+"px",a["margin-left"]=0,a["margin-top"]="1em"}var b=this.get("minZoom"),e=this.get("maxZoom");if(void 0===b&&void 0===e)b="";else{var c=this.getMap();c?(c=c.getZoom(),b=c<b||c>e?"hidden":""):b=""}a.visibility=b}}};MapLabel.prototype.draw=MapLabel.prototype.draw;MapLabel.prototype.onRemove=function(){var a=this.a;a&&a.parentNode&&a.parentNode.removeChild(a)};MapLabel.prototype.onRemove=MapLabel.prototype.onRemove;
