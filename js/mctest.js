const init = () => {
	console.log('mctest.init');

	const loadJSON = (url, callback) => {
		console.log('mctest.loadJSON');
		const request = new XMLHttpRequest();
		request.overrideMimeType('application/json');
		request.open('GET', url, true);
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.status == 200) {
				callback(JSON.parse(request.responseText));
			}
		};
		request.send(null);
	};

	const buildPlaylist = (data) => {
		const items = data['Items'];
		if (items.length === 0) {
			return;
		}

		const onPlaylistItemClick = (e) => {
			console.log(`You clicked on ${e.currentTarget}`);
			document.querySelectorAll('.mc-playlistItem.mc-active').forEach((item) => {
				item.classList.remove('mc-active');
			});
			e.currentTarget.classList.add('mc-active');
		};

		const playlist = document.createElement('ul');
		playlist.id = 'mc-playlist';

		items.forEach((item, index) => {
			const imageUrls = item['ImageUrls'];
			const imageUrl = imageUrls.length > 1 ? imageUrls[1]['ImageUrl'] :imageUrls[0]['ImageUrl'];

			const listItem = document.createElement('li');
			listItem.className = index===2 ? 'mc-playlistItem mc-active' : 'mc-playlistItem';
			listItem.id = `mc-playlistItem${index}`;
			listItem.innerHTML = 	`<div class='mc-playlistItemThumbnail'>
										<img src='${imageUrl}'>
									</div>
									<div class='mc-playlistItemInfo'>
										<span class='mc-playlistItemTitle'>"${item['Ttla']['Line2']}"</span><br>
										<span class='mc-playlistItemArtist'>${item['Ttla']['Line1']}</span>
									</div>
									<div class='mc-playlistItemRating'>${item['TvRating']}</div>`;
			listItem.addEventListener('click', onPlaylistItemClick);
			playlist.appendChild(listItem);
		});

		document.getElementById('mc-playlistWrapper').appendChild(playlist);
	};

	loadJSON('js/data.json', buildPlaylist);
};

init();