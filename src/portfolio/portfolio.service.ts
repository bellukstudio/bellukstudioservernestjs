import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from './schemas/portfolio.schema';
import { Query } from 'express-serve-static-core'
import * as mongoose from 'mongoose';
import { title } from 'process';
import { User } from 'src/auth/schemas/user.schema';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PortfolioService {

    //* Constructor for injecting the portfolio model schema
    constructor(
        @InjectModel(Portfolio.name)
        private portfolioModel: mongoose.Model<Portfolio>,
        private readonly firebaseService: FirebaseService
    ) { }

    //* Retrieve portfolio with pagination and search keyword

    async findAll(query: Query): Promise<Portfolio[]> {

        //* Set the number of result per page
        const restPerPage = 10;

        //* Determine the current page, default to 1 if not specified
        const currentPage = Number(query.page)

        //* calculate th enumber of documents to skip based on the current page
        const skip = restPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const portfolio = await this.portfolioModel.find({ ...keyword }).limit(restPerPage).skip(skip)
        return portfolio
    }

    //* Create A new portfolio
    async create(portfolio: Portfolio, user: User): Promise<Portfolio> {
        const data = Object.assign(portfolio, { user: user._id })
        //* Save portfolio
        const res = await this.portfolioModel.create(portfolio)
        return res
    }

    //* find portofolio by id
    async findById(id: string): Promise<Portfolio> {
        const isValidId = mongoose.isValidObjectId(id)

        if (!isValidId) {
            throw new BadRequestException("Please enter correct id");

        }

        const portfolio = await this.portfolioModel.findById(id)
        if (!portfolio) {
            throw new NotFoundException("Portoflio not found")
        }
        return portfolio
    }

    async updateById(id: string, portfolio: Portfolio): Promise<Portfolio> {
        return await this.portfolioModel.findByIdAndUpdate(id, portfolio, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id: string): Promise<Portfolio> {
        return await this.portfolioModel.findByIdAndDelete(id)
    }

    async uploadImage(id: string, file: Express.Multer.File) {
        const portfolio = await this.portfolioModel.findById(id);

        if (!portfolio) {
            throw new NotFoundException('Portfolio not found.');
        }

        // Unggah file ke Firebase di dalam folder 'portfolio'
        const destination = `portfolio/${file.originalname}`;

        // Ubah uploadFile di FirebaseService untuk menerima buffer
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        // Simpan URL ke dalam field thumbnail
        portfolio.thumbnail = url;
        await portfolio.save();

        return portfolio;
    }


}
