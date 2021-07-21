const SentryCli = require('@sentry/cli');

const createSentryRelease = async () => {
  const relVer = process.env.REACT_APP_SENTRY_RELEASE;

  if (!relVer) return console.warn('UNABLE TO CREATE RELEASE "REACT_APP_SENTRY_RELEASE" NOT SET');

  const cli = new SentryCli();

  try {
    console.log(`Creating new sentry release: ${relVer}`);

    await cli.releases.new(relVer, {
      projects: [],
    });
  } catch (e) {
    console.error('Upload of source maps failed:', e);
  }
};
