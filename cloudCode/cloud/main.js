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

function fetchSkillsAndTimes()
{
	processedData = [];

	var previousSkillNames = [];

	for(var i = 0; i < allProjects.length; i++)
	{
		var skillsUsed = allProjects[i].get("SkillsUsed");

		for(var j = 0; j < skillsUsed.skills.length; j++)
		{
			var skill = skillsUsed.skills[j];

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


function processData(dataType)
{
	if(dataType === "project")
	{
		fetchProjectsAndTimes();
	}
	else if(dataType === "categories")
	{
		fetchCategoriesAndTimes();
	}
	else if(dataType === "skills")
	{
		fetchSkillsAndTimes();
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
    		console.log("results:" + results.length);
    		for (var i = 0; i < results.length; i++) 
            {
            	allProjects.push(results[i]);
            }
    		console.log("got projects: " + allProjects);
    	},
    	function (error)
    	{
    		console.log("error1");
    	}
    ).then(
    	function (results)
    	{
    		console.log("sucess2");
    		processData(request.params.dataType);
    	},
    	function (error)
    	{
    		console.log("error2");
    		response.error("fuuuuuck");
    	}
    ).then(
    	function (results)
    	{
    		console.log("I saw this final bit!");
    		response.success(processedData);
    	},
    	function (error)
    	{
    		console.log("error2");
    		response.error("fuuuuuckend");
    	}
    );
});





