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

function fetchSkillsAndTimes(filter)
{
	processedData = [];

	var previousSkillNames = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var skillsUsed = allProjects[i].get("SkillsUsed");

		for(var j = 0; j < skillsUsed.skills.length; j++)
		{
			var skill = skillsUsed.skills[j];

			if(typeof(filter) != 'undefined' && filter != skill.category)
			{
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

function fetchProjectsAndTimes(filter)
{
	processedData = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var project = allProjects[i];
		
		if(typeof(filter) != 'undefined' && filter != project.get("Status"))
		{
			continue;
		}
		else
		{
			processedData.push(project);
		}
	}
}

function fetchSingleProjectDetail(filter)
{
	processedData = undefined;

	_.each(allProjects, function(project) 
    {
    	if(project.get("Name") === filter)
    	{	
    		processedData = project;
    		return;
    	}
    });
}

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
		fetchProjectsAndTimes(params.filter);
	}
	else if(params.dataType === "projectDetail")
	{
		fetchSingleProjectDetail(params.filter);
	}
	else if(params.dataType === "categories")
	{
		fetchCategoriesAndTimes();
	}
	else if(params.dataType === "skills")
	{
		fetchSkillsAndTimes(params.filter);
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

	console.log("*****************");
    query.find().then(

    	function (results)
    	{
    		for (var i = 0; i < results.length; i++) 
            {
            	// chop down date into simple format
            	//var d = new Date(results[i].get("StartDate"));
            	//var e = d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + (d.getUTCDate());
            	//console.log(results[i].get("StartDate").getTimezoneOffset());
            	//results[i].set("StartDate", e);
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





