import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './schemas/experience.shema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'

// 3
@Injectable()
export class ExperienceService {

    //* Constructor for call model schema
    constructor(
        @InjectModel(Experience.name)
        private experienceModel: mongoose.Model<Experience>
    ) { }

    //? @param query : to retrieve query 
    async findAll(query: Query): Promise<Experience[]> {

        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            jobtitle: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}
        const experiences = await this.experienceModel.find({ ...keyword }).limit(resPerPage).skip(skip);
        return experiences;
    }

    //? @param experience: to retrieve data experience from controller
    async create(experience: Experience): Promise<Experience> {
        const res = await this.experienceModel.create(experience);
        return res;
    }

    //? @param id: to retrieve data id from controller
    async findById(id: String): Promise<Experience> {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException('Please enter correct id')
        }
        const experience = await this.experienceModel.findById(id);

        if (!experience) {
            throw new NotFoundException('Experience not found')
        }
        return experience
    }
    //? @param id and experience: to retrieve data id & experience from controller
    async updateById(id: String, experience: Experience): Promise<Experience> {
        return await this.experienceModel.findByIdAndUpdate(id, experience, {
            new: true,
            runValidators: true
        });
    }

    //? @param id: to retrieve data id from controller
    async deleteById(id: String): Promise<Experience> {
        return await this.experienceModel.findByIdAndDelete(id);
    }

}
