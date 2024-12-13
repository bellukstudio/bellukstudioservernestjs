import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { Query } from 'express-serve-static-core';
import { Repository } from 'typeorm';
import { CreateOverviewDto } from './dto/create-overview.dto';
@Injectable()
export class OverviewService {

    constructor(
        @InjectRepository(Overview)
        private readonly overviewRepository: Repository<Overview>
    ) { }

    async findAll(query: Query): Promise<Overview[]> {
        const resPerPage = 10;

        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        return this.overviewRepository.find({
            skip,
            take: resPerPage
        });
    }

    async create(overviewDto: CreateOverviewDto): Promise<Overview> {
        const overview = new Overview();

        overview.overview = overviewDto.overview;

        return this.overviewRepository.save(overview);
    }
    async findById(id: string): Promise<Overview> {
        const overview = await this.overviewRepository.findOne({
            where: {
                id
            }
        });

        if (!overview) {
            throw new NotFoundException('Overview not found');
        }
        return overview;
    }
    async updateById(id: string, overview: Partial<Overview>): Promise<Overview> {
        const existingOverview = await this.overviewRepository.findOne({
            where: { id }
        });

        if (!existingOverview) {
            throw new NotFoundException('Overivew not found');
        }

        await this.overviewRepository.update(id, overview);

        return { ...existingOverview, ...overview };
    }
    async delete(id: string): Promise<void> {
        const result = await this.overviewRepository.delete(id);

        if (result.affected == 0) {
            throw new NotFoundException('Overview not found');
        }
    }
}
