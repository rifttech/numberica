(this.webpackJsonpnumberica=this.webpackJsonpnumberica||[]).push([[0],{179:function(e,t,n){},180:function(e,t,n){},320:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(69),i=n.n(a),j=(n(179),n(66)),l=n(12),s=(n(180),n(15)),x=n(16),u=n(149),o=n(150),b=function(){function e(t){Object(u.a)(this,e),this.diff=[],h(this.diff,t,5)}return Object(o.a)(e,[{key:"getTable",value:function(){return this.diff}}]),e}();function h(e,t,n){if(!(n<=0)){for(var c=[],r=0;r<t.length-1;r++)c.push(t[r+1]-t[r]);e.push(c),h(e,c,n-1)}}var d=[0,1,2,6,24,120];function O(e,t,n){for(var c=Number(t[0].x),r=Number(t[0].y),a=0;t[a]<e&&a<100;)a++;for(var i=(e-c)/Math.abs(Number(t[1].x)-Number(t[0].x)),j=r,l=0;l<5;l++)j+=n.getTable()[l][0]*f(i,l)/d[l+1];return j}function f(e,t){for(var n=1,c=t;c>=0;c--)n*=e-c;return n}function v(e){return e.split("\n").map((function(e){var t=e.replace(/\s/g,"").split(";");return{x:Number(t[0]),y:Number(t[1])}}))}function p(e,t){if(0===t)return e;var n=Math.pow(10,t);return Math.round((e+Number.EPSILON)*n)/n}var m=n(2);function g(e){var t=e.text,n=e.onChange;return Object(m.jsx)("textarea",{style:{width:"200px",height:"300px",fontSize:"20px"},value:t,onChange:function(e){return n(e)}})}var y=n(321),_=n(327),N=n(325),$=n(166),C=n(167),w=n(77),k=n(75),M=n(164),S=function(e){var t=e.cx,n=e.cy;return e.payload.visible?Object(m.jsx)("svg",{x:t-4,y:n-4,width:8,height:8,fill:"white",children:Object(m.jsxs)("g",{transform:"translate(4 4)",children:[Object(m.jsx)("circle",{r:"4",fill:"black"}),Object(m.jsx)("circle",{r:"2",fill:"white"})]})}):null};function F(e){var t=e.plot,n=e.lineName;return Object(m.jsx)(y.a,{width:"100%",height:"100%",children:Object(m.jsxs)(_.a,{width:500,height:300,data:t.data,margin:{top:5,right:30,left:20,bottom:5},children:[Object(m.jsx)(N.a,{strokeDasharray:"3 3"}),Object(m.jsx)($.a,{type:"number",dataKey:"x",domain:[t.min-5,t.max+5]}),Object(m.jsx)(C.a,{}),Object(m.jsx)(w.a,{}),Object(m.jsx)(k.a,{}),Object(m.jsx)(M.a,{name:n,type:"monotone",dataKey:"y",stroke:"#8884d8",dot:Object(m.jsx)(S,{})})]})})}var q=n(28),D={data:["10;0.17365","20;0.34202","30;0.5","40;0.64279","50;0.76604","60;0.86603"],value:23};function E(){var e=Object(c.useState)({text:D.data.join("\n"),result:void 0,value:D.value,table:[],plot:{data:[],step:100,origin:[],min:0,max:70}}),t=Object(x.a)(e,2),n=t[0],r=t[1],a=Object(c.useRef)();return Object(c.useEffect)((function(){return a.current.click()}),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{children:"1. \u0418\u043d\u0442\u0435\u0440\u043f\u043e\u043b\u044f\u0446\u0438\u044f"}),Object(m.jsx)("h2",{children:"\u041c\u0435\u0442\u043e\u0434 \u0440\u0430\u0437\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0445 \u0440\u0430\u0437\u043d\u043e\u0441\u0442\u0435\u0439"}),Object(m.jsx)("span",{children:I(5)}),Object(m.jsxs)("div",{className:"ex3_container",children:[Object(m.jsxs)("div",{className:"ex3_container__input",children:[Object(m.jsx)("p",{children:"\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435:"}),Object(m.jsx)(g,{text:n.text,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{text:e.target.value})}))}}),Object(m.jsx)("div",{children:Object(m.jsxs)("label",{children:["f(",Object(m.jsx)("input",{type:"text",value:n.value,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{value:e.target.value})}))}}),") = ",void 0===n.result?"<\u043d\u0435 \u0440\u0430\u0441\u0447\u0438\u0442\u0430\u043d\u043e>":p(n.result,5)]})}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{ref:a,onClick:function(e){try{for(var t=v(n.text),c=new b(t.map((function(e){return e.y}))),a=O(n.value,t,c),i=[],j=0,l=t.map((function(e){return Number(e.x)}))||[],x=0;x<l.length-1;x++)for(var u=Math.abs(l[x]-l[x+1])/10,o=l[x],h=l[x+1];o<h+u||j>1e4;)i.push({x:o,y:O(o,t,c),visible:l.indexOf(o)>=0}),o+=u,j++;r((function(e){return Object(s.a)(Object(s.a)({},e),{},{result:a,table:c.getTable(),plot:{data:[].concat(i),step:100,min:l[0],max:l[l.length-1],origin:l}})}))}catch(d){console.log("\u041f\u0440\u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0438 \u0441\u043b\u0443\u0447\u0438\u043b\u0430\u0441\u044c \u043e\u0448\u0438\u0431\u043a\u0430",d),alert("\u0423\u0432\u044b, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435\u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439 \u0435\u0449\u0435 \u0440\u0430\u0437.")}},children:"\u0420\u0430\u0441\u0447\u0438\u0442\u0430\u0442\u044c!"})})]}),Object(m.jsx)("div",{className:"ex3_container__main",children:Object(m.jsx)(F,{plot:n.plot,lineName:"\u0418\u043d\u0442\u0435\u0440\u043f\u043e\u043b\u044f\u043d\u0442 P(x)"})})]}),Object(m.jsx)("div",{children:P(n.table)})]})}function I(e){for(var t="$$ P_".concat(e,"(x) = y_0 + \\Delta y_0q "),n=function(e){for(var t="q",n=1;n<e;n++)t+="(q - ".concat(n,")");return t},c=2;c<=e;c++)t+="+ \\frac{\\Delta^".concat(c,"y_0").concat(n(c),"}{").concat(c,"!}");return t+="$$",Object(m.jsx)(q.a,{children:t})}function P(e){for(var t=JSON.parse(JSON.stringify(e)),n=0;n<t.length;n++)for(var c=5-t[n].length,r=0;r<c;r++)t[n].push(null);return Object(m.jsx)("table",{children:Object(m.jsx)("tbody",{children:t.map((function(e,t){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:Object(m.jsx)(q.a,{children:"$$ \\Delta^".concat(t+1,"y_0 $$")})}),e.map((function(e,t){return e?Object(m.jsx)("td",{children:p(Number(e),5)},t):null}))]},t)}))})})}var T=n(64);function z(e,t){if(null==t)return NaN;var n=t.length,c={a:null,b:null,c:null,d:null,x:null};if(e<=t[0].x)c=t[0];else if(e>=t[n-1].x)c=t[n-1];else{for(var r=0,a=n-1;r+1<a;){var i=r+(a-r)/2;e<=t[i].x?a=i:r=i}c=t[a]}var j=e-c.x;return c.a+(c.b+(c.c/2+c.d*j/6)*j)*j}var K={data:["-100;4.06","-75;6.78","-50;9.49","-25;16.27","0;40.67","25;97.62","50;146.63","75;151.85","100;162.7"]};function L(){var e=Object(c.useState)({text:K.data.join("\n"),result:[],step:1,origin:[],eq:"",plot:{data:[],min:-100,max:100}}),t=Object(x.a)(e,2),n=t[0],r=t[1],a=Object(c.useRef)();return Object(c.useEffect)((function(){return a.current.click()}),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{children:"3. \u0421\u043f\u043b\u0430\u0439\u043d\u044b"}),Object(m.jsx)("h2",{children:"\u041a\u0443\u0431\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u043f\u043b\u0430\u0439\u043d"}),Object(m.jsxs)("div",{className:"ex2_container",children:[Object(m.jsxs)("div",{className:"ex2_container__input",children:[Object(m.jsx)("p",{children:"\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435:"}),Object(m.jsx)("textarea",{style:{width:"200px",height:"300px",fontSize:"20px"},value:n.text,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{text:e.target.value})}))}}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{ref:a,onClick:function(e){var t=function(e,t){try{for(var n=v(e),c=function(e){for(var t=[],n=[],c=0;c<e.length;c++)t.push(Number(e[c].x)),n.push(Number(e[c].y));for(var r=[],a=0;a<t.length;a++)r.push({a:null,b:null,c:null,d:null,x:null});for(var i=t.length,j=0;j<i;j++)r[j].x=t[j],r[j].a=n[j];r[0].c=r[i-1].c=0;for(var l=new Array(i-1).fill(0),s=new Array(i-1).fill(0),x=1;x<i-1;++x){var u=t[x]-t[x-1],o=t[x+1]-t[x],b=u,h=2*(u+o),d=o,O=6*((n[x+1]-n[x])/o-(n[x]-n[x-1])/u),f=b*l[x-1]+h;l[x]=-d/f,s[x]=(O-b*s[x-1])/f}for(var v=i-2;v>0;--v)r[v].c=l[v]*r[v+1].c+s[v];for(var p=i-1;p>0;--p){var m=t[p]-t[p-1];r[p].d=(r[p].c-r[p-1].c)/m,r[p].b=m*(2*r[p].c+r[p-1].c)/6+(n[p]-n[p-1])/m}var g=t[0]-t[1];return r[0].d=(r[0].c-r[1].c)/g,r[0].b=g*(2*r[0].c+r[1].c)/6+(n[0]-n[1])/g,r}(n),r=Number(n[0].x),a=Number(n[n.length-1].x),i=n.map((function(e){return Number(e.x)})),j=[];r<a+.1;)j.push({x:r,y:z(r,c),visible:i.indexOf(r)>=0}),r+=t;return{origin:Object(T.a)(n),plot:[].concat(j),equation:J(c)}}catch(l){console.log("\u041f\u0440\u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0438 \u0441\u043b\u0443\u0447\u0438\u043b\u0430\u0441\u044c \u043e\u0448\u0438\u0431\u043a\u0430",l),alert("\u0423\u0432\u044b, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435\u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439 \u0435\u0449\u0435 \u0440\u0430\u0437.")}}(n.text,n.step);r((function(e){return Object(s.a)(Object(s.a)({},e),{},{plot:Object(s.a)(Object(s.a)({},e.plot),{},{data:Object(T.a)(t.plot)}),origin:Object(T.a)(t.origin),eq:t.equation})}))},children:"\u0420\u0430\u0441\u0447\u0438\u0442\u0430\u0442\u044c!"})})]}),Object(m.jsxs)("div",{className:"ex2_container__main",children:[Object(m.jsx)("div",{style:{height:"300px"},children:Object(m.jsx)(F,{lineName:"\u041a\u0443\u0431\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u043f\u043b\u0430\u0439\u043d S(x)",plot:n.plot})}),Object(m.jsx)("div",{children:Object(m.jsx)(q.a,{children:n.eq})})]})]})]})}function J(e){for(var t=function(e,t){return e<0||t?"+"+Math.abs(e):e>0?"-"+Math.abs(e):""},n=function(e,n){var c=e.a,r=e.b,a=e.c,i=e.d,j=e.x;return"".concat(p(c,5)).concat(t(p(r,5),"+"),"\\left(x").concat(t(j),"\\right)").concat(t(p(a/2,5),"+"),"\\left(x").concat(t(j),"\\right)^2").concat(t(p(i/6,5),"+"),"\\left(x").concat(t(j),"\\right)^3,x\\in\\left[").concat(j,",").concat(n,"\\right] \\\\  ")},c="",r=0;r<e.length-1;r++)c+=n(e[r],e[r+1].x);return"$$\n    S(x)=\\begin{cases} \n        ".concat(c,"\n    \\end{cases}\n    $$")}function R(e,t,n,c,r){var a=e[n].x,i=e[c].x,j=e[r].x;return(2*e[t].x-i-j)/((a-i)*(a-j))*e[n].y+(2*e[t].x-a-j)/((i-a)*(i-j))*e[c].y+(2*e[t].x-a-i)/((j-a)*(j-i))*e[r].y}function U(e,t){return 0===t?R(e,t,t,t+1,t+2):t===e.length-1?R(e,t,t-2,t-1,t):R(e,t,t-1,t,t+1)}function A(e,t){var n=function(e,t){for(var n=t.map((function(e){return e.x})),c=n[0],r=Math.abs(e-c),a=0,i=0;i<n.length;i++){var j=Math.abs(e-n[i]);j<r&&(r=j,c=n[i],a=i)}return a}(e,t);return n===t.length-1?n=t.length-3:0===n?n=1:n+=-1,function(e,t,n,c){for(var r=0,a=0;a<c;a++){for(var i=1,j=0;j<c;j++)a!==j&&(i*=(e-n[j+t].x)/(n[a+t].x-n[j+t].x));r+=i*n[a+t].y}return r}(e,n,t,3)}var B={data:["0;0","5.01;0.18","10.09;1.05","13.98;1.73","16.62;2.35","18.01;2.96","22.53;3.76","25.33;4.48","28.03;5.28","30.42;6.12","32.06;7.09","33.62;8"]};function X(){var e=Object(c.useState)({text:B.data.join("\n"),result:[],plot:{data:[],min:10,max:90}}),t=Object(x.a)(e,2),n=t[0],r=t[1],a=Object(c.useRef)();return Object(c.useEffect)((function(){return a.current.click()}),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{children:"3. \u0427\u0438\u0441\u043b\u0435\u043d\u043d\u043e\u0435 \u0434\u0438\u0444\u0444\u0435\u0440\u0435\u043d\u0446\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"}),Object(m.jsx)("h2",{children:"\u0424\u043e\u0440\u043c\u0443\u043b\u044b \u043a\u043e\u043d\u0435\u0447\u043d\u044b\u0445 \u0440\u0430\u0437\u043d\u043e\u0441\u0442\u0435\u0439"}),Object(m.jsx)(q.a,{children:" \u041e\u0431\u0449\u0430\u044f \u0444\u043e\u0440\u043c\u0443\u043b\u0430: $$ {P}'(x)= \\frac{2x - x_1 - x_2} {(x_0-x_1)(x_0-x_2)}y_0 + \\frac{2x - x_0 - x_2}   {(x_1-x_0)(x_1-x_2)}y_1 + \\frac{2x - x_0 - x_1}   {(x_2-x_0)(x_2-x_2)}y_2$$"}),Object(m.jsxs)("div",{className:"ex3_container",children:[Object(m.jsxs)("div",{className:"ex3_container__input",children:[Object(m.jsx)("p",{children:"\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435:"}),Object(m.jsx)("textarea",{style:{width:"200px",height:"300px",fontSize:"20px"},value:n.text,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{text:e.target.value})}))}}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{ref:a,onClick:function(e){try{for(var t=function(e){for(var t=v(e),n=[],c=0;c<t.length;c++){var r=U(t,c);n.push({x:t[c].x,y:t[c].y,fx:p(r,6)})}return n}(n.text),c=t.map((function(e){return Number(e.x)})),a=t.map((function(e){return{x:e.x,y:e.y}})),i=t.map((function(e){return{x:e.x,y:e.fx}})),j=0,l=[],x=0;x<t.length-1;x++)for(var u=Math.abs(t[x].x-t[x+1].x)/5,o=t[x].x,b=t[x+1].x;o<b+u||j>1e4;){var h=p(o,3);l.push({x:h,y:A(h,a),fx:A(h,i),visible:c.indexOf(h)>=0}),o+=u,j++}r((function(e){return Object(s.a)(Object(s.a)({},e),{},{result:Object(T.a)(t),plot:{data:[].concat(l),min:c[0],max:c[c.length]}})}))}catch(d){console.log("\u041f\u0440\u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0438 \u0441\u043b\u0443\u0447\u0438\u043b\u0430\u0441\u044c \u043e\u0448\u0438\u0431\u043a\u0430",d),alert("\u0423\u0432\u044b, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435\u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439 \u0435\u0449\u0435 \u0440\u0430\u0437.")}},children:"\u0420\u0430\u0441\u0447\u0438\u0442\u0430\u0442\u044c \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u043d\u044b\u0435!"})})]}),Object(m.jsxs)("div",{className:"ex3_container__main",style:{display:"flex",flexDirection:"row"},children:[Object(m.jsx)("div",{children:Object(m.jsx)("table",{children:Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"X"}),Object(m.jsx)("td",{children:"Y"}),Object(m.jsx)("td",{children:"f`(x)"})]}),n.result.map((function(e,t){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:e.x}),Object(m.jsx)("td",{children:e.y}),Object(m.jsx)("td",{children:e.fx})]},t)}))]})})}),Object(m.jsx)(y.a,{width:"80%",height:"50%",children:Object(m.jsxs)(_.a,{width:500,height:300,data:n.plot.data,margin:{top:5,right:30,left:20,bottom:5},children:[Object(m.jsx)(N.a,{strokeDasharray:"3 3"}),Object(m.jsx)($.a,{type:"number",dataKey:"x",domain:[Math.ceil(n.plot.min)-5,Math.ceil(n.plot.max+5)]}),Object(m.jsx)(C.a,{}),Object(m.jsx)(w.a,{}),Object(m.jsx)(k.a,{}),Object(m.jsx)(M.a,{name:"f(x)",type:"monotone",dataKey:"y",stroke:"#8884d8",dot:Object(m.jsx)(S,{})}),Object(m.jsx)(M.a,{name:"f`(x)",type:"monotone",dataKey:"fx",stroke:"#ff7300",dot:Object(m.jsx)(S,{})})]})})]})]})]})}var Y=n(168),G={2:[[1,-.577350269189626],[1,.577350269189626]],3:[[.888888888888889,0],[.555555555555556,-.774596669241483],[.555555555555556,.774596669241483]],4:[[.652145154862546,-.339981043584856],[.652145154862546,.339981043584856],[.347854845137454,-.861136311594053],[.347854845137454,.861136311594053]],5:[[.568888888888889,0],[.478628670499367,-.538469310105683],[.478628670499367,.538469310105683],[.236926885056189,-.906179845938664],[.236926885056189,.906179845938664]],6:[[.360761573048139,.661209386466264],[.360761573048139,-.661209386466264],[.467913934572691,-.238619186083197],[.467913934572691,.238619186083197],[.17132449237917,-.932469514203152],[.17132449237917,.932469514203152]],7:[[.417959183673469,0],[.381830050505119,.405845151377397],[.381830050505119,-.405845151377397],[.279705391489277,-.741531185599394],[.279705391489277,.741531185599394],[.12948496616887,-.949107912342758],[.12948496616887,.949107912342758]],8:[[.1012285363,.9602898565],[.2223810345,.7966664774],[.3137066459,.5255324099],[.3626837834,.1834346425],[.3626837834,-.1834346425],[.3137066459,-.5255324099],[.2223810345,-.7966664774],[.1012285363,-.9602898565]],9:[[.0812743884,.9681602395],[.1806481607,.8360311073],[.2606106964,.6133714327],[.312347077,.3242534234],[.330239355,0],[.312347077,-.3242534234],[.2606106964,-.6133714327],[.1806481607,-.8360311073],[.0812743884,-.9681602395]],10:[[.0666713443,.9739065285],[.1494513492,.8650633667],[.2190863625,.6794095683],[.2692667193,.4333953941],[.2955242247,.148874339],[.2955242247,-.148874339],[.2692667193,-.4333953941],[.2190863625,-.6794095683],[.1494513492,-.8650633667],[.0666713443,-.9739065285]]};n(319);var H=new Y.a;function Q(){var e=Object(c.useState)({fn:"sin(x)",a:"0",b:"pi",n:10,aeval:0,beval:0,round:0,result:[],graph:[]}),t=Object(x.a)(e,2),n=t[0],r=t[1],a=Object(c.useRef)();Object(c.useEffect)((function(){return a.current.click()}),[]);var i=function(e){var t,c=e.fn,a=e.a,i=e.b;e.round;try{var j=H.parse(c),l=H.parse(a.toUpperCase()),x=H.parse(i.toUpperCase()),u=l.evaluate(),o=x.evaluate(),b=[],h=Z(n.n,2,10),d=function(e,t,n,c){for(var r=0,a=G[c],i=0;i<c;i++)r+=a[i][0]*e(((n-t)*a[i][1]+n+t)/2);return r*((n-t)/2)}((t=j,function(e){return t.evaluate({x:e})}),u,o,h);b.push({id:h,val:d});for(var O=0,f=(o-u)/100,v=[];u<=o||O<1e4;)v.push({x:u,y:j.evaluate({x:u})}),u+=f,O++;r((function(e){return Object(s.a)(Object(s.a)({},e),{},{result:[].concat(b),graph:[].concat(v),aeval:u,beval:o})}))}catch(p){console.log("\u041f\u0440\u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0438 \u0441\u043b\u0443\u0447\u0438\u043b\u0430\u0441\u044c \u043e\u0448\u0438\u0431\u043a\u0430",p),alert("\u0423\u0432\u044b, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435\u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439 \u0435\u0449\u0435 \u0440\u0430\u0437.")}};return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{children:"4. \u0427\u0438\u0441\u043b\u0435\u043d\u043d\u043e\u0435 \u0438\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"}),Object(m.jsx)("h2",{children:"\u041a\u0432\u0430\u0434\u0440\u0430\u0442\u0443\u0440\u044b \u0413\u0430\u0443\u0441\u0441\u0430"}),Object(m.jsx)(q.a,{children:"$$ I = \\int_{a}^{b}f(x)dx = \\sum_{i=0}^{n}w_if(x_i) $$"}),Object(m.jsxs)("div",{children:[Object(m.jsx)(W,{label:"f(x)=",value:n.fn,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{fn:e})}))}}),Object(m.jsx)(W,{label:"a=",value:n.a,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{a:e})}))}}),Object(m.jsx)(W,{label:"b=",value:n.b,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{b:e})}))}}),Object(m.jsxs)("label",{style:{marginLeft:"10px"},children:["\u041e\u043a\u0440\u0443\u0433\u043b\u044f\u0442\u044c \u0434\u043e:",Object(m.jsxs)("select",{name:"select",onChange:function(e){var t=parseInt(e.target.value);r((function(e){return Object(s.a)(Object(s.a)({},e),{},{round:t})}))},value:n.round,children:[Object(m.jsx)("option",{value:"0",children:"\u041d\u0435 \u043e\u043a\u0440\u0443\u0433\u043b\u044f\u0442\u044c"}),Object(m.jsx)("option",{value:"2",children:"2 \u0437\u043d\u0430\u043a\u043e\u0432"}),Object(m.jsx)("option",{value:"3",children:"\u0417 \u0437\u043d\u0430\u043a\u043e\u0432"}),Object(m.jsx)("option",{value:"5",children:"5 \u0437\u043d\u0430\u043a\u043e\u0432"}),Object(m.jsx)("option",{value:"8",children:"8 \u0437\u043d\u0430\u043a\u043e\u0432"})]})]}),Object(m.jsx)(W,{label:"n=",value:n.n,onChange:function(e){return r((function(t){return Object(s.a)(Object(s.a)({},t),{},{n:Number(e)})}))}})]}),Object(m.jsx)("button",{ref:a,style:{marginLeft:"5px",marginTop:"20px"},onClick:function(){return i(n)},children:"\u0420\u0430\u0441\u0447\u0438\u0442\u0430\u0442\u044c!"}),Object(m.jsx)("h3",{children:"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u044b \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f:"}),Object(m.jsx)("hr",{}),Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{children:n.result.map((function(e){var t=n.a,c=n.b,r=n.round,a=p(V(t,c)[0],r),i=p(V(t,c)[0],r),j=p(V(n.a,n.b)[1],r),l=p(e.val,r);return Object(m.jsx)(q.a,{children:"$$ I = ".concat(a,"\\sum_{i=0}^{").concat(e.id,"}{w_if\\left(").concat(i,"z_i+").concat(j,"\\right)} =").concat(l," $$ ")},e.id)}))}),Object(m.jsx)("div",{children:Object(m.jsx)("table",{children:Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:Object(m.jsx)(q.a,{children:"$$ w_i $$"})}),Object(m.jsx)("td",{children:Object(m.jsx)(q.a,{children:"$$ z_i $$"})})]}),G[Z(n.n,2,10)].map((function(e,t){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:e[1]}),Object(m.jsx)("td",{children:e[0]})]},t)}))]})})})]})]})}function V(e,t){var n=[H.parse(e.toUpperCase()).evaluate(),H.parse(t.toUpperCase()).evaluate()];return console.log(n),[(n[1]-n[0])/2,(n[1]+n[0])/2]}function W(e){var t=e.label,n=e.value,c=e.onChange;return Object(m.jsxs)("label",{children:[t,Object(m.jsx)("input",{type:"text",value:n,onChange:function(e){return c(e.target.value)}})]})}function Z(e,t,n){return Math.min(Math.max(e,t),n)}function ee(){return Object(m.jsx)(m.Fragment,{})}var te=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(j.a,{children:[Object(m.jsxs)("div",{children:[Object(m.jsxs)("ul",{children:[Object(m.jsx)("li",{children:Object(m.jsx)(j.b,{to:"/ex1",children:"1.\u0417\u0430\u0434\u0430\u0447\u0430 1.2"})}),Object(m.jsx)("li",{children:Object(m.jsx)(j.b,{to:"/ex2",children:"2.\u0417\u0430\u0434\u0430\u0447\u0430 2.2"})}),Object(m.jsx)("li",{children:Object(m.jsx)(j.b,{to:"/ex3",children:"3.\u0417\u0430\u0434\u0430\u0447\u0430 3.2"})}),Object(m.jsx)("li",{children:Object(m.jsx)(j.b,{to:"/ex4",children:"4.\u0417\u0430\u0434\u0430\u0447\u0430 4.3"})})]}),Object(m.jsx)("hr",{})]}),Object(m.jsxs)(l.c,{children:[Object(m.jsx)(l.a,{path:"/ex1",element:Object(m.jsx)(E,{})}),Object(m.jsx)(l.a,{path:"/ex2",element:Object(m.jsx)(L,{})}),Object(m.jsx)(l.a,{path:"/ex3",element:Object(m.jsx)(X,{})}),Object(m.jsx)(l.a,{path:"/ex4",element:Object(m.jsx)(Q,{})}),Object(m.jsx)(l.a,{path:"/",element:Object(m.jsx)(ee,{})})]})]})})},ne=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,328)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(te,{})}),document.getElementById("root")),ne()}},[[320,1,2]]]);
//# sourceMappingURL=main.05d437fe.chunk.js.map