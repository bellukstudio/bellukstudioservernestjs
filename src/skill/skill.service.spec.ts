import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

// Mock SkillRepository
const mockSkillRepository = {
  find: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('SkillService', () => {
  let service: SkillService;
  let repository: Repository<Skill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        { provide: Repository, useValue: mockSkillRepository },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
    repository = module.get<Repository<Skill>>(Repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of skills', async () => {
      const result: Skill[] = [
        { id: '1', skillName: 'JavaScript', level: 'Intermediate' },
        { id: '2', skillName: 'TypeScript', level: 'Advanced' },
      ];
      mockSkillRepository.find.mockResolvedValue(result);

      const query = { page: '1', keyword: 'Java' };
      const skills = await service.findAll(query);

      expect(skills).toEqual(result);
      expect(mockSkillRepository.find).toHaveBeenCalledWith({
        where: { skillName: 'Like', keyword: '%Java%' },
        skip: 0,
        take: 10,
      });
    });
  });

  describe('create', () => {
    it('should create and return a skill', async () => {
      const createSkillDto = { skillName: 'Node.js', level: 'Expert' };
      const result: Skill = { id: '1', skillName: 'Node.js', level: 'Expert' };

      mockSkillRepository.save.mockResolvedValue(result);

      const skill = await service.create(createSkillDto);
      expect(skill).toEqual(result);
      expect(mockSkillRepository.save).toHaveBeenCalledWith(expect.objectContaining(createSkillDto));
    });
  });

  describe('findById', () => {
    it('should return a skill by ID', async () => {
      const result: Skill = { id: '1', skillName: 'JavaScript', level: 'Intermediate' };
      mockSkillRepository.findOne.mockResolvedValue(result);

      const skill = await service.findById('1');
      expect(skill).toEqual(result);
      expect(mockSkillRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.findOne.mockResolvedValue(null);

      try {
        await service.findById('999');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Skill not found');
      }
    });
  });

  describe('updateById', () => {
    it('should update and return the skill', async () => {
      const updateSkillDto = { skillName: 'Updated Skill', level: 'Advanced' };
      const result: Skill = { id: '1', skillName: 'Updated Skill', level: 'Advanced' };

      mockSkillRepository.findOne.mockResolvedValue(result);
      mockSkillRepository.update.mockResolvedValue(undefined);  // Update does not return updated entity

      const updatedSkill = await service.updateById('1', updateSkillDto);
      expect(updatedSkill).toEqual(result);
      expect(mockSkillRepository.update).toHaveBeenCalledWith('1', updateSkillDto);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.findOne.mockResolvedValue(null);

      try {
        await service.updateById('999', { skillName: 'Non-existing Skill' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Skill not found');
      }
    });
  });

  describe('deleteById', () => {
    it('should delete the skill', async () => {
      mockSkillRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.deleteById('1')).resolves.not.toThrow();
      expect(mockSkillRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.delete.mockResolvedValue({ affected: 0 });

      try {
        await service.deleteById('999');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Skill not found');
      }
    });
  });
});
