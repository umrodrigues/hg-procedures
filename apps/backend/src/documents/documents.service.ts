import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Document } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { promises as fs } from 'fs';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<Document> {
    const document = this.documentsRepository.create({
      title: createDocumentDto.title,
      description: createDocumentDto.description,
      filename: file.originalname,
      filepath: file.path,
      filesize: file.size,
    });

    return this.documentsRepository.save(document);
  }

  async findAll(search?: string): Promise<Document[]> {
    if (search) {
      return this.documentsRepository.find({
        where: { title: Like(`%${search}%`) },
        order: { createdAt: 'DESC' },
      });
    }
    
    return this.documentsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({ where: { id } });
    
    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }
    
    return document;
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id);
    
    try {
      await fs.unlink(document.filepath);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
    }
    
    await this.documentsRepository.remove(document);
  }
}

