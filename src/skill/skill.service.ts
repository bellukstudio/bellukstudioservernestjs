import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Like, Repository } from 'typeorm';
import { Query } from 'express-serve-static-core';
import { CreateSkillDto } from './dto/create-skill.dto';
@Injectable()
export class SkillService {


    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) { }


    async findAll(query: Query): Promise<Skill[]> {
        const resPerPage = 10;

        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            skillName: Like(`%${query.keyword}%`)
        } : {}; // Use the object directly if no keyword is present]

        return this.skillRepository.find({
            where: keyword,
            skip,
            take: resPerPage
        });
    }
    async create(skillDto: CreateSkillDto): Promise<Skill> {
        const skill = new Skill()

        skill.level = skillDto.level;
        skill.skillName = skillDto.skillName;

        return this.skillRepository.save(skill);
    }
    async findById(id: string): Promise<Skill> {
        const skill = await this.skillRepository.findOne({
            where: {
                id
            }
        });

        if (!skill) {
            throw new NotFoundException('Skill not found');
        }
        return skill;
    }
    async updateById(id: string, skill: Partial<Skill>): Promise<Skill> {
        const existingSkill = await this.skillRepository.findOne({
            where: { id }
        });

        if (!existingSkill) {
            throw new NotFoundException('Skill not found');
        }

        await this.skillRepository.update(id, skill);
        return { ...existingSkill, ...skill };
    }
    async deleteById(id: string): Promise<void> {
        const result = await this.skillRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Skill not found');
        }
    }
}
