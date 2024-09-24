/* eslint-disable no-console */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, relative, basename } from 'path';
import * as readline from 'readline';

import Handlebars from 'handlebars';
import { Listr } from 'listr2';
import kebabCase from 'lodash/kebabCase';

import { color } from './color';
import { WriteFileOptions } from './types';

const TEMPLATE_PATHS = resolve(__dirname, 'templates', 'data-migration.ts.hbs');

console.log(TEMPLATE_PATHS);
const POST_RUN_INSTRUCTIONS = `Next steps...\n\n   ${color.warning(
  'After writing your migration, you can run it with:',
)}

pnpm data-migration:up
`;

const files = (name: string) => {
  const now = new Date().toISOString();
  const timestamp = now.split('.')[0].replace(/\D/g, '');
  const basename = `${timestamp}-${kebabCase(name)}`;
  const outputFilename = basename + '.ts';
  const outputPath = join('data-migration', outputFilename);
  const template = readFileSync(TEMPLATE_PATHS).toString();
  const handledTemplate = Handlebars.compile(template);
  const output = handledTemplate({
    PRISMA_CLIENT_PACKAGE: `@gentlepeople/taleus-schema`,
  });
  return {
    [outputPath]: output,
  };
};

const validateName = (name: string) => {
  if (name.match(/^\W/)) {
    console.log(color.error('The <name> argument must start with a letter, number or underscore.'));
    process.exit(1);
  }
};

const writeFile = (
  target: string,
  contents: string,
  { existingFiles = 'FAIL' }: WriteFileOptions = {},
  task: any,
): void => {
  const base = resolve(__dirname, '../');
  task.title = `Writing \`./${relative(base, target)}\``;
  const exists = existsSync(target);
  if (exists && existingFiles === 'FAIL') {
    throw new Error(`${target} already exists.`);
  }
  if (exists && existingFiles === 'SKIP') {
    task.skip();
    return;
  }
  const filename = basename(target);
  const targetDir = target.replace(filename, '');
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(target, contents);
  console.log(base, target);
  task.title = `Successfully wrote file '${color.underline(`./${relative(base, target)}`)}'`;
};

const writeFilesTask = (files: { [key: string]: string }, options = {}) => {
  const base = resolve(__dirname);
  return new Listr(
    Object.keys(files).map((file: string) => {
      const contents = files[file];
      return {
        title: `...waiting to write file \`./${relative(base, file)}\`...`,
        task: (ctx: any, task: any) => {
          return writeFile(file, contents, options, task);
        },
      };
    }),
  );
};

export const dataMigrationGenerateHandler = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let args: string;
  rl.question('Please enter the data migration file name: ', async (fileName) => {
    args = fileName;
    validateName(args);
    rl.close();

    const tasks = new Listr(
      [
        {
          title: 'Generating data migration file...',
          task: () => {
            return writeFilesTask(files(args), {});
          },
        },
        {
          title: 'Next steps...',
          task: (_ctx, task) => {
            task.title = POST_RUN_INSTRUCTIONS;
          },
        },
      ],
      {
        rendererOptions: {
          collapseSubtasks: false,
        },
      },
    );

    try {
      await tasks.run();
    } catch (e) {
      console.log(color.error(e.message));
      process.exit(1);
    }
  });
};

dataMigrationGenerateHandler();
