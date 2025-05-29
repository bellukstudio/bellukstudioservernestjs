import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // Endpoint to retrieve all contact records with pagination
    @Get()
    async findAll(@Query() query: any) {
        const contact = await this.contactService.findAll(query);
        return { message: "Successfully", contact: contact }
    }

    // Endpoint to create a new contact record
    @Post('store')
    async create(@Body() createContactDto: CreateContactDto) {
        const contact = await this.contactService.create(createContactDto);
        return { message: "Successfully", contact: contact }
    }

    // Endpoint to retrieve a contact record by ID
    @Get(':id')
    async findById(@Param('id') id: string) {
        const contact = await this.contactService.findById(id);
        return { message: "Successfully", contact: contact }
    }

    // Endpoint to update a contact record by ID
    @Put(':id/update')
    async updateById(
        @Param('id') id: string,
        @Body() contactData: Partial<Contact>,
    ) {
        const contact = await this.contactService.updateById(id, contactData);
        return { message: "Successfully", contact: contact }
    }

    // Endpoint to delete a contact record by ID
    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        const contact = await this.contactService.delete(id);
        return { message: "Successfully", contact: contact }
    }
}
