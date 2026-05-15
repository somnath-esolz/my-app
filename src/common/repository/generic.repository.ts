import { Model, UpdateQuery } from 'mongoose';

// Mongoose 9 does not export FilterQuery/RootFilterQuery as named types.
// We derive the filter type directly from Model.find() to stay version-safe.
type FilterOf<T> = Parameters<Model<T>['find']>[0];

export abstract class GenericRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  // CREATE
  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return doc.save() as Promise<T>;
  }

  // READ ALL — optional filter e.g. { isActive: true }
  async findAll(filter?: FilterOf<T>): Promise<T[]> {
    return this.model.find(filter ?? {}).exec();
  }

  // READ ONE by MongoDB _id
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  // READ ONE by custom filter
  async findOne(filter: FilterOf<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  // UPDATE — returns the updated document
  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // DELETE
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
