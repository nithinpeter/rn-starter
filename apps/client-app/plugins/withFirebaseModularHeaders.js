const { withPodfile } = require('@expo/config-plugins');

/**
 * Expo config plugin to fix non-modular header errors with React Native Firebase.
 * This is a workaround for: https://github.com/invertase/react-native-firebase/issues/8657
 */
module.exports = function withFirebaseModularHeaders(config) {
  return withPodfile(config, (config) => {
    const podfile = config.modResults.contents;

    // Add the build setting to allow non-modular includes in framework modules
    const postInstallFix = `
    # Fix for React Native Firebase non-modular header error
    # https://github.com/invertase/react-native-firebase/issues/8657
    installer.pods_project.build_configurations.each do |bc|
      bc.build_settings["CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"] = "YES"
    end
`;

    // Insert before the closing "end" of post_install block
    // Look for "post_install do |installer|" and add before its closing "end"
    if (podfile.includes('post_install do |installer|')) {
      // Find the post_install block and insert before its end
      config.modResults.contents = podfile.replace(
        /(post_install do \|installer\|[\s\S]*?)(^\s*end\s*$)/m,
        `$1${postInstallFix}  $2`
      );
    }

    return config;
  });
};
