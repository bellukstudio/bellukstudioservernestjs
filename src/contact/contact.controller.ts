import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // Endpoint to retrieve all contact records with pagination
    @Get()
    async findAll(@Query() query: any): Promise<Contact[]> {
        return this.contactService.findAll(query);
    }

    // Endpoint to create a new contact record
    @Post()
    async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
        return this.contactService.create(createContactDto);
    }

    // Endpoint to retrieve a contact record by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Contact> {
        return this.contactService.findById(id);
    }

    // Endpoint to update a contact record by ID
    @Put(':id')
    async updateById(
        @Param('id') id: string,
        @Body() contactData: Partial<Contact>,
    ): Promise<Contact> {
        return this.contactService.updateById(id, contactData);
    }

    // Endpoint to delete a contact record by ID
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.contactService.delete(id);
    }
}
