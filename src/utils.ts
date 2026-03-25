import {FilmResponse, MovieNote} from 'types';

export function mapToMovieNote(data: FilmResponse): MovieNote {
	console.log('DATA', data);
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
	};
}
