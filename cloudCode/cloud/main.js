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

*/

var allSkills = [];

function reduceSkills()
{
	var allSkillsCopy = [];
	var allSkillsNote = [];

	_.each(allSkills, function(skill) 
    {
    	var index = _.indexOf(allSkillsNote, skill.get('Name'));

    	//console.log(skill.get('Name'));
        if(index === -1)
        {
        	//console.log(">>>**********" + skill);
            allSkillsNote.push(skill.get('Name'));
            allSkillsCopy.push(skill);
        }
        else
        {
        	allSkillsCopy[index].set("TotalTime", allSkillsCopy[index].get("TotalTime")+skill.get("TotalTime"));
            //allSkillsCopy[index].TotalTime += skill.get("TotalTime");
        }
    });

    allSkills = allSkillsCopy;
    //allSkills = _.sortBy(allSkillsCopy, 'hours').reverse();	
}

Parse.Cloud.define("updateDB", function(request, response)
{
	var allProjects = [];

	var test = "";
	var query = new Parse.Query("Projects");
    query.ascending("StartDate");

    query.find(
    {
    	success: function(results) 
        {
        	for (var i = 0; i < results.length; i++) 
            {
             	var project = results[i];
	            var skillsUsed = project.get('SkillsUsed');

	            for(var j = 0; j < skillsUsed.skills.length; j++)
        		{
        			var SkillObject = Parse.Object.extend("Skills");
  		      		var skillObject = new SkillObject();
        			skillObject.set("Category", "Uncategorised");
        			skillObject.set("Name",skillsUsed.skills[j].skillName);
        			skillObject.set("TotalTime", skillsUsed.skills[j].hours);
        			//console.log("obj:" + skillsUsed.skills[j].skillName);
        			allSkills.push(skillObject);

        			//allSkillNames.push(skillsUsed.skills[j].skillName);
        			//test +=  + ", \n";
        		}
            }

            console.log(">>> before" + allSkills.length);
            reduceSkills();
            console.log(">>> after" + allSkills.length);

            Parse.Object.saveAll(allSkills,
        	{
        		success: function(skillObject) 
			  	{
			  		//response.success(allSkills);
			  		console.log('New object created with objectId: ' + skillObject.id);
			  		response.success(skillObject);
			  	},
			  	error: function(skillObject, error) 
			  	{
			  		//response.error("werr!");
			    	console.log('Failed to create new object, with error code: ' + error);
			  	}
			});

			
        },
        error: function(error) 
        {
        	response.error("Error in updateDB: " + error.code + " " + error.message);
        }
    });

});



/*Parse.Cloud.job("updatesdsdsd", function(request, status)
{
	var availableFunctions = _.functions(_);
	console.log('Available Underscore Functions: ' + JSON.stringify(availableFunctions));

	var allProjects = [];

    var query = new Parse.Query("Projects");
    query.ascending("StartDate");

    query.find(
    {
        success: function(results) 
        {
        	var objects = [];

            for (var i = 0; i < results.length; i++) 
            { 
                var project = results[i];
                var skillsUsed = project.get('SkillsUsed');
                allSkills.push(skillsUsed);

				//console.log("*** skillsUsed *** :" + skillsUsed);
        		
        		for(var j = 0; j < skillsUsed.skills.length; j++)
        		{
        			var SkillObject = Parse.Object.extend("Skills");
  		      		var skillObject = new SkillObject();
        			skillObject.set("Category", "Uncategorised");
        			skillObject.set("Name",skillsUsed.skills[j].skillName);
        			skillObject.set("TotalTime", 0);
        			//console.log("obj:" + skillsUsed.skills[j].skillName);
        			objects.push(skillObject);
        		}
        		//console.log(">>>>>>>>>>");
            }

            console.log("before:" + allSkills.length);
            reduceSkills();
            console.log("after:" + allSkills.length);

            //console.log("*** skillsUsed *** :" + objects);

        	Parse.Object.saveAll(objects,
        	{
        		success: function(skillObject) 
			  	{
			  		//response.success(allSkills);
			  		console.log('New object created with objectId: ' + skillObject.id);
			  	},
			  	error: function(skillObject, error) 
			  	{
			  		//response.error("werr!");
			    	console.log('Failed to create new object, with error code: ' + error);
			  	}
			});
        },
        error: function(error) 
        {
            response.error("Error in updateSkillsObject: " + error.code + " " + error.message);
            //console.log('Failed to update');
        }
    });
});*/

