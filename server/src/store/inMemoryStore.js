

class InMemoryStore {
  constructor() {
    this.superheroes = new Map();
  }


  getAll(page = 1, limit = 5) {
    const allHeroes = Array.from(this.superheroes.values());
    const total = allHeroes.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = allHeroes.slice(start, end);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }


  getById(id) {
    return this.superheroes.get(id) || null;
  }


  create(superhero) {
    this.superheroes.set(superhero.id, superhero);
    return superhero;
  }


  update(id, updates) {
    const existing = this.superheroes.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };

    this.superheroes.set(id, updated);
    return updated;
  }


  delete(id) {
    const existing = this.superheroes.get(id);
    if (!existing) return false;
    this.superheroes.delete(id);
    return true;
  }


  addImage(heroId, image) {
    const hero = this.superheroes.get(heroId);
    if (!hero) return null;

    hero.images.push(image);
    hero.updatedAt = new Date().toISOString();
    return hero;
  }


  removeImage(heroId, imageId) {
    const hero = this.superheroes.get(heroId);
    if (!hero) return null;

    const imageIndex = hero.images.findIndex(img => img.id === imageId);
    if (imageIndex === -1) return null;

    const removedImage = hero.images.splice(imageIndex, 1)[0];
    hero.updatedAt = new Date().toISOString();
    return removedImage;
  }



}


export const store = new InMemoryStore();
export default store;
