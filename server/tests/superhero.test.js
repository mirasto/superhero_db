import { jest } from '@jest/globals';
import store from '../src/store/inMemoryStore.js';
import Superhero from '../src/models/superhero.model.js';

describe('InMemoryStore', () => {
    beforeEach(() => {
        store.clear();
    });

    describe('create', () => {
        it('should create a new superhero', () => {
            const hero = {
                id: 'test-id',
                nickname: 'Superman',
                real_name: 'Clark Kent',
                origin_description: 'From Krypton',
                superpowers: ['flight', 'strength'],
                catch_phrase: 'Up, up and away!',
                images: []
            };

            const result = store.create(hero);
            expect(result).toEqual(hero);
            expect(store.getById('test-id')).toEqual(hero);
        });
    });

    describe('getAll', () => {
        it('should return paginated results', () => {
            
            for (let i = 1; i <= 10; i++) {
                store.create({
                    id: `hero-${i}`,
                    nickname: `Hero ${i}`,
                    real_name: `Person ${i}`,
                    origin_description: 'Origin',
                    superpowers: ['power'],
                    catch_phrase: 'Phrase',
                    images: []
                });
            }

            const page1 = store.getAll(1, 5);
            expect(page1.data.length).toBe(5);
            expect(page1.pagination.total).toBe(10);
            expect(page1.pagination.totalPages).toBe(2);
            expect(page1.pagination.hasNextPage).toBe(true);
            expect(page1.pagination.hasPrevPage).toBe(false);

            const page2 = store.getAll(2, 5);
            expect(page2.data.length).toBe(5);
            expect(page2.pagination.hasNextPage).toBe(false);
            expect(page2.pagination.hasPrevPage).toBe(true);
        });

        it('should return empty array for empty store', () => {
            const result = store.getAll(1, 5);
            expect(result.data).toEqual([]);
            expect(result.pagination.total).toBe(0);
        });
    });

    describe('getById', () => {
        it('should return superhero by id', () => {
            const hero = { id: 'test-id', nickname: 'Test' };
            store.create(hero);

            expect(store.getById('test-id')).toEqual(hero);
        });

        it('should return null for non-existent id', () => {
            expect(store.getById('non-existent')).toBeNull();
        });
    });

    describe('update', () => {
        it('should update existing superhero', () => {
            store.create({
                id: 'test-id',
                nickname: 'Original',
                createdAt: '2024-01-01'
            });

            const updated = store.update('test-id', { nickname: 'Updated' });

            expect(updated.nickname).toBe('Updated');
            expect(updated.createdAt).toBe('2024-01-01'); 
            expect(updated.updatedAt).toBeDefined();
        });

        it('should return null for non-existent id', () => {
            expect(store.update('non-existent', {})).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete existing superhero', () => {
            store.create({ id: 'test-id', nickname: 'Test' });

            const result = store.delete('test-id');

            expect(result).toBe(true);
            expect(store.getById('test-id')).toBeNull();
        });

        it('should return false for non-existent id', () => {
            expect(store.delete('non-existent')).toBe(false);
        });
    });

    describe('image management', () => {
        beforeEach(() => {
            store.create({
                id: 'hero-1',
                nickname: 'Test Hero',
                images: []
            });
        });

        it('should add image to superhero', () => {
            const image = { id: 'img-1', filename: 'test.jpg', url: '/uploads/test.jpg' };

            const result = store.addImage('hero-1', image);

            expect(result.images).toContainEqual(image);
        });

        it('should remove image from superhero', () => {
            store.addImage('hero-1', { id: 'img-1', filename: 'test.jpg', url: '/uploads/test.jpg' });

            const removedImage = store.removeImage('hero-1', 'img-1');

            expect(removedImage.id).toBe('img-1');
            expect(store.getById('hero-1').images).toHaveLength(0);
        });
    });
});

describe('Superhero Model', () => {
    describe('validation', () => {
        it('should validate required fields', () => {
            const result = Superhero.validate({});

            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
        });

        it('should pass validation with all required fields', () => {
            const result = Superhero.validate({
                nickname: 'Superman',
                real_name: 'Clark Kent',
                origin_description: 'From Krypton',
                superpowers: ['flight'],
                catch_phrase: 'Up, up and away!'
            });

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe('parseSuperpowers', () => {
        it('should parse comma-separated string', () => {
            const hero = new Superhero({
                nickname: 'Test',
                real_name: 'Test',
                origin_description: 'Test',
                superpowers: 'flight, strength, speed',
                catch_phrase: 'Test'
            });

            expect(hero.superpowers).toEqual(['flight', 'strength', 'speed']);
        });

        it('should keep array as-is', () => {
            const hero = new Superhero({
                nickname: 'Test',
                real_name: 'Test',
                origin_description: 'Test',
                superpowers: ['flight', 'strength'],
                catch_phrase: 'Test'
            });

            expect(hero.superpowers).toEqual(['flight', 'strength']);
        });
    });
});
