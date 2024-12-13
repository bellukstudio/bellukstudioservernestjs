import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { NotFoundException } from '@nestjs/common';
import { ParsedQs } from 'qs'; // import ParsedQs type

// Mock SkillService
const mockSkillService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe('SkillController', () => {
  let controller: SkillController;
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        { provide: SkillService, useValue: mockSkillService },
      ],
    }).compile();

    controller = module.get<SkillController>(SkillController);
    service = module.get<SkillService>(SkillService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('getAllSkill', () => {
    it('should return an array of skills', async () => {
      const result: Skill[] = [
        { id: '1', skillName: 'JavaScript', level: 'Intermediate' },
        { id: '2', skillName: 'TypeScript', level: 'Advanced' },
      ];

      mockSkillService.findAll.mockResolvedValue(result);

      const query: ParsedQs = { page: '1' }; // use ParsedQs type and pass page as a string
      expect(await controller.getAllSkill(query)).toBe(result);
      expect(mockSkillService.findAll).toHaveBeenCalledWith(query);
    });
  });


  describe('createSkill', () => {
    it('should create and return a skill', async () => {
      const createSkillDto: CreateSkillDto = { skillName: 'Node.js', level: 'Intermediate' };
      const result: Skill = { id: '1', skillName: 'Node.js', level: 'Intermediate' };

      mockSkillService.create.mockResolvedValue(result);

      expect(await controller.createSkill(createSkillDto)).toBe(result);
      expect(mockSkillService.create).toHaveBeenCalledWith(createSkillDto);
    });
  });

  describe('getSkill', () => {
    it('should return a skill by ID', async () => {
      const result: Skill = { id: '1', skillName: 'JavaScript', level: 'Intermediate' };
      mockSkillService.findById.mockResolvedValue(result);

      expect(await controller.getSkill('1')).toBe(result);
      expect(mockSkillService.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillService.findById.mockResolvedValue(null);

      try {
        await controller.getSkill('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateSkill', () => {
    it('should update and return the skill', async () => {
      const updateSkillDto: UpdateSkillDto = { skillName: 'Updated Skill', level: 'Advanced' };
      const result: Skill = { id: '1', skillName: 'Updated Skill', level: 'Advanced' };

      mockSkillService.updateById.mockResolvedValue(result);

      expect(await controller.updateSkill('1', updateSkillDto)).toBe(result);
      expect(mockSkillService.updateById).toHaveBeenCalledWith('1', updateSkillDto);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillService.updateById.mockResolvedValue(null);

      try {
        await controller.updateSkill('999', { skillName: 'Non-existing Skill', level: 'Beginner' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteSkill', () => {
    it('should delete the skill', async () => {
      mockSkillService.deleteById.mockResolvedValue(undefined);

      await expect(controller.deleteSkill('1')).resolves.not.toThrow();
      expect(mockSkillService.deleteById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillService.deleteById.mockResolvedValue(null);

      try {
        await controller.deleteSkill('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
