// For review 

window.onload = function(){


    // Draw the interface (rectangle, lines and texts)

    var p = Raphael("paper", 800, 800)
        
    var xmax = 600;
    var ymax = 500;
    var compteur = 0;
            
    p.rect(0, 0, xmax, ymax, 20)
        .attr({
            "stroke-width": 2
        });

    var lineUp = p.path("M 0,200 L 600,200");
    var lineDwn = p.path("M 0,300 L 600,300");

    p.text(xmax/2, 20, "Zone cible")
        .attr({
            "font-size" : 32
        });

    p.text(xmax/2, ymax/2-30, "Compteur")
        .attr({
            "font-family" : "Georgia",
            "font-size" : 12
        });

    compteurTxt = p.text(xmax/2, ymax/2+10, compteur)
        .attr({
            "font-size" : 32
        });


    // Draw the circles and grid for placement

    Raphael.fn.circ = function(x, y){
        return this.circle(x, y, 20).attr({
            fill: "#539680",
            stroke: "hsb(0.6, 0.7, 0.9",
            "stroke-width": 5,
            "stroke-opacity": 0.5
            });
        };
    var redcirclegrid =  [{cx:90, cy:70, placeh:0}, {cx:90, cy:130, placeh:0}, 
                        {cx:150, cy:70, placeh:0}, {cx:150, cy:130, placeh:0}, 
                        {cx:210, cy:70, placeh:0}, {cx:210, cy:130, placeh:0}, 
                        {cx:270, cy:70, placeh:0}, {cx:270, cy:130, placeh:0},
                        {cx:330, cy:70, placeh:0}, {cx:330, cy:130, placeh:0},
                        {cx:390, cy:70, placeh:0}, {cx:390, cy:130, placeh:0},
                        {cx:450, cy:70, placeh:0}, {cx:450, cy:130, placeh:0},
                        {cx:510, cy:70, placeh:0}, {cx:510, cy:130, placeh:0}];
    var grcirclegrid =  [{cx:90, cy:370, placeh:1}, {cx:90, cy:430, placeh:1}, 
                        {cx:150, cy:370, placeh:1}, {cx:150, cy:430, placeh:1}, 
                        {cx:210, cy:370, placeh:1}, {cx:210, cy:430, placeh:1}, 
                        {cx:270, cy:370, placeh:1}, {cx:270, cy:430, placeh:1},
                        {cx:330, cy:370, placeh:1}, {cx:330, cy:430, placeh:1},
                        {cx:390, cy:370, placeh:1}, {cx:390, cy:430, placeh:1},
                        {cx:450, cy:370, placeh:1}, {cx:450, cy:430, placeh:1},
                        {cx:510, cy:370, placeh:1}, {cx:510, cy:430, placeh:1}];
    var circlenames = []; 

    for (i = 0; i < 16; i++) { 
        circlenames[i] = "circ" + (i +1);
        circlenames[i] = p.circ(grcirclegrid[i].cx, grcirclegrid[i].cy);
    };


    // Drag and drop

    var move = function(dx, dy){ /*move*/
            if (this.attr("cx") > 580 || this.attr("cy") > 480)
                this.attr({cx: this.ox+dx, cy: this.oy+dy}); 
            else {
                nowX = Math.min(580, this.ox + dx);
                nowY = Math.min(480, this.oy + dy);
                nowX = Math.max(20, nowX);
                nowY = Math.max(20, nowY);   
                this.attr({cx: nowX, cy: nowY });
            }
        },
        start = function(x, y){ /*drag start*/
            this.ox=this.attr("cx"); 
            this.oy=this.attr("cy");
        },  
        end = function(){ /*ends*/
            if(this.oy > 319 && this.attr("cy") < 180){
                for (i = 0; i < 16; i++) { 
                    console.log(redcirclegrid);
                    console.log(grcirclegrid);
                    if(redcirclegrid[i].placeh==0){
                        this.attr({cx: redcirclegrid[i].cx, cy: redcirclegrid[i].cy});
                        this.animate({"fill": "red"});
                        redcirclegrid[i].placeh = 1;
                        break;
                    };
                };
                for (i = 0; i < 16; i++) { 
                    if((this.ox == grcirclegrid[i].cx) && (this.oy == grcirclegrid[i].cy)){
                        grcirclegrid[i].placeh = 0;
                        break;
                    }
                };
                compteur += 1;
                compteurTxt.attr("text", compteur);
            } else if(this.oy < 180 && this.attr("cy") > 319){
                
                for (i = 0; i < 16; i++) { 
                    if(grcirclegrid[i].placeh==0){
                        this.attr({cx: grcirclegrid[i].cx, cy: grcirclegrid[i].cy});
                        this.animate({"fill": "green"});
                        grcirclegrid[i].placeh = 1;
                        break;
                    };
                };
                for (i = 0; i < 16; i++) { 
                    if((this.ox == redcirclegrid[i].cx) && (this.oy == redcirclegrid[i].cy)){
                        redcirclegrid[i].placeh = 0;
                        break;
                    }
                };
                compteur -= 1;
                compteurTxt.attr("text", compteur);
            } else this.attr({cx: this.ox, cy: this.oy});

        };

    for (i = 0; i < 16; i++) { 
        circlenames[i].drag(move, start, end);
    }
   
};
