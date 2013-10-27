## A super light weight FPS counter w/ Jank Vision™

Giving all developers the super power to see Jank on any device.

## Getting Started

### Everywhere

Create a bookmark and paste in the Junk code

    javascript:(function(g)%20{var%20w=window,d=document,b=d.body,s=d.createElement(%27script%27),e=d.createElement(%27div%27),t=d.createElement(%27div%27),m=d.createElement(%27div%27),c=d.createElement(%27style%27),done=function(){e.setAttribute(%27class%27,%27%27);};c.innerHTML=%22@-webkit-keyframes%20blink%20{%200%{opacity:1;}%2075%{opacity:1;}%20100%{opacity:0}%20}%20#jank.show{display:block%20!important;%20-webkit-animation:blink%204.5s;}%22;s.onload=function(){e.setAttribute(%27id%27,%27jank%27);e.setAttribute(%27class%27,%27show%27);e.setAttribute(%27style%27,%27display:none;position:fixed;overflow:hidden;top:0;left:0;width:%27+w.innerWidth+%27px;height:%27+w.innerHeight+%27px;transform:translateZ(0);-webkit-transform:translateZ(0);color:#F00;z-index:999999;background-color:rgba(256,0,0,0.1);%27);t.setAttribute(%27style%27,%27font:70px%20Avenir-Black,Arial-Bold,san-serif;text-align:center;line-height:0.7;margin-top:%27+((w.innerHeight/2)-35)+%27px;%27);t.innerHTML=%27JANK%27;m.setAttribute(%27style%27,%27font:18px%20Avenir-Book,Arial,san-serif;text-align:center;%27);e.appendChild(t);e.appendChild(m);b.appendChild(e);e.addEventListener(%22animationEnd%22,%20done,%20false);e.addEventListener(%22webkitAnimationEnd%22,%20done,%20false);(function%20r(c){var%20fps%20=%20window.counts(c,%20true);if(fps%20&&%20fps.fps%20<=%2055){m.innerHTML%20=%20%27fps:%20%27+fps.fps.toFixed(2)+%27%20|%20max:%20%27+fps.max.toFixed(2)+%27ms%27+%27%20|%20avg:%20%27+fps.mean.toFixed(2)+%27ms%20%27;e.setAttribute(%27class%27,%27show%27);}window.requestAnimationFrame(r);}(0));};s.setAttribute(%27src%27,%20g);b.appendChild(c);b.appendChild(s);})(%27https://raw.github.com/puppybits/Jank-Vision/master/src/counts.js%27)

Click on Jank  
Jank Vision will appear when Jank happens  

### In your code base

Include counts.js in your code base.
Call window.counts function inside your request animation frame funciton. Make sure to pass in the first arguments from the function to get sub-millisecond time.

    var track = function(delta)
    { 
        window.counts(delta); 
        window.requestAnimationFrame(track);
    }
    track(0);

### Helping isolate the Jank

Jank is hard to find. A lot of it is understanding how the C code in written or at least what happening undernearth in the browser. The profile tool provides wonderful insight but at the cost of massive excess in the times it displays. Mobile profile has an even larger impact when running the profiler.   

Generally is fine to turn on profiling and after recording everything see what's causing the biggest delays. But wouldn't it be wonderful if you could only turn on the profile when the frame is huge? The next best thing is to selectivly turn it when the FPS drops. (Also you should consider turning it on and off around sections of code you supect are causing issues.)

    var profile = null;
    var track = function(delta)
    {
        if (profile) 
        {
            console.profileEnd(profile);
            profile = null;
        }
        
        var fps = window.counts(delta, true); 
        
        if (fps.fps < 30 || fps.max < 90) 
        {
            profile = 'capture-'+delta;
            console.profile(profile);
        }
        
        window.requestAnimationFrame(track);
    }
    track(0);


## Details

All introspection and performance metricing tools as susceptible to the observer effect. By recording a metric will impact the actual measurement of that metric. Tools like Google Dev tools Timeline and profiler are in valuable. But can impact getting as true to life number as possible. Also aren't available across all mobile and desktop environments.

The purpose of Jank Vision is to reduce the impact of the observer effect as much as possible while allowing ease of use across all platforms and compare performance metrics as accuratly as possible. 

In order to be as performant as possible typed arrays are used for tracking and calculations are defered until after 1000ms has passed. All of the objects should be static so it will avoid the garbage collection as much as physically possible.

## Credits

Jank Vision is a bookmarklet build from the frame per second tracker in [PerfView](https://github.com/puppybits/BackboneJS-PerfView). A project to create mobile Backbone Views that are performant with high FPS and a low memory footprint.

## License 

BSD

[bookmarklet]: javascript:/*Super-Light-FPS-Counter-with-Jank-vision.BSD-License.Githib:puppybits*/(function(g)%20{var%20w=window,d=document,b=d.body,s=d.createElement(%27script%27),e=d.createElement(%27div%27),t=d.createElement(%27div%27),m=d.createElement(%27div%27),c=d.createElement(%27style%27),done=function(){e.setAttribute(%27class%27,%27%27);};c.innerHTML=%22@-webkit-keyframes%20blink%20{%200%{opacity:1;}%2075%{opacity:1;}%20100%{opacity:0}%20}%20#jank.show{display:block%20!important;%20-webkit-animation:blink%204.5s;}%22;s.onload=function(){e.setAttribute(%27id%27,%27jank%27);e.setAttribute(%27class%27,%27show%27);e.setAttribute(%27style%27,%27display:none;position:fixed;overflow:hidden;top:0;left:0;width:%27+w.innerWidth+%27px;height:%27+w.innerHeight+%27px;transform:translateZ(0);-webkit-transform:translateZ(0);color:#F00;z-index:999999;background-color:rgba(256,0,0,0.1);%27);t.setAttribute(%27style%27,%27font:70px%20Avenir-Black,Arial-Bold,san-serif;text-align:center;line-height:0.7;margin-top:%27+((w.innerHeight/2)-35)+%27px;%27);t.innerHTML=%27JANK%27;m.setAttribute(%27style%27,%27font:18px%20Avenir-Book,Arial,san-serif;text-align:center;%27);e.appendChild(t);e.appendChild(m);b.appendChild(e);e.addEventListener(%22animationEnd%22,%20done,%20false);e.addEventListener(%22webkitAnimationEnd%22,%20done,%20false);(function%20r(c){var%20fps%20=%20window.counts(c,%20true);if(fps%20&&%20fps.fps%20<=%2055){m.innerHTML%20=%20%27fps:%20%27+fps.fps.toFixed(2)+%27%20|%20max:%20%27+fps.max.toFixed(2)+%27ms%27+%27%20|%20avg:%20%27+fps.mean.toFixed(2)+%27ms%20%27;e.setAttribute(%27class%27,%27show%27);}window.requestAnimationFrame(r);}(0));};s.setAttribute(%27src%27,%20g);b.appendChild(c);b.appendChild(s);})(%27https://raw.github.com/puppybits/Jank-Vision/master/src/counts.js%27)