window.counts = (function(t)
{
    var isIE = (navigator.appVersion.indexOf('Trident') ? true : false);
    var log = ( !isIE ? 
        function(fps, max, mean, delta)
        {
            console.log('%cfps:%c'+fps.toFixed(2)+
                '  %cmax:%c'+max.toFixed(2)+'ms'+
                '  %cavg:%c'+mean.toFixed(2)+'ms '+
                delta, 
                'color: black;', 'color: red;', 
                'color: black;', 'color: red;', 
                'color: black;', 'color: red;', 
                'color: black;', 'color: red;');
        }
    :
        function(fps, max, mean, delta)
        {
            console.log('fps:'+fps.toFixed(2)+
                '  max:'+max.toFixed(2)+'ms'+
                '  avg:'+mean.toFixed(2)+'ms '+
                delta);
        }
    );
    if (window.ArrayBuffer && window.Float64Array)
    {
        t = new Float64Array(new ArrayBuffer(160*16)); 
    }
    else
    {
        for(var i=160; i >= 0; i--)
        {
            t.push(0);
        }
    }
    t[0] = 1;
    
    var cur = 0, sum = 0, max = 0, thousand = 1000, sixty = 60, 
    r = {fps:null, max:null, mean:null, delta:null}, 
    mean, fps, last;
    // everything above this are static closures variables.
    return function(delta, returnFPS)
    {
        // pref: GC is minimized as much as possible by never changing the 
        // array size. Instead track the position via a cursor in at the
        // beganing of the array.
        cur = t[0];
        t[cur] = delta;
        
        // pref: adding and popping to array causes leak until GC'd. 
        // Replacing the much at an index in the array will 
        // overt the GC as much as possible.
        last = cur-1;
        sum = t[last] - t[1];
        t[0] = cur = cur + 1;
        
        // pref: only run complex calculations and ouput to console once
        // a second
        if (sum < thousand) return;
        
        mean = sum / cur;
        fps = thousand / mean;
        
        max = 0;
        while (cur > 2)
        {
            last = cur-1;
            max = Math.max(t[cur] - t[last], max);
            cur = cur - 1;
        }
        
        // reset cursor to index 1
        t[0] = 1;
        
        if (returnFPS)
        {
            r.fps = fps, r.max = max, r.mean = mean, r.delta = delta;
            return r;
        }
            
        log(fps, max, mean, delta);
    }
}([]));