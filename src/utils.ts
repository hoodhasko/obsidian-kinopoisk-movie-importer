import {FilmResponse, MovieNote} from 'types';

export function mapToMovieNote(data: FilmResponse): MovieNote {
	const isSerial =
		data.serial === true ||
		data.type === 'TV_SERIES' ||
		data.type === 'MINI_SERIES' ||
		data.type === 'TV_SHOW';

	return {
		title: data.nameRu || data.nameOriginal || 'Unknown',
		webUrl: data.webUrl,
		nameOriginal: data.nameOriginal,
		genres: data.genres.map(g => g.genre),
		kinopoiskRating: data.ratingKinopoisk,
		imdbRating: data.ratingImdb,
		year: data.year || 0,
		posterUrl: data.posterUrlPreview || data.posterUrl,
		watchStatus: 'Не смотрел',
		type: isSerial ? 'сериал' : 'фильм',
	};
}
