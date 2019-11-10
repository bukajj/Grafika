var circles = [];
var circle;
var square;
var squares = [];
var x, y, size, radius, lineWidth;
var canvas;
var ctx;
var backgroundColor = "white";
var i;
var gradient;

var rand = function(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var angleToRadian = function(angle) {
    return Math.PI/180 * angle;
}

function updateCanvas()
{
    canvas = document.getElementById( "myCanvas" );
    ctx = canvas.getContext('2d');
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect( 0, 0, canvas.width, canvas.height );
    
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0.2, "dodgerblue");
    gradient.addColorStop(0.5, "springgreen");
    gradient.addColorStop(1, "orangered");
    
    ctx.strokeStyle = gradient;
    
    for(i=0; i<100; i++)
    {
        x = rand(0, canvas.width);
        y = rand(0, canvas.height);
        radius = rand(1,40);
        lineWidth = rand(1,radius);
        
        circle = new Circle(radius, x, y, lineWidth);
        circles.push(circle);
    }
    
    for (i=0; i<100; i++)
    {
        x = rand(0, canvas.width);
        y = rand(0, canvas.height);
        size = rand(1,40); 
        lineWidth = rand(1,size/2);
        
        square = new Square(x, y, size, lineWidth);
        squares.push(square);
    }
    setTimeout(rotateSquare, 100/30);
}

function Circle(radius, x, y, lineWidth)
{
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    
    this.display = function()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, angleToRadian(360));
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

function Square(x, y, size, lineWidth)
{
    this.size = size;
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    
    this.display = function()
    {
        ctx.fillStyle = gradient;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}

function rotateSquare()
{
    ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    
    for (i=0; i<100; i++)
    {
        square = squares[i];
        ctx.save();
        ctx.rotate(angleToRadian(45));
        square.display();
        ctx.restore();
    }
    
    setTimeout(rotateSquare, 100/30);
}