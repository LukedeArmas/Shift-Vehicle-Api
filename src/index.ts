import init from './startup/init';

init()
  .catch((e) => {
  console.log('Error on startup: ', e.message);
  process.exit(1);
});