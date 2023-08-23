import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly _categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategoryByName(name: string) {
    return await this._categoryRepository.findOneBy({ name });
  }

  async getCategories(categoriesStr: string[]): Promise<CategoryEntity[]> {
    const result: CategoryEntity[] = [];
    for (const item of categoriesStr) {
      const category = await this.getCategoryByName(item);
      if (!category) {
        const newCategory = this._categoryRepository.create({ name: item });
        result.push(await this._categoryRepository.save(newCategory));
      } else result.push(category);
    }
    return result;
  }
}
