const gists_id = '85101cc8eb1b208dc8d12e35a66a85df'
// https://gist.github.com/kohy-creates/85101cc8eb1b208dc8d12e35a66a85df

StartupEvents.init(event => {
	NetJS.getGists(gists_id, result => {
		if (result.success) {
			JsonIO.write('kubejs/assets/titledb.json', result.raw)
			console.log('Raw result written to kubejs/assets/titledb.json')
		} else {
			console.log(result.exception)
		}
	})
})
