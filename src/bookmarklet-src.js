/*Super-Light-FPS-Counter-with-Jank-vision.BSD-License.Github:puppybits*/

(function(g) {
    var w=window,
    d=document,
    b=d.body,
    s=d.createElement('script'),
    e=d.createElement('div'),
    t=d.createElement('div'),
    m=d.createElement('div'),
    c=d.createElement('style'),
    done=function(){e.setAttribute('class','');};
    c.innerHTML="@-webkit-keyframes blink { 0%{opacity:1;} 75%{opacity:1;} 100%{opacity:0} } @keyframes blink { 0%{opacity:1;} 75%{opacity:1;} 100%{opacity:0} } #jank.show{display:block !important; -webkit-animation:blink 4.5s; animation:blink 4.5s;}";
    s.onload=function(){
        e.setAttribute('id','jank');
        e.setAttribute('class','show');
        e.setAttribute('style','display:none;position:fixed;overflow:hidden;top:0;left:0;width:'+w.innerWidth+'px;height:'+w.innerHeight+'px;transform:translateZ(0);-webkit-transform:translateZ(0);color:#F00;z-index:999999;background-color:rgba(256,0,0,0.1);');
        t.setAttribute('style','font:70px Avenir-Black,Arial-Bold,san-serif;text-align:center;line-height:0.7;margin-top:'+((w.innerHeight/2)-35)+'px;');
        t.innerHTML='JANK';
        m.setAttribute('style','font:18px Avenir-Book,Arial,san-serif;text-align:center;');
        e.appendChild(t);
        e.appendChild(m);
        b.appendChild(e);
        e.addEventListener("webkitAnimationEnd", done, false);
        e.addEventListener("animationend", done, false);
        (function r(c)
        {
            var fps = window.counts(c, true);
            if(fps && (fps.fps <= 55 || fps.max > 90))
            {
                m.innerHTML = 'fps: '+fps.fps.toFixed(2)+
                    ' | max: '+fps.max.toFixed(2)+'ms'+
                    ' | avg: '+fps.mean.toFixed(2)+'ms ';
                e.setAttribute('class','show');
            }
            window.requestAnimationFrame(r);
        }(0));
    };
    s.setAttribute('src', g);
    b.appendChild(c);
    b.appendChild(s);
})('https://raw.github.com/puppybits/Jank-Vision/master/src/counts.js')
