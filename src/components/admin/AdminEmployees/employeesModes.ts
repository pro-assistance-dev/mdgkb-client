import Doctor from '@/classes/Doctor';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import Head from '@/classes/Head';
import EmployeesFiltersLib from '@/libs/filters/EmployeesFiltersLib';
import AcademicsSortsLib from '@/libs/sorts/AcademicsSortsLib';
import HeadsSortsLib from '@/libs/sorts/HeadsSortsLib';
import SortModel from '@/services/classes/SortModel';
import { Constructable } from '@/services/ClassHelper';
import { FilterModelBuilder } from '@/services/interfaces/Filter';

export interface ListMode {
  condition: (e: never) => boolean;
  filter?: FilterModelBuilder;
  label: string;
  isClassOf: (e: Constructable<object>) => boolean;
  store?: string;
  sortModel?: SortModel;
}

const modes: ListMode[] = [
  {
    isClassOf: (e: Constructable<object>) => new e() instanceof Doctor,
    condition: () => false,
    label: 'Все',
  },
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
    sortModel: AcademicsSortsLib.byOrder(),
  },
];

export default modes;
