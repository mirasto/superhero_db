import { v4 as uuidv4 } from 'uuid';


export class Superhero {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.nickname = data.nickname;
        this.real_name = data.real_name;
        this.origin_description = data.origin_description;
        this.superpowers = this.parseSuperpowers(data.superpowers);
        this.catch_phrase = data.catch_phrase;
        this.images = data.images || [];
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    parseSuperpowers(superpowers) {
        if (Array.isArray(superpowers)) {
            return superpowers;
        }
        if (typeof superpowers === 'string') {
            return superpowers.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
    }

    static validate(data) {
        const errors = [];

        if (!data.nickname || typeof data.nickname !== 'string' || data.nickname.trim() === '') {
            errors.push('Nickname is required and must be a non-empty string');
        }

        if (!data.real_name || typeof data.real_name !== 'string' || data.real_name.trim() === '') {
            errors.push('Real name is required and must be a non-empty string');
        }

        if (!data.origin_description || typeof data.origin_description !== 'string') {
            errors.push('Origin description is required');
        }

        if (!data.superpowers) {
            errors.push('Superpowers is required');
        }

        if (!data.catch_phrase || typeof data.catch_phrase !== 'string') {
            errors.push('Catch phrase is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            id: this.id,
            nickname: this.nickname,
            real_name: this.real_name,
            origin_description: this.origin_description,
            superpowers: this.superpowers,
            catch_phrase: this.catch_phrase,
            images: this.images,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Superhero;
