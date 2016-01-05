# config
Configuration management in the Roc ecosystem.

## Important

This project will look for two environment variables; `ROC_CONFIG_PATH` and `ROC_CONFIG_SETTINGS`.  
If `ROC_CONFIG_SETTINGS` is found those will be used **instead** of what has been appended during runtime elsewhere at that point.

If there is a conflict where both an environment variable is set and something is appended manually, there will a a clear warning given to the user.

Once imported to your project **the configuration and all its internal states** will persist throughout the process lifetime.

## Documentation

To generate documentation please run `npm run docs`.

## Configuration source priority
Configurations provided by environment `ROC_CONFIG_SETTINGS` have highest priority amongst appends. This **overwrites the other settings without merge**.

If a configuration file path is provided by environment `ROC_CONFIG_PATH` it will load this instead of a configuration file within the project, without merging the two. Note that it _is_ subject to programmatic appends, it just loads from a different file.

## Application Configuration Format

For _roc_ to understand a `roc.config.js` provided by the CLI or `ROC_CONFIG_PATH` it needs to export an object with a `settings` key. This example should give a basic idea. Configurations will vary amongst Roc extensions.

```js
module.exports = {
    settings: {
        runtime: {
            port: 8080,
            serve: 'files',
        },
        build: {
            entry: {
                client: 'client.js',
                server: 'server.js'
            }
        },
        dev: {
            open: true
        }
    }
};
```

This example works with `roc-web`

## API Examples

Get configuration:
```js
import { getConfig } from 'roc';

const config = getConfig();

```

Extend configuration with custom configuration and use it:
```js
import { appendConfig } from 'roc';

const customConfig = {
    property: 'value'
};

const config = appendConfig(customConfig);
```

Perform multiple modifications and use:
```js
import { appendConfig, getConfig } from 'roc';

// deep merges parameter to current appended configuration state
appendConfig({
    value: 'value'
});

appendConfig({
    value2: 'value2'
});

// config will hold { "value": "value", "value2": "value2" }
const config = getConfig();
```