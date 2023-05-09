import { getActionInputs } from './util/helpers';

async function main() {
  const inputs = getActionInputs();
  console.log('Inputs', inputs);
}

main();
