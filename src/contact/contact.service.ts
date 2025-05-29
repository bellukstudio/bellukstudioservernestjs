import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) { }

    // Retrieve all contact records with pagination
    async findAll(query: any): Promise<Contact[]> {
        const resPerPage = 10;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        return this.contactRepository.find({
            skip,
            take: resPerPage,
        });
    }

    // Create a new contact record
    async create(createContactDto: CreateContactDto): Promise<Contact> {
        const contact = this.contactRepository.create(createContactDto);
        return this.contactRepository.save(contact);
    }

    // Find a contact record by ID
    async findById(id: string): Promise<Contact> {
        const contact = await this.contactRepository.findOne({
            where: { id },
        });

        if (!contact) {
            throw new HttpException({
                message: 'Contact not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
        return contact;
    }

    // Update a contact record by ID
    async updateById(id: string, contactData: Partial<Contact>): Promise<Contact> {
        const existingContact = await this.contactRepository.findOne({
            where: { id },
        });

        if (!existingContact) {
            throw new HttpException({
                message: 'Contact not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        await this.contactRepository.update(id, contactData);

        return { ...existingContact, ...contactData };
    }

    // Delete a contact record by ID
    async delete(id: string): Promise<void> {
        const result = await this.contactRepository.delete(id);

        if (result.affected === 0) {
            throw new HttpException({
                message: 'Contact not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
