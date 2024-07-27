// vite.config.js
import vue from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/unplugin-vue-components/dist/vite.mjs";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/vite-plugin-node-polyfills/dist/index.js";
import svgLoader from "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/node_modules/vite-svg-loader/index.js";

// src/services/ServicesNames.ts
var ServicesNames = [
  "Contact",
  "Button",
  "Email",
  "FTSP",
  "Arrays",
  "Axios",
  "brandColors",
  "buildNameNumbers",
  "Cache",
  "CarouselSwipe",
  "ClassHelper",
  "Color",
  "Confirm",
  "countRating",
  "CreateSortModels",
  "Cursor",
  "DateFormat",
  "DateMask",
  "Dates",
  "DatesFormatter",
  "Dragger",
  "Favourite",
  "GetExtension",
  "HttpClient",
  "MakeCarousel",
  "moveUp",
  "moveDown",
  "Period",
  "PhoneService",
  "Router",
  "Scheduler",
  "Scroll",
  "sort",
  // 'Store',
  "Strings",
  "Time",
  "TimeFormatter",
  "Token",
  "useConfirmLeavePage",
  "User",
  "validate",
  "WaitElement",
  "WebSocketClient",
  "Hooks",
  "ValueType",
  "PHelp",
  "Auth",
  //
  "FilterModel",
  "SortModel"
];
var ServicesNames_default = ServicesNames;

// src/store/StoreModulesNames.ts
var StoreModulesNames = [
  "ProjectsStore",
  "FaqsStore",
  "PagesStore",
  "DivisionsStore",
  "ExportsStore",
  "CommentsStore",
  "EmployeesStore",
  "UsersStore",
  "NewsStore",
  "AcademicsStore",
  "HeadsStore",
  "ChatsStore",
  "TeachersStore",
  "VisitsApplicationsStore",
  "SupportMessagesStore",
  "VisitingRulesStore",
  "VacanciesStore",
  "VacancyResponsesStore",
  "MapNodesStore",
  "SpecializationsStore",
  "DietsStore",
  "DietsGroupsStore",
  "MapRoutesStore",
  "QuestionsStore",
  "TimetablesStore",
  "TimetablesPatternsStore",
  "HospitalizationsTypesStore",
  "HospitalizationsStore",
  "PartnersStore",
  "PartnersTypesStore",
  "BannersStore",
  "PaidProgramsStore",
  "PaidProgramsGroupsStore",
  "BuildingsStore",
  "PaidServicesStore",
  "SideOrganizationsStore",
  "DonorRulesStore",
  "PreparationsStore",
  "MedicalProfilesStore",
  "RolesStore",
  "NmoCoursesStore",
  "GatesStore",
  "CandidateApplicationsStore",
  "CandidateExamsStore",
  "TagsStore",
  "DoctorsStore",
  "DpoApplicationsStore",
  "CropperStore",
  "AppointmentsStore",
  "AppointmentsTypesStore",
  "DishesGroupsStore",
  "DishesSamplesStore",
  "FormStatusGroupsStore",
  "NewsSlidesStore",
  "PostgraduateCoursesStore",
  "EducationalManagersStore",
  "DailyMenuOrdersStore",
  "DailyMenusItemsStore",
  "DailyMenusStore",
  "FormValuesStore",
  "SearchStore",
  "FormPatternsStore",
  "PointsAchievementsStore",
  "FormStatusesStore",
  "ResidencyCoursesStore",
  "ResidencyApplicationsStore",
  "EventsStore",
  "CallbacksRequestsStore",
  //
  "AuthStore",
  "ContactsStore",
  "EmailsStore",
  "FTSPPresetsStore",
  "MenusStore",
  "PhonesStore",
  "UserAccountsStore",
  "ValueTypesStore"
];
var StoreModulesNames_default = StoreModulesNames;

