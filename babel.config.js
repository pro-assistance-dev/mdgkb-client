module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customName: (name) => {
          if (name === 'makeInstaller') {
            return ''; // for bypassing the plugin.
          }
          name = name.slice(3);
          return `element-plus/lib/components/${name}`;
        },
        customStyleName: (name) => {
          if (name === 'makeInstaller') {
            return ''; // for bypassing the plugin.
          }
          name = name.slice(3);
          return `element-plus/lib/components/${name}/style`;
        },
      },
    ],
  ],
};
