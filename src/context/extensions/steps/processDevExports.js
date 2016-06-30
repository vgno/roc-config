import { initSetDependencies } from '../../../require/manageDependencies';

export default function processDevExports(initialState) {
    initialState.context.usedExtensions.forEach((name) => {
        if (initialState.temp.extensionsDevelopmentExports[name + '-dev']) {
            initialState.dependencyContext =
                initSetDependencies(initialState.dependencyContext)(
                    name,
                    { exports: initialState.temp.extensionsDevelopmentExports[name + '-dev'] }
                );
        }
    });
    return initialState;
}