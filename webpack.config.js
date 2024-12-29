import { resolve, join } from 'path';
import { readdirSync, existsSync } from 'fs'; // Добавим existsSync для проверки существования папки

export const webpackConfig = async (isMode) => {
  const paths = {
    src: resolve('src'),
    build: resolve('dist'),
  };

  // Путь к директории с файлами страниц
  const pagesDir = resolve(paths.src, 'js', 'pages');

  // Проверяем, существует ли директория
  if (!existsSync(pagesDir)) {
    throw new Error(`Директория с страницами не найдена: ${pagesDir}`);
  }

  // Получаем список всех файлов в директории
  const pages = readdirSync(pagesDir).filter(page => page.endsWith('.js')); // Фильтруем только .js файлы

  // Если нет страниц, выбрасываем ошибку
  if (pages.length === 0) {
    throw new Error('Нет файлов .js в директории src/js/pages');
  }

  // Создаем точки входа для каждой страницы
  const entry = {};
  pages.forEach(page => {
    const pageName = page.replace('.js', ''); // Имя страницы без расширения .js
    entry[pageName] = resolve(pagesDir, page); // Полный путь к файлу
  });

  return {
    entry,
    mode: isMode ? 'development' : 'production',
    devtool: isMode ? 'source-map' : false, // Добавляем настройку devtool для разработки
    output: {
      path: resolve(paths.build, 'js'),
      filename: '[name].min.js', // Имя файла будет соответствовать имени точки входа
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
};





//import { resolve, join } from 'path';
//import { readdirSync } from 'fs'; // Используем readdirSync для синхронного чтения директории
//
//export const webpackConfig = async (isMode) => {
//  const paths = {
//    src: resolve('src'),
//    build: resolve('dist'),
//  };
//
//  // Получаем список страниц (файлов .js) в папке src/js/pages
//  const pagesDir = resolve(paths.src, 'js', 'pages');
//  const pages = readdirSync(pagesDir);
//
//  // Создаем точки входа для каждой страницы
//  const entry = {};
//  pages.forEach(page => {
//    const pageName = page.replace('.js', ''); // Имя страницы без расширения .js
//    entry[pageName] = resolve(pagesDir, page); // Полный путь к файлу
//  });
//
//  return {
//    entry,
//    mode: isMode ? 'development' : 'production',
//    output: {
//      path: resolve(paths.build, 'js'),
//      filename: '[name].min.js', // Имя файла будет соответствовать имени точки входа
//      publicPath: '/',
//    },
//    module: {
//      rules: [
//        {
//          test: /\.m?js$/,
//          exclude: /node_modules/,
//          use: {
//            loader: 'babel-loader',
//            options: {
//              presets: ['@babel/preset-env'],
//            },
//          },
//          resolve: {
//            fullySpecified: false,
//          },
//        },
//      ],
//    },
//  };
//};
//;
