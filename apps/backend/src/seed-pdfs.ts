import { DataSource } from 'typeorm';
import { Document } from './documents/document.entity';
import { User } from './users/user.entity';
import * as fs from 'fs';
import * as path from 'path';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'hg_procedures',
  entities: [Document, User],
  synchronize: false,
});

async function seedPdfs() {
  await dataSource.initialize();
  
  const documentRepository = dataSource.getRepository(Document);
  const uploadsDir = path.join(__dirname, '../../../uploads/pdfs');
  
  const files = fs.readdirSync(uploadsDir).filter(file => file.endsWith('.pdf'));
  
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);
    
    const existing = await documentRepository.findOne({
      where: { filename: file }
    });
    
    if (!existing) {
      const doc = documentRepository.create({
        title: file.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' '),
        description: 'Documento importado automaticamente',
        filename: file,
        filepath: filePath,
        filesize: stats.size,
      });
      
      await documentRepository.save(doc);
      console.log(`✅ Documento adicionado: ${file}`);
    } else {
      console.log(`⏭️  Documento já existe: ${file}`);
    }
  }
  
  await dataSource.destroy();
  console.log('✨ Importação concluída!');
}

seedPdfs().catch(console.error);

