#!/usr/bin/python

import json, httplib

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("project_name", help="abbreviation of the project name to use")
parser.add_argument("skill_name", help="abbreviation of the skill name to use")
parser.add_argument("pomos", help="number of pomos to add", type=int)
args = parser.parse_args()

connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/UpdateInfo', json.dumps(
	{
		"project": args.project_name,
		"skill": args.skill_name,
		"pomos": args.pomos
	}),
	{
		"X-Parse-Application-Id": "tpio94gHZkEKpbpxvjCAHKExanIx89VwpIsvtXt5",
		"X-Parse-REST-API-Key": "Mx4J7EDpF2mcTpiaDQuwmfHBzDhR4t3RRUIBtkIj",
		"Content-Type": "application/json"
	})
result = json.loads(connection.getresponse().read())
print result