/*Parse.Cloud.define("getSkillCategories", function(request, response)
{
	response.success("changed");
});*

/*
Parse.Cloud.define("averageStars", function(request, response) {
  var query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

{"skills":[{"hours":10,"skillName":"C/C++"},
{"hours":10,"skillName":"UI Automation"},
{"hours":10,"skillName":"Unix CL"},
{"hours":40,"skillName":"Interface Builder"},{"hours":40,"skillName":"Objective C"},{"hours":40,"skillName":"Autolayout"}]}
*/
// update skills object - lets run this every time we touch the projects object

/*

var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});



*/

/*Parse.Cloud.beforeSave("Skills", function(request, response) 
{
	if (!request.object.get("Name")) 
	{
		response.error('A skill must have a name!');
  	} 
  	else 
  	{
	    var query = new Parse.Query("Skills");
	    query.equalTo("Name", request.object.get("Name"));
	    query.first(
	    {
	    	success: function(object) 
	      	{
	      		if (object) 
	      		{
	      			response.error("A Skill with this name already exists.");
	        	} 
	        	else 
	        	{
	          		response.success();
	        	}
	      	},
	      	error: function(error) 
	      	{
	        	response.error("Could not validate uniqueness for this Skill name.");
	      	}
	    });
  	}		
});

var allSkills = [];



Parse.Cloud.job("updateDBsdsdsd", function(request, status)
{
	var availableFunctions = _.functions(_);
	console.log('Available Underscore Functions: ' + JSON.stringify(availableFunctions));

	var allProjects = [];

    var query = new Parse.Query("Projects");
    query.ascending("StartDate");

    query.find(
    {
        success: function(results) 
        {
        	var objects = [];

            for (var i = 0; i < results.length; i++) 
            { 
                var project = results[i];
                var skillsUsed = project.get('SkillsUsed');
                allSkills.push(skillsUsed);

				//console.log("*** skillsUsed *** :" + skillsUsed);
        		
        		for(var j = 0; j < skillsUsed.skills.length; j++)
        		{
        			var SkillObject = Parse.Object.extend("Skills");
  		      		var skillObject = new SkillObject();
        			skillObject.set("Category", "Uncategorised");
        			skillObject.set("Name",skillsUsed.skills[j].skillName);
        			skillObject.set("TotalTime", 0);
        			//console.log("obj:" + skillsUsed.skills[j].skillName);
        			objects.push(skillObject);
        		}
        		//console.log(">>>>>>>>>>");
            }

            console.log("before:" + allSkills.length);
            reduceSkills();
            console.log("after:" + allSkills.length);

            //console.log("*** skillsUsed *** :" + objects);

        	Parse.Object.saveAll(objects,
        	{
        		success: function(skillObject) 
			  	{
			  		//response.success(allSkills);
			  		console.log('New object created with objectId: ' + skillObject.id);
			  	},
			  	error: function(skillObject, error) 
			  	{
			  		//response.error("werr!");
			    	console.log('Failed to create new object, with error code: ' + error);
			  	}
			});
        },
        error: function(error) 
        {
            response.error("Error in updateSkillsObject: " + error.code + " " + error.message);
            //console.log('Failed to update');
        }
    });
});*/

// skills categories with total time
//Parse.Cloud.define("getSkillCategories", function(request, response)
//{
//	response.success("changed");
//});


// ordered skills list

//