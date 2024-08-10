import DB from '@/config/db';

export default class {
  protected static tableName = 'CodeSnippet';

  public static select() {
    return new Promise<M.CodeSnippet[]>((resolve, reject) => {
      DB.get(
        `SELECT * FROM ${this.tableName}`,
        (reason, row: M.CodeSnippet[]) => {
          if (reason) {
            console.error(reason.message);
            reject(reason.message);
          }

          resolve(row);
        }
      );
    });
  }

  public static insert({
    explanation,
    code,
    language,
    source = 'gemini',
    votes = 0
  }: Omit<M.CodeSnippet, 'id'>) {
    return new Promise<boolean>((resolve, reject) => {
      DB.run(
        `INSERT INTO ${this.tableName} (explanation, code, source, language, votes, createdAt, updatedAt)
				VALUES ($explanation, $code, $source, $language, $votes, $createdAt, $updatedAt)
				`,
        {
          $explanation: explanation,
          $code: code,
          $source: source,
          $language: language,
          $votes: votes,
          $createdAt: Date.now(),
          $updatedAt: Date.now()
        },
        (reason) => {
          if (reason) {
            console.error(reason.message);
            reject(reason.message);
          }

          resolve(true);
        }
      );
    });
  }

  public static delete(fields: { id: ID }) {
    return new Promise<ID>((resolve, reject) => {
      DB.run(
        `DELETE FROM ${this.tableName} WHERE id = $id`,
        { $id: fields.id },
        (reason) => {
          if (reason) {
            console.error(reason.message);
            reject(reason.message);
          }

          resolve(fields.id);
        }
      );
    });
  }
}