// vite.config.js
var __vite_injected_original_import_meta_url = "file:///home/lakkinzimusic/prog/mdgkb/mdgkb-client/vite.config.js";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      // disableHostCheck: true,
      host: process.env.VITE_APP_HOST,
      port: process.env.VITE_APP_PORT,
      proxy: {
        "/api": {
          ws: true,
          target: process.env.VITE_APP_API_HOST,
          changeOrigin: true,
          secure: false
        }
      }
    },
    base: "/",
    includeAbsolute: false,
    plugins: [
      nodePolyfills(),
      vue({
        template: {
          transformAssetUrls: {
            sourse: ["src"]
          }
        }
      }),
      svgLoader({ svgo: false }),
      Components({
        resolvers: [ElementPlusResolver()],
        // dts: true,
        dirs: ["src/components", "src/services/components", "src/views"]
      }),
      AutoImport({
        include: [
          ".ts",
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.md$/
          // .md
        ],
        imports: [
          "vue",
          {
            "@/services/Main": ServicesNames_default,
            "@/store/StoreModules": StoreModulesNames_default,
            "@/classes/Main": ["Doctor", "Store"]
          }
        ],
        resolvers: [ElementPlusResolver()],
        // dirs: ['srs/classes', 'srs/services/**', 'srs/services'],
        // ignoreDts: ['srs/services', 'Message'],
        vueTemplate: true,
        dts: true,
        eslintrc: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)) },
        { find: "source-map-js", replacement: "source-map" }
      ]
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3NlcnZpY2VzL1NlcnZpY2VzTmFtZXMudHMiLCAic3JjL3N0b3JlL1N0b3JlTW9kdWxlc05hbWVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbGFra2luemltdXNpYy9wcm9nL21kZ2tiL21kZ2tiLWNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbGFra2luemltdXNpYy9wcm9nL21kZ2tiL21kZ2tiLWNsaWVudC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sYWtraW56aW11c2ljL3Byb2cvbWRna2IvbWRna2ItY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7Ly8gY29uc3QgQXV0b0ltcG9ydCA9IHJlcXVpcmUoJ3VucGx1Z2luLWF1dG8taW1wb3J0L3dlYnBhY2snKTtcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5cbmltcG9ydCBTZXJ2aWNlc05hbWVzIGZyb20gJy4vc3JjL3NlcnZpY2VzL1NlcnZpY2VzTmFtZXMnO1xuaW1wb3J0IFN0b3JlTW9kdWxlc05hbWVzIGZyb20gJy4vc3JjL3N0b3JlL1N0b3JlTW9kdWxlc05hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIC8vIGRpc2FibGVIb3N0Q2hlY2s6IHRydWUsXG4gICAgICBob3N0OiBwcm9jZXNzLmVudi5WSVRFX0FQUF9IT1NULFxuICAgICAgcG9ydDogcHJvY2Vzcy5lbnYuVklURV9BUFBfUE9SVCxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpJzoge1xuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9BUFBfQVBJX0hPU1QsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYmFzZTogJy8nLFxuICAgIGluY2x1ZGVBYnNvbHV0ZTogZmFsc2UsXG4gICAgcGx1Z2luczogW1xuICAgICAgbm9kZVBvbHlmaWxscygpLFxuICAgICAgdnVlKHtcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm1Bc3NldFVybHM6IHtcbiAgICAgICAgICAgIHNvdXJzZTogWydzcmMnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBzdmdMb2FkZXIoeyBzdmdvOiBmYWxzZSB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICAvLyBkdHM6IHRydWUsXG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnLCAnc3JjL3NlcnZpY2VzL2NvbXBvbmVudHMnLCAnc3JjL3ZpZXdzJ10sXG4gICAgICB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgJy50cycsXG4gICAgICAgICAgL1xcLlt0al1zeD8kLywgLy8gLnRzLCAudHN4LCAuanMsIC5qc3hcbiAgICAgICAgICAvXFwudnVlJC8sXG4gICAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgICAvXFwubWQkLywgLy8gLm1kXG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAndnVlJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAnQC9zZXJ2aWNlcy9NYWluJzogU2VydmljZXNOYW1lcyxcbiAgICAgICAgICAgICdAL3N0b3JlL1N0b3JlTW9kdWxlcyc6IFN0b3JlTW9kdWxlc05hbWVzLFxuICAgICAgICAgICAgJ0AvY2xhc3Nlcy9NYWluJzogWydEb2N0b3InLCAnU3RvcmUnXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICAvLyBkaXJzOiBbJ3Nycy9jbGFzc2VzJywgJ3Nycy9zZXJ2aWNlcy8qKicsICdzcnMvc2VydmljZXMnXSxcbiAgICAgICAgLy8gaWdub3JlRHRzOiBbJ3Nycy9zZXJ2aWNlcycsICdNZXNzYWdlJ10sXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSkgfSxcbiAgICAgICAgeyBmaW5kOiAnc291cmNlLW1hcC1qcycsIHJlcGxhY2VtZW50OiAnc291cmNlLW1hcCcgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sYWtraW56aW11c2ljL3Byb2cvbWRna2IvbWRna2ItY2xpZW50L3NyYy9zZXJ2aWNlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbGFra2luemltdXNpYy9wcm9nL21kZ2tiL21kZ2tiLWNsaWVudC9zcmMvc2VydmljZXMvU2VydmljZXNOYW1lcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sYWtraW56aW11c2ljL3Byb2cvbWRna2IvbWRna2ItY2xpZW50L3NyYy9zZXJ2aWNlcy9TZXJ2aWNlc05hbWVzLnRzXCI7Y29uc3QgU2VydmljZXNOYW1lcyA9IFtcbiAgJ0NvbnRhY3QnLFxuICAnQnV0dG9uJyxcbiAgJ0VtYWlsJyxcbiAgJ0ZUU1AnLFxuICAnQXJyYXlzJyxcbiAgJ0F4aW9zJyxcbiAgJ2JyYW5kQ29sb3JzJyxcbiAgJ2J1aWxkTmFtZU51bWJlcnMnLFxuICAnQ2FjaGUnLFxuICAnQ2Fyb3VzZWxTd2lwZScsXG4gICdDbGFzc0hlbHBlcicsXG4gICdDb2xvcicsXG4gICdDb25maXJtJyxcbiAgJ2NvdW50UmF0aW5nJyxcbiAgJ0NyZWF0ZVNvcnRNb2RlbHMnLFxuICAnQ3Vyc29yJyxcbiAgJ0RhdGVGb3JtYXQnLFxuICAnRGF0ZU1hc2snLFxuICAnRGF0ZXMnLFxuICAnRGF0ZXNGb3JtYXR0ZXInLFxuICAnRHJhZ2dlcicsXG4gICdGYXZvdXJpdGUnLFxuICAnR2V0RXh0ZW5zaW9uJyxcbiAgJ0h0dHBDbGllbnQnLFxuICAnTWFrZUNhcm91c2VsJyxcbiAgJ21vdmVVcCcsXG4gICdtb3ZlRG93bicsXG4gICdQZXJpb2QnLFxuICAnUGhvbmVTZXJ2aWNlJyxcbiAgJ1JvdXRlcicsXG4gICdTY2hlZHVsZXInLFxuICAnU2Nyb2xsJyxcbiAgJ3NvcnQnLFxuICAvLyAnU3RvcmUnLFxuICAnU3RyaW5ncycsXG4gICdUaW1lJyxcbiAgJ1RpbWVGb3JtYXR0ZXInLFxuICAnVG9rZW4nLFxuICAndXNlQ29uZmlybUxlYXZlUGFnZScsXG4gICdVc2VyJyxcbiAgJ3ZhbGlkYXRlJyxcbiAgJ1dhaXRFbGVtZW50JyxcbiAgJ1dlYlNvY2tldENsaWVudCcsXG4gICdIb29rcycsXG4gICdWYWx1ZVR5cGUnLFxuICAnUEhlbHAnLFxuICAnQXV0aCcsXG4gIC8vXG4gICdGaWx0ZXJNb2RlbCcsXG4gICdTb3J0TW9kZWwnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZXNOYW1lcztcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbGFra2luemltdXNpYy9wcm9nL21kZ2tiL21kZ2tiLWNsaWVudC9zcmMvc3RvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2xha2tpbnppbXVzaWMvcHJvZy9tZGdrYi9tZGdrYi1jbGllbnQvc3JjL3N0b3JlL1N0b3JlTW9kdWxlc05hbWVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2xha2tpbnppbXVzaWMvcHJvZy9tZGdrYi9tZGdrYi1jbGllbnQvc3JjL3N0b3JlL1N0b3JlTW9kdWxlc05hbWVzLnRzXCI7Y29uc3QgU3RvcmVNb2R1bGVzTmFtZXMgPSBbXG4gICdQcm9qZWN0c1N0b3JlJyxcbiAgJ0ZhcXNTdG9yZScsXG4gICdQYWdlc1N0b3JlJyxcbiAgJ0RpdmlzaW9uc1N0b3JlJyxcbiAgJ0V4cG9ydHNTdG9yZScsXG4gICdDb21tZW50c1N0b3JlJyxcbiAgJ0VtcGxveWVlc1N0b3JlJyxcbiAgJ1VzZXJzU3RvcmUnLFxuICAnTmV3c1N0b3JlJyxcbiAgJ0FjYWRlbWljc1N0b3JlJyxcbiAgJ0hlYWRzU3RvcmUnLFxuICAnQ2hhdHNTdG9yZScsXG4gICdUZWFjaGVyc1N0b3JlJyxcbiAgJ1Zpc2l0c0FwcGxpY2F0aW9uc1N0b3JlJyxcbiAgJ1N1cHBvcnRNZXNzYWdlc1N0b3JlJyxcbiAgJ1Zpc2l0aW5nUnVsZXNTdG9yZScsXG4gICdWYWNhbmNpZXNTdG9yZScsXG4gICdWYWNhbmN5UmVzcG9uc2VzU3RvcmUnLFxuICAnTWFwTm9kZXNTdG9yZScsXG4gICdTcGVjaWFsaXphdGlvbnNTdG9yZScsXG4gICdEaWV0c1N0b3JlJyxcbiAgJ0RpZXRzR3JvdXBzU3RvcmUnLFxuICAnTWFwUm91dGVzU3RvcmUnLFxuICAnUXVlc3Rpb25zU3RvcmUnLFxuICAnVGltZXRhYmxlc1N0b3JlJyxcbiAgJ1RpbWV0YWJsZXNQYXR0ZXJuc1N0b3JlJyxcbiAgJ0hvc3BpdGFsaXphdGlvbnNUeXBlc1N0b3JlJyxcbiAgJ0hvc3BpdGFsaXphdGlvbnNTdG9yZScsXG4gICdQYXJ0bmVyc1N0b3JlJyxcbiAgJ1BhcnRuZXJzVHlwZXNTdG9yZScsXG4gICdCYW5uZXJzU3RvcmUnLFxuICAnUGFpZFByb2dyYW1zU3RvcmUnLFxuICAnUGFpZFByb2dyYW1zR3JvdXBzU3RvcmUnLFxuICAnQnVpbGRpbmdzU3RvcmUnLFxuICAnUGFpZFNlcnZpY2VzU3RvcmUnLFxuICAnU2lkZU9yZ2FuaXphdGlvbnNTdG9yZScsXG4gICdEb25vclJ1bGVzU3RvcmUnLFxuICAnUHJlcGFyYXRpb25zU3RvcmUnLFxuICAnTWVkaWNhbFByb2ZpbGVzU3RvcmUnLFxuICAnUm9sZXNTdG9yZScsXG4gICdObW9Db3Vyc2VzU3RvcmUnLFxuICAnR2F0ZXNTdG9yZScsXG4gICdDYW5kaWRhdGVBcHBsaWNhdGlvbnNTdG9yZScsXG4gICdDYW5kaWRhdGVFeGFtc1N0b3JlJyxcbiAgJ1RhZ3NTdG9yZScsXG4gICdEb2N0b3JzU3RvcmUnLFxuICAnRHBvQXBwbGljYXRpb25zU3RvcmUnLFxuICAnQ3JvcHBlclN0b3JlJyxcbiAgJ0FwcG9pbnRtZW50c1N0b3JlJyxcbiAgJ0FwcG9pbnRtZW50c1R5cGVzU3RvcmUnLFxuICAnRGlzaGVzR3JvdXBzU3RvcmUnLFxuICAnRGlzaGVzU2FtcGxlc1N0b3JlJyxcbiAgJ0Zvcm1TdGF0dXNHcm91cHNTdG9yZScsXG4gICdOZXdzU2xpZGVzU3RvcmUnLFxuICAnUG9zdGdyYWR1YXRlQ291cnNlc1N0b3JlJyxcbiAgJ0VkdWNhdGlvbmFsTWFuYWdlcnNTdG9yZScsXG4gICdEYWlseU1lbnVPcmRlcnNTdG9yZScsXG4gICdEYWlseU1lbnVzSXRlbXNTdG9yZScsXG4gICdEYWlseU1lbnVzU3RvcmUnLFxuICAnRm9ybVZhbHVlc1N0b3JlJyxcbiAgJ1NlYXJjaFN0b3JlJyxcbiAgJ0Zvcm1QYXR0ZXJuc1N0b3JlJyxcbiAgJ1BvaW50c0FjaGlldmVtZW50c1N0b3JlJyxcbiAgJ0Zvcm1TdGF0dXNlc1N0b3JlJyxcbiAgJ1Jlc2lkZW5jeUNvdXJzZXNTdG9yZScsXG4gICdSZXNpZGVuY3lBcHBsaWNhdGlvbnNTdG9yZScsXG4gICdFdmVudHNTdG9yZScsXG4gICdDYWxsYmFja3NSZXF1ZXN0c1N0b3JlJyxcbiAgLy9cbiAgJ0F1dGhTdG9yZScsXG4gICdDb250YWN0c1N0b3JlJyxcbiAgJ0VtYWlsc1N0b3JlJyxcbiAgJ0ZUU1BQcmVzZXRzU3RvcmUnLFxuICAnTWVudXNTdG9yZScsXG4gICdQaG9uZXNTdG9yZScsXG4gICdVc2VyQWNjb3VudHNTdG9yZScsXG4gICdWYWx1ZVR5cGVzU3RvcmUnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgU3RvcmVNb2R1bGVzTmFtZXM7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdC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
