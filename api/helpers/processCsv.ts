export default async (relativePath: string) => {
  const [csv, fs, path, stream] = await Promise.all([
    import('csv-parse'),
    import('node:fs'),
    import('node:path'),
    import('node:stream/promises')
  ]);

  const rootDir = path.dirname(require.main.filename);

  const records: string[] = [];
  const parser = fs
    .createReadStream(
      path.join(rootDir, ...relativePath.split('/').filter(Boolean))
    )
    .pipe(csv.parse({ delimiter: ',' }));

  parser.on('readable', function () {
    let record: string;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });

  await stream.finished(parser);
  return records;
};
