import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

export class ReportGenerator {
  execute(format: 'csv' | 'xlsx', data: Record<string, any>[], filename: string): string {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    const pathToFile = this.getPath(format, filename);

    if (format === 'csv') {
      const fileToWrite = XLSX.utils.sheet_to_csv(worksheet);
      fs.writeFileSync(pathToFile, fileToWrite, 'utf-8');
    } else {
      const fileToWrite = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      fs.writeFileSync(pathToFile, fileToWrite, 'utf-8');
    }

    return pathToFile;
  }

  getPath(format: 'csv' | 'xlsx', filename: string) {
    return path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `${filename}-${new Date().toISOString()}.${format}`,
    );
  }
}
