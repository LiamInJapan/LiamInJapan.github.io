import json, httplib

connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/UpdateInfo', json.dumps(
	{
		"project": "PF",
		"skill": "JS",
		"pomos": 1
	}),
	{
		"X-Parse-Application-Id": "tpio94gHZkEKpbpxvjCAHKExanIx89VwpIsvtXt5",
		"X-Parse-REST-API-Key": "Mx4J7EDpF2mcTpiaDQuwmfHBzDhR4t3RRUIBtkIj",
		"Content-Type": "application/json"
	})
result = json.loads(connection.getresponse().read())
print result