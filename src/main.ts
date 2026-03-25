import {Plugin, Notice, Modal, App} from 'obsidian';
import {MyPluginSettings, DEFAULT_SETTINGS} from './settings';
import {FilmResponse} from 'types';

class InputModal extends Modal {
	private result: string;
	private onSubmit: (result: string) => void;

	constructor(app: App, onSubmit: (result: string) => void) {
		super(app);
		this.onSubmit = onSubmit;
		this.result = 'https://www.kinopoisk.ru/film/5582128/';
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl('h2', {text: 'Вставь ссылку Кинопоиска'});

		const input = contentEl.createEl('input', {
			type: 'text',
			value: 'https://www.kinopoisk.ru/film/5582128/',
			attr: {placeholder: 'https://www.kinopoisk.ru/film/...'},
		});
		input.style.width = '100%';
		input.style.marginTop = '10px';
		input.focus();

		const submitBtn = contentEl.createEl('button', {
			text: 'Добавить',
		});
		submitBtn.style.marginTop = '10px';
		submitBtn.onclick = () => {
			this.result = input.value;
			this.onSubmit(this.result);
			this.close();
		};

		input.addEventListener('keypress', e => {
			if (e.key === 'Enter') {
				this.result = input.value;
				this.onSubmit(this.result);
				this.close();
			}
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

export default class MoviePlugin extends Plugin {
	settings!: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		console.log('Movie Plugin loaded');

		this.addCommand({
			id: 'add-movie',
			name: 'Add movie from Kinopoisk',
			callback: async () => {
				new InputModal(this.app, async url => {
					if (!url) return;

					const id = this.extractId(url);
					if (!id) {
						new Notice('❌ Не удалось извлечь ID фильма');
						return;
					}

					try {
						const data = await this.fetchMovie(id);
						await this.createMovieNote(data);

						new Notice('✅ Фильм добавлен!');
					} catch (e) {
						console.error(e);
						new Notice('❌ Ошибка при получении данных');
					}
				}).open();
			},
		});
	}

	onunload() {
		console.log('Movie Plugin unloaded');
		new Notice('Plugin loaded');
	}

	// 🔍 Извлечение ID из ссылки
	extractId(url: string): string | null {
		const match = url.match(/film\/(\d+)/);
		return match && match[1] ? match[1] : null;
	}

	// 🌐 Запрос к API Кинопоиска
	async fetchMovie(id: string): Promise<FilmResponse> {
		const res = await fetch(
			`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
			{
				headers: {
					'X-API-KEY': '164e96ba-8845-464d-930f-2e266b96ff88', // ← вставь сюда ключ
				},
			},
		);

		if (!res.ok) {
			throw new Error('API error');
		}

		return await res.json();
	}

	// 📝 Создание заметки
	async createMovieNote(data: any) {
		const title = data.nameOriginal || data.nameRu || 'Unknown';
		const year = data.year || '';
		const genres = (data.genres || []).map((g: any) => g.genre);

		const safeTitle = this.sanitizeFileName(title);

		const content = `---
type: movie
title: ${title}
year: ${year}
genres: [${genres.join(', ')}]
kp_rating: ${data.ratingKinopoisk || ''}
imdb_rating: ${data.ratingImdb || ''}
kp_url: https://www.kinopoisk.ru/film/${data.kinopoiskId}/
---

# ${title}

## Описание
${data.description || 'Нет описания'}
`;

		const folder = 'Movies';

		// создаём папку если нет
		if (!this.app.vault.getAbstractFileByPath(folder)) {
			await this.app.vault.createFolder(folder);
		}

		const filePath = `${folder}/${safeTitle}.md`;

		// проверка на дубликат
		if (this.app.vault.getAbstractFileByPath(filePath)) {
			new Notice('⚠️ Фильм уже существует');
			return;
		}

		await this.app.vault.create(filePath, content);
	}

	// 🧹 Очистка имени файла
	sanitizeFileName(name: string): string {
		return name.replace(/[\\/#%&{}<>*?$!'":@+`|=]/g, '').trim();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
