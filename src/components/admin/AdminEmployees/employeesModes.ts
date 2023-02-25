import Doctor from '@/classes/Doctor';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import SortModel from '@/classes/filters/SortModel';
import Head from '@/classes/Head';
import { Constructable } from '@/services/ClassHelper';
import { FilterModelBuilder } from '@/services/interfaces/Filter';
import EmployeesFiltersLib from '@/services/Provider/libs/filters/EmployeesFiltersLib';
import EducationanlManagersSortsLib from '@/services/Provider/libs/sorts/EducationanlManagersSortsLib';
import EducationAcademicsSortsLib from '@/services/Provider/libs/sorts/EducationOrganizationAcademicsSortsLib';
import HeadsSortsLib from '@/services/Provider/libs/sorts/HeadsSortsLib';

export interface ListMode {
  condition: (e: never) => boolean;
  filter: FilterModelBuilder;
  label: string;
  isClassOf: (e: Constructable<object>) => boolean;
  store?: string;
  sortModel?: SortModel;
}

const modes: ListMode[] = [
  {
    isClassOf: (e: Constructable<object>) => new e() instanceof Doctor,
    condition: (e: Employee) => !!e.doctor,
    filter: EmployeesFiltersLib.onlyDoctors,
    label: 'Врач',
  },
  {
    isClassOf: (e: Constructable<object>) => new e() instanceof Head,
    condition: (e: Employee) => !!e.head,
    filter: EmployeesFiltersLib.onlyHeads,
    label: 'Руководитель',
    store: 'heads',
    sortModel: HeadsSortsLib.byOrder(),
  },
  {
    isClassOf: (e: Constructable<object>) => new e() instanceof EducationalAcademic,
    condition: (e: Employee) => !!e.educationalAcademic,
    filter: EmployeesFiltersLib.onlyEducationalAcademics,
    label: 'Учёный совет',
    store: 'educationalAcademics',
    sortModel: EducationAcademicsSortsLib.byOrder(),
  },
];

export default modes;
