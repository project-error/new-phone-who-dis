import { mainLogger } from '../sv_logger';
import { config } from '../server';

export const matchLogger = mainLogger.child({ module: 'match' });

if (!config.match.allowEditableProfileName && !config.match.generateProfileNameFromUsers) {
  const warning =
    `Both allowEdtiableProfileName and generateProfileNameFromUsers ` +
    `are set false - this means users will likely not have profile names ` +
    `for the Match App and won't be able to use it!`;
  matchLogger.warn(warning);
}
