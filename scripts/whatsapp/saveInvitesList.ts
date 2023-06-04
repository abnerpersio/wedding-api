import { resolve } from 'path';

import { ReportGenerator } from '../../src/services/reports';
import { Formatters } from '../../src/shared/utils/formatters';
import { parseCSV } from '../../src/shared/utils/parse-csv';

type RawItem = {
  nome: string;
  telefone?: string;
  acompanhantes: string;
};

(async () => {
  const rawList = await parseCSV<RawItem>(resolve(__dirname, '..', 'assets', 'convidados.csv'));

  const newList = rawList
    .filter(
      (item) =>
        !!((item.nome as string) || '').length && !!((item.telefone as string) || '').length,
    )
    .map((item) => ({
      name: item.nome.trim(),
      phone: Formatters.phone(item.telefone || ''),
      companions: Number.isNaN(parseInt(item.acompanhantes || '0'))
        ? 0
        : parseInt(item.acompanhantes || '0'),
    }));

  console.log(`Parsed ${newList.length} total invites`);
  new ReportGenerator().execute('csv', newList, 'new-list');
})();
