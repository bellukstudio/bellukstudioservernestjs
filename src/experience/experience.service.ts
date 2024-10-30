import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './schemas/experience.shema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
import { User } from '../auth/schemas/user.schema';

// 3
@Injectable()
export class ExperienceService {

    //* Constructor for injecting the Experience model schema
    constructor(
        //* Inject the Experience model to interact with the MongoDB collection
        @InjectModel(Experience.name)
        private experienceModel: mongoose.Model<Experience>
    ) { }

    //* Retrieve all experiences with optional search keyword and pagination
    //? @param query: to retrieve query parameters like keyword and page number
    async findAll(query: Query): Promise<Experience[]> {

        //* Set the number of results per page
        const resPerPage = 10;

        //* Determine the current page, default to 1 if not specified
        const currentPage = Number(query.page) || 1;

        //* Calculate the number of documents to skip based on the current page
        const skip = resPerPage * (currentPage - 1);

        //* Build the keyword filter based on the 'jobtitle', case-insensitive search
        const keyword = query.keyword ? {
            jobtitle: {
                $regex: query.keyword,
                $options: 'i' //* Case-insensitive flag for regex
            }
        } : {};

        //* Fetch experiences from the database with optional filtering, pagination, and skip
        const experiences = await this.experienceModel.find({ ...keyword }).limit(resPerPage).skip(skip);
        return experiences;
    }

    //* Create a new experience document in the database
    //? @param experience: the experience data to be saved
    async create(experience: Experience, user: User): Promise<Experience> {
        //assign user to data experience
        const data = Object.assign(experience, { user: user._id })
        //* Save the experience to the database
        const res = await this.experienceModel.create(experience);
        return res;
    }

    //* Find an experience by its ID
    //? @param id: the ID of the experience to retrieve
    async findById(id: string): Promise<Experience> {
        //* Check if the provided ID is a valid MongoDB ObjectId
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            //* Throw an error if the ID is invalid
            throw new BadRequestException('Please enter correct id');
        }

        //* Retrieve the experience document by ID
        const experience = await this.experienceModel.findById(id);

        //* Throw an error if the experience is not found
        if (!experience) {
            throw new NotFoundException('Experience not found');
        }
        return experience;
    }

    //* Update an experience by its ID
    //? @param id: the ID of the experience to update
    //? @param experience: the updated experience data
    async updateById(id: string, experience: Experience): Promise<Experience> {
        //* Find the experience by ID and update it with the new data, return the updated document
        return await this.experienceModel.findByIdAndUpdate(id, experience, {
            new: true, //* Return the updated document
            runValidators: true //* Ensure the updated data is validated
        });
    }

    //* Delete an experience by its ID
    //? @param id: the ID of the experience to delete
    async deleteById(id: string): Promise<Experience> {
        //* Find the experience by ID and delete it
        return await this.experienceModel.findByIdAndDelete(id);
    }
}
