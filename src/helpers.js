import { firebaseApp } from './base';

export function rando(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function randomAudio() {
	/*const audio = [
		'get_to_da_choppa',
		'living_on_a_prayer_goat_edition',
		'miley_cyrus_party_in_the_usa_goat_edition',
		'more_cowbell_snl',
		'rush_tom_sawyer',
		'taylor_swift_trouble_goat_edition',
		'kevin_rubber_nugget_mulch',
		'kevin_rubber_nugget_mulch_remix'
	];*/

	const storageRef = firebaseApp.storage().ref('audio');

	console.log(storageRef);

	// storageRef
	// 	.listAll()
	// 	.then(function(result) {
	// 		result.items.forEach(function(imageRef) {
	// 			// And finally display them
	// 			console.log(imageRef.name);
	// 		});
	// 	})
	// 	.catch(function(error) {
	// 		// Handle any errors
	// 	});

	// const getAudio = new Audio(require(`./audio/${rando(audio)}.mp3`));
	const getAudio = new Audio(require(`./audio/kevin_rubber_nugget_mulch_remix.mp3`));

	const playAudio = getAudio.play();

	if (playAudio !== undefined) {
		playAudio
			.then(function() {
				// Automatic playback started!
			})
			.catch(function(error) {
				// Automatic playback failed.
				// Show a UI element to let the user manually start playback.
				console.log('Audio Failed ' + error);
			});
	}
}

export function getCurrentTime() {
	const date = new Date();
	return date.toLocaleTimeString('en-US');
}
