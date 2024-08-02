CREATE TABLE IF NOT EXISTS `CodeSnippet` (
  `id` integer PRIMARY KEY,
  `explanation` text NOT NULL,
  `code` text NOT NULL,
  `source` TEXT CHECK( source IN ('gemini') )  DEFAULT 'gemini',
  `language` varchar(128) NOT NULL,
  `votes` integer DEFAULT 0,
  `createdAt` timestamp,
  `updatedAt` timestamp
);
