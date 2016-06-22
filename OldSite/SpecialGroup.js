<html>
<head>
<script>

'use strict';

var SpecialGroup = function(width, height) 
{
    this.width = width;
    this.height = height;
    this.name = "SpecialGroup";

    this.inheritsFrom(Group, this);
}

SpecialGroup.prototype.printName = function() 
{
    console.log(this.name + this.width + this.height);
}

var inheritsFrom = function (child, parent) 
{
    child.prototype = Object.create(parent.prototype);
};

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

</script><body onLoad="include('some-other-file.html');">