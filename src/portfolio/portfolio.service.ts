import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from 'express-serve-static-core';
import { Repository, Like } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { FirebaseService } from 'src/firebase/firebase.service';
import { Portfolio } from './entities/portofolio.entity';
import { User } from 'src/auth/entities/user.entity';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
    private readonly logger = new Logger('PortfolioService');

    constructor(
        @InjectRepository(Portfolio)
        private readonly portfolioRepository: Repository<Portfolio>,
        private readonly firebaseService: FirebaseService
    ) {}

    // 📥 Get All with Pagination & Keyword
    async findAll(query: Query): Promise<Portfolio[]> {
        const perPage = 100;
        const page = Number(query.page) || 1;
        const skip = perPage * (page - 1);

        const whereCondition = query.keyword
            ? { title: Like(`%${query.keyword}%`) }
            : {};

        this.logger.log(`Page: ${page}, Keyword: ${query.keyword || 'None'}, Skip: ${skip}`);

        const data = await this.portfolioRepository.find({
            where: whereCondition,
            skip,
            take: perPage,
        });

        this.logger.log(`Fetched: ${data.length} portfolio(s)`);
        return data;
    }

    // 📥 Get All without Pagination
    async findAllWithoutPagination(): Promise<Portfolio[]> {
        const data = await this.portfolioRepository.find();
        this.logger.log(`Fetched all portfolios: ${data.length}`);
        return data;
    }

    // ➕ Create Portfolio
    async create(dto: CreatePortfolioDto, user: User): Promise<Portfolio> {
        const portfolio = this.portfolioRepository.create({
            ...dto,
            user,
        });
        return this.portfolioRepository.save(portfolio);
    }

    // 🔍 Find by ID
    async findById(id: string): Promise<Portfolio> {
        this.validateUUID(id);

        const portfolio = await this.portfolioRepository.findOne({ where: { id } });

        if (!portfolio) {
            throw new HttpException({
                message: 'Portfolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        return portfolio;
    }

    // ✏️ Update by ID
    async updateById(id: string, dto: UpdatePortfolioDto): Promise<Portfolio> {
        this.validateUUID(id);

        const existing = await this.findById(id); // reuse error check
        const updated = this.portfolioRepository.merge(existing, dto);
        return this.portfolioRepository.save(updated);
    }

    // ❌ Delete by ID
    async deleteById(id: string): Promise<void> {
        this.validateUUID(id);

        const result = await this.portfolioRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException({
                message: 'Portfolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
    }

    // 📤 Upload Image to Firebase
    async uploadImage(id: string, file: Express.Multer.File): Promise<Portfolio> {
        this.validateUUID(id);

        const portfolio = await this.findById(id);

        const destination = `portfolio/${file.originalname}`;
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        portfolio.thumbnail = url;
        return this.portfolioRepository.save(portfolio);
    }

    // 🔐 UUID Validator
    private validateUUID(id: string): void {
        if (!isUUID(id)) {
            throw new HttpException('Invalid UUID format', HttpStatus.BAD_REQUEST);
        }
    }
}
