import {FilmResponse, MovieNote} from 'types';

export function mapToMovieNote(data: FilmResponse): MovieNote {
	return {
		title: data.nameRu || data.nameOriginal || 'Unknown',
		webUrl: data.webUrl,
		nameOriginal: data.nameOriginal,
		genres: data.genres.map((g) => g.genre),
		kp_rating: data.ratingKinopoisk,
		imdb_rating: data.ratingImdb,
		year: data.year || 0,
		posterUrl: data.posterUrlPreview || data.posterUrl,
	};
}
