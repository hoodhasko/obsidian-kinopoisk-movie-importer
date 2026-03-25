export interface Country {
	country: string;
}

export interface Genre {
	genre: string;
}

export type ProductionStatus =
	| 'FILMING'
	| 'PRE_PRODUCTION'
	| 'COMPLETED'
	| 'ANNOUNCED'
	| 'UNKNOWN'
	| 'POST_PRODUCTION';

export type FilmType =
	| 'FILM'
	| 'VIDEO'
	| 'TV_SERIES'
	| 'MINI_SERIES'
	| 'TV_SHOW';

export interface FilmResponse {
	kinopoiskId: number;
	kinopoiskHDId: string | null;
	imdbId: string | null;

	nameRu: string | null;
	nameEn: string | null;
	nameOriginal: string | null;

	posterUrl: string;
	posterUrlPreview: string;
	coverUrl: string | null;
	logoUrl: string | null;

	reviewsCount: number;

	ratingGoodReview: number | null;
	ratingGoodReviewVoteCount: number | null;

	ratingKinopoisk: number | null;
	ratingKinopoiskVoteCount: number | null;

	ratingImdb: number | null;
	ratingImdbVoteCount: number | null;

	ratingFilmCritics: number | null;
	ratingFilmCriticsVoteCount: number | null;

	ratingAwait: number | null;
	ratingAwaitCount: number | null;

	ratingRfCritics: number | null;
	ratingRfCriticsVoteCount: number | null;

	webUrl: string;

	year: number | null;
	filmLength: number | null;

	slogan: string | null;
	description: string | null;
	shortDescription: string | null;
	editorAnnotation: string | null;

	isTicketsAvailable: boolean;

	productionStatus: ProductionStatus | null;
	type: FilmType;

	ratingMpaa: string | null;
	ratingAgeLimits: string | null;

	hasImax: boolean | null;
	has3D: boolean | null;

	lastSync: string;

	countries: Country[];
	genres: Genre[];

	startYear: number | null;
	endYear: number | null;

	serial: boolean | null;
	shortFilm: boolean | null;
	completed: boolean | null;
}

export type WatchStatus = 'Не вышел' | 'Посмотрел' | 'Не смотрел';

export interface MovieNote {
	title: string;
	webUrl: string;
	nameOriginal: string | null;
	genres: string[];
	kp_rating: number | null;
	imdb_rating: number | null;
	year: number;
	posterUrl: string;
	watchStatus: WatchStatus;
}
