/* PatienceDiff
https://github.com/jonTrent/PatienceDiff */
function patienceDiff(e,n,t){function l(e,n,t){let l=new Map;for(let d=n;d<=t;d++){let i=e[d];l.has(i)?(l.get(i).count++,l.get(i).index=d):l.set(i,{count:1,index:d})}return l.forEach((e,n,t)=>{1!==e.count?t.delete(n):t.set(n,e.index)}),l}function d(e,n,t,d,i,o){let u=l(e,n,t),x=l(d,i,o);return u.forEach((e,n,t)=>{x.has(n)?t.set(n,{indexA:e,indexB:x.get(n)}):t.delete(n)}),u}let i=[],o=0,u=0,x=[],f=[],h=[],r=[];function s(t,l){l<0?(x.push(e[t]),f.push(i.length),o++):t<0&&(h.push(n[l]),r.push(i.length),u++),i.push({line:0<=t?e[t]:n[l],aIndex:t,bIndex:l})}function $(t,l,i,o){for(;t<=l&&i<=o&&e[t]===n[i];)s(t++,i++);let u=l;for(;t<=l&&i<=o&&e[l]===n[o];)l--,o--;let x=d(e,t,l,n,i,o);if(0===x.size){for(;t<=l;)s(t++,-1);for(;i<=o;)s(-1,i++)}else a(t,l,i,o,x);for(;l<u;)s(++l,++o)}function a(t,l,i,o,u){let x=function e(n){let t=[];n.forEach((e,n,l)=>{let d=0;for(;t[d]&&t[d][t[d].length-1].indexB<e.indexB;)d++;t[d]||(t[d]=[]),0<d&&(e.prev=t[d-1][t[d-1].length-1]),t[d].push(e)});let l=[];if(0<t.length){let d=t.length-1;for(l=[t[d][t[d].length-1]];l[l.length-1].prev;)l.push(l[l.length-1].prev)}return l.reverse()}(u||d(e,t,l,n,i,o));if(0===x.length)$(t,l,i,o);else{(t<x[0].indexA||i<x[0].indexB)&&$(t,x[0].indexA-1,i,x[0].indexB-1);let f;for(f=0;f<x.length-1;f++)$(x[f].indexA,x[f+1].indexA-1,x[f].indexB,x[f+1].indexB-1);(x[f].indexA<=l||x[f].indexB<=o)&&$(x[f].indexA,l,x[f].indexB,o)}}return(a(0,e.length-1,0,n.length-1),t)?{lines:i,lineCountDeleted:o,lineCountInserted:u,lineCountMoved:0,aMove:x,aMoveIndex:f,bMove:h,bMoveIndex:r}:{lines:i,lineCountDeleted:o,lineCountInserted:u,lineCountMoved:0}}function patienceDiffPlus(e,n){let t=patienceDiff(e,n,!0),l=t.aMove,d=t.aMoveIndex,i=t.bMove,o=t.bMoveIndex;delete t.aMove,delete t.aMoveIndex,delete t.bMove,delete t.bMoveIndex;let u;do{let x=l,f=d,h=i,r=o;l=[],d=[],i=[],o=[];let s=patienceDiff(x,h);u=t.lineCountMoved,s.lines.forEach((e,n)=>{0<=e.aIndex&&0<=e.bIndex?(t.lines[f[e.aIndex]].moved=!0,t.lines[r[e.bIndex]].aIndex=f[e.aIndex],t.lines[r[e.bIndex]].moved=!0,t.lineCountInserted--,t.lineCountDeleted--,t.lineCountMoved++):e.bIndex<0?(l.push(x[e.aIndex]),d.push(f[e.aIndex])):(i.push(h[e.bIndex]),o.push(r[e.bIndex]))})}while(0<t.lineCountMoved-u);return t}