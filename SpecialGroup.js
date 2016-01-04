'use strict';

var SpecialGroup = function(width, height) 
{
    this.width = width;
    this.height = height;
    this.name = "SpecialGroup";
}

SpecialGroup.prototype.printName = function() 
{
    console.log(this.name + this.width + this.height);
}


/*class SpecialGroup extends Group
    {
        constructor(width, height, color)
        {
            this.width = width;
            this.height = height;
        }
    }

    SpecialGroup.prototype = 
    {
        update: function()
        {
            Console.log("update: " + this.width + " - " + this.height);
        }
    };*/