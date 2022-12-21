import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import { agePeriods } from '@/store/modules/agePeriods';
import { appointments } from '@/store/modules/appointments';
import { appointmentsTypes } from '@/store/modules/appointmentsTypes';
import auth from '@/store/modules/auth';
import { banners } from '@/store/modules/banners';
import { buildings } from '@/store/modules/buildings';
import { callbacks } from '@/store/modules/callbacks';
import { candidateApplications } from '@/store/modules/candidateApplications';
import { candidateExams } from '@/store/modules/candidateExams';
import { certificates } from '@/store/modules/certificates';
import { children } from '@/store/modules/children';
import comments from '@/store/modules/comments';
import { cropper } from '@/store/modules/cropper';
import { dailyMenuOrders } from '@/store/modules/dailyMenuOrders';
import { dailyMenus } from '@/store/modules/dailyMenus';
import { dailyMenuItems } from '@/store/modules/dailyMenusItems';
import { diets } from '@/store/modules/diets';
import { dietsGroups } from '@/store/modules/dietsGroups';
import { dishesGroups } from '@/store/modules/dishesGroups';
import { dishesSamples } from '@/store/modules/dishesSamples';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { documentTypes } from '@/store/modules/documentTypes';
import { donorRules } from '@/store/modules/donorRules';
import { dpoApplications } from '@/store/modules/dpoApplications';
import { dpoCourses } from '@/store/modules/dpoCourses';
import { educationalManagers } from '@/store/modules/educationalManagers';
import { educationalOrganization } from '@/store/modules/educationalOrganization';
import { educationalOrganizationAcademics } from '@/store/modules/educationalOrganizationAcademics';
import { educationYears } from '@/store/modules/educationYears';
import { employees } from '@/store/modules/employees';
import { entrances } from '@/store/modules/entrances';
import { events } from '@/store/modules/events';
import { faqs } from '@/store/modules/faqs';
import { filter } from '@/store/modules/filter';
import { formPatterns } from '@/store/modules/formPatterns';
import { formStatuses } from '@/store/modules/formStatuses';
import { formStatusGroups } from '@/store/modules/formStatusGroups';
import { formValues } from '@/store/modules/formValues';
import { gates } from '@/store/modules/gates';
import { heads } from '@/store/modules/heads';
import { hospitalizations } from '@/store/modules/hospitalizations';
import { hospitalizationsTypes } from '@/store/modules/hospitalizationsTypes';
import { map } from '@/store/modules/map';
import { medicalProfiles } from '@/store/modules/medicalProfiles';
import { menus } from '@/store/modules/menus';
import { meta } from '@/store/modules/meta';
import { news } from '@/store/modules/news';
import { newsSlides } from '@/store/modules/newsSlides';
import { pages } from '@/store/modules/pages';
import { pageSideMenus } from '@/store/modules/pageSideMenus';
import { pagination } from '@/store/modules/pagination';
import { paidPrograms } from '@/store/modules/paidPrograms';
import { paidProgramsGroups } from '@/store/modules/paidProgramsGroups';
import { partners } from '@/store/modules/partners';
import { partnerTypes } from '@/store/modules/partnerTypes';
import { pointsAchievements } from '@/store/modules/pointsAchievements';
import { postgraduateApplications } from '@/store/modules/postgraduateApplications';
import { postgraduateCourses } from '@/store/modules/postgraduateCourses';
import { preparations } from '@/store/modules/preparations';
import { projects } from '@/store/modules/projects';
import { questions } from '@/store/modules/questions';
import { residencyApplications } from '@/store/modules/residencyApplications';
import { residencyCourses } from '@/store/modules/residencyCourses';
import { roles } from '@/store/modules/roles';
import search from '@/store/modules/search';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { specializations } from '@/store/modules/specializations';
import { supportMessages } from '@/store/modules/supportMessages';
import { tags } from '@/store/modules/tags';
import { teachers } from '@/store/modules/teachers';
import { timetablePatterns } from '@/store/modules/timetablePatterns';
import { timetables } from '@/store/modules/timetables';
import { users } from '@/store/modules/users';
import { vacancies } from '@/store/modules/vacancies';
import { vacancyResponses } from '@/store/modules/vacancyResponses';
import { valueTypes } from '@/store/modules/valueTypes';
import { visitingRules } from '@/store/modules/visitingRules';
import { visitsApplications } from '@/store/modules/visitsApplications';

import RootState from './types';

const s: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    valueTypes,
    documentTypes,
    auth,
    banners,
    cropper,
    buildings,
    divisions,
    doctors,
    sideOrganizations,
    tags,
    news,
    users,
    admin,
    timetables,
    map,
    educationalOrganization,
    menus,
    pages,
    vacancies,
    vacancyResponses,
    search,
    hospitalizations,
    comments,
    faqs,
    newsSlides,
    questions,
    events,
    timetablePatterns,
    heads,
    paidProgramsGroups,
    visitingRules,
    projects,
    paidPrograms,
    partners,
    partnerTypes,
    preparations,
    donorRules,
    filter,
    meta,
    pagination,
    publicDocumentTypes: pageSideMenus,
    certificates,
    medicalProfiles,
    visitsApplications,
    callbacks,
    appointments,
    dpoCourses,
    teachers,
    entrances,
    educationalManagers,
    children,
    gates,
    specializations,
    dpoApplications,
    formPatterns,
    postgraduateCourses,
    postgraduateApplications,
    candidateExams,
    candidateApplications,
    roles,
    residencyCourses,
    formStatuses,
    educationYears,
    formValues,
    residencyApplications,
    educationalOrganizationAcademics,
    formStatusGroups,
    pointsAchievements,
    diets,
    dietsGroups,
    agePeriods,
    employees,
    dishesGroups,
    dailyMenus,
    dishesSamples,
    hospitalizationsTypes,
    supportMessages,
    dailyMenuItems,
    appointmentsTypes,
    dailyMenuOrders,
  },
};

export default new Vuex.Store<RootState>(s);
