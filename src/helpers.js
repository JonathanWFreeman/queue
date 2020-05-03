const cloudUrl = 'https://res.cloudinary.com/jwfreeman/video/upload/v1588349994/Queue/audio/';

export function getRandomNumber(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomAudio() {
	const audio = [
		'get_to_da_choppa',
		'living_on_a_prayer_goat_edition',
		'miley_cyrus_party_in_the_usa_goat_edition',
		'more_cowbell_snl',
		'rush_tom_sawyer',
		'taylor_swift_trouble_goat_edition',
	];

	const getAudio = new Audio(`${cloudUrl}${getRandomNumber(audio)}.mp3`);

	const playAudio = getAudio.play();

	if (playAudio !== undefined) {
		playAudio
			.then(function() {
				// Automatic playback started!
			})
			.catch(function(error) {
				// Automatic playback failed.
				// Show a UI element to let the user manually start playback.
				console.log('Audio Failed: ' + error);
			});
	}
}

export function getCurrentTime() {
	const date = new Date();
	return date.toLocaleTimeString('en-US');
}