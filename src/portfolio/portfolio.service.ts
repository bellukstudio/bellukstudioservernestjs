import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from 'express-serve-static-core'
import { FirebaseService } from 'src/firebase/firebase.service';
import { Portfolio } from './entities/portofolio.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {

    //* Constructor for injecting the portfolio model schema
    constructor(
        @InjectRepository(Portfolio)
        private readonly portofolioRepository: Repository<Portfolio>,
        private readonly firebaseService: FirebaseService
    ) { }

    //* Retrieve portfolio with pagination and search keyword

    async findAll(query: Query): Promise<Portfolio[]> {

        //* Set the number of result per page
        const restPerPage = 100;

        //* Determine the current page, default to 1 if not specified
        const currentPage = Number(query.page) || 1;

        //* calculate th enumber of documents to skip based on the current page
        const skip = restPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: Like(`%${query.keyword}%`)
        } : {}

        return this.portofolioRepository.find({
            where: keyword,
            skip,
            take: restPerPage
        });
    }

    //* Create A new portfolio
    async create(portfolioDto: CreatePortfolioDto, user: User): Promise<Portfolio> {
        const portfolio = this.portofolioRepository.create(portfolioDto);

        return this.portofolioRepository.save(portfolio);
    }

    //* find portofolio by id
    async findById(id: string): Promise<Portfolio> {
        const portfolio = await this.portofolioRepository.findOne({
            where: {
                id
            }
        });

        if (!portfolio) {
            throw new HttpException({
                message: 'Portofolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
        return portfolio;
    }

    async updateById(id: string, portfolio: UpdatePortfolioDto): Promise<Portfolio> {
        const existingPortfolio = await this.portofolioRepository.findOne({ where: { id } });

        if (!existingPortfolio) {
            throw new HttpException({
                message: 'Portofolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        await this.portofolioRepository.update(id, portfolio);
        return { ...existingPortfolio, ...portfolio };
    }

    async deleteById(id: string): Promise<void> {
        const result = await this.portofolioRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException({
                message: 'Portofolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
    }
    async uploadImage(id: string, file: Express.Multer.File) {
        // Correctly find the portfolio using the id
        const portfolio = await this.portofolioRepository.findOne({ where: { id } });

        if (!portfolio) {
            throw new HttpException({
                message: 'Portofolio not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        // Upload the file to Firebase in the 'portfolio' folder
        const destination = `portfolio/${file.originalname}`;

        // Upload file to Firebase (assuming the buffer method is correct for your firebaseService)
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        // Save the URL to the 'thumbnail' field of the portfolio
        portfolio.thumbnail = url;

        // Persist the changes to the database
        await this.portofolioRepository.save(portfolio);

        return portfolio;
    }


}
