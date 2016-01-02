var _ = require('underscore');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) 
{
	var availableFunctions = _.functions(_);
	console.log('Available Underscore Functions: ' + JSON.stringify(availableFunctions));
	response.success("Hello world!");
});

/*
interface:

updateDB
getSkillCategories
getListOfSkillsAndTimes
getTimelineOfProjects
getProjects

response.success(returnArray);
					  	},
					  	error: function(skillCategoryObject, error) 
					  	{
					    	console.log('Failed to create new object, with error code: ' + error);
					    	response.error("Failed at categories");

*/

var processedData;
var allProjects = [];



    /*(
    {
    	success: function(results) 
        {
        	

	       	processedData(dataType);
        },
        error: function(error) 
        {
        	//response.error("Error in updateDB: " + error.code + " " + error.message);
        }
    });
});*/

/*
{"skills":[{"category":"Design","hours":100,"skillName":"Flash"},
{"category":"Design","hours":100,"skillName":"Photoshop"},
{"category":"Design","hours":250,"skillName":"Game Design"},
{"category":"Programming","hours":250,"skillName":"Pipeline Design"},
{"category":"Audio","hours":300,"skillName":"Cubase"},
{"category":"Audio","hours":100,"skillName":"MIDI"},
{"category":"Programming","hours":50,"skillName":"LUA"},
{"category":"Programming","hours":50,"skillName":"C/C++"},
{"category":"Audio","hours":200,"skillName":"Drumming"},
{"category":"Project","hours":100,"skillName":"Excel"}]}
*/


function fetchCategoriesAndTimes()
{
	processedData = [];

	var previousCategoryNames = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var skillsUsed = allProjects[i].get("SkillsUsed");
		for(var j = 0; j < skillsUsed.skills.length; j++)
		{
			var skill = skillsUsed.skills[j];

			var index = _.indexOf(previousCategoryNames, skill.category);

        	if(index === -1)
        	{
        		previousCategoryNames.push(skill.category);
        		var categoryAndTime = {category : skill.category, hours: skill.hours};
        		processedData.push(categoryAndTime);
        	}
        	else
        	{
        		processedData[index].hours += skill.hours;
        	}
		}
	}
}

function fetchSkillsAndTimes(categoryFilter)
{
	processedData = [];

	var previousSkillNames = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var skillsUsed = allProjects[i].get("SkillsUsed");

		for(var j = 0; j < skillsUsed.skills.length; j++)
		{
			var skill = skillsUsed.skills[j];

			if(typeof(categoryFilter) != 'undefined' && categoryFilter != skill.category)
			{
				console.log("moving along..." + categoryFilter + skill.category);
				continue;
			}
				

			var index = _.indexOf(previousSkillNames, skill.skillName);

        	if(index === -1)
        	{
        		previousSkillNames.push(skill.skillName);
        		var skillAndTime = {skillName : skill.skillName, hours: skill.hours};
        		processedData.push(skillAndTime);
        	}
        	else
        	{
        		processedData[index].hours += skill.hours;
        	}
		}
	}

	processedData = _.sortBy(processedData, 'hours').reverse();	
}

function fetchProjectsAndTimes()
{
	processedData = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var project = allProjects[i];
        processedData.push(project);
	}
}

/*

function drawProjectsOnTimeLine(lineLength)
    {
        var barHeight = 10;
        var currentY = canvas.height-200;
        var xStart = 10;

        // first just sort by start time and sort in y

        allProjects = _.sortBy(allProjects, 'StartDate');
 
        var firstDate = _.first(allProjects).get("StartDate");
        var lastDate  = new Date();

        var totalNumMonths = getNumberOfMonths(firstDate, lastDate);
        var oneMonthLength = lineLength/totalNumMonths;

        // year lines
        var monthCount = 0;

        // calculate properly from 1st
        var year = 2004;

        while(monthCount < totalNumMonths)
        {
            var path = new Path();
            path.strokeColor = 'black';
            path.fillColor = 'white';
            var xPos = xStart+(monthCount*oneMonthLength);
            // hack in time offset - calculate properly in the future!
            var yLen = ((monthCount+6) % 12) ? 2 : 5; 

            if(yLen == 5) // on a year border, label
            {
                var yearLabel = new PointText(new Point(xPos-14, currentY+24));
                yearLabel.fillColor = 'black';
                yearLabel.content = year;
                yearLabel.rotate(90);
                year++;
            }
            path.add(new Point(xPos, currentY)); 
            path.add(new Point(xPos, currentY+yLen));

            monthCount++;
        }

        _.each(allProjects, function(project) 
        {
            var lengthInMonths = getNumberOfMonths(project.get("StartDate"), project.get("EndDate"));
            var lengthInLine = lengthInMonths*oneMonthLength;
            var lengthInMonthsSinceBeginning = getNumberOfMonths(firstDate, project.get("StartDate"));
            var xOffset = xStart + lengthInMonthsSinceBeginning*oneMonthLength;
        });
    }

*/

function getNumberOfMonths(from, to) 
{
    var months;
    months = (to.getFullYear() - from.getFullYear()) * 12;
    months -= from.getMonth() + 1;
    months += to.getMonth();
    return months <= 0 ? 0 : months;
}

function fetchTimeline()
{
	var firstDate = _.first(allProjects).get("StartDate");
    var lastDate  = new Date();
	var totalNumMonths = getNumberOfMonths(firstDate, lastDate);

	var startYear = 2004;
}


function processData(params)
{
	if(params.dataType === "project")
	{
		fetchProjectsAndTimes();
	}
	else if(params.dataType === "categories")
	{
		fetchCategoriesAndTimes();
	}
	else if(params.dataType === "skills")
	{
		console.log("********** params: " + params);
		fetchSkillsAndTimes(params.categoryFilter);
	}
	else if(params.dataType === "timeline")
	{
		fetchTimeline();
	}
}

Parse.Cloud.define("getDataOfType", function(request, response)
{
	var query = new Parse.Query("Projects");
    query.ascending("StartDate");
	query.limit(6);

    query.find().then(

    	function (results)
    	{
    		for (var i = 0; i < results.length; i++) 
            {
            	allProjects.push(results[i]);
            }
    	},
    	function (error)
    	{
    		console.log("error1");
    	}
    ).then(
    	function (results)
    	{
    		processData(request.params);
    	},
    	function (error)
    	{
    		response.error("fuuuuuck");
    	}
    ).then(
    	function (results)
    	{
    		response.success(processedData);
    	},
    	function (error)
    	{
    		response.error("fuuuuuckend");
    	}
    );
});





