import type { Column } from "../../apis/use-case/types";
import { formatDateTimeByLang, tFn } from "../../locales";
export interface PatientColumn {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  createdAt: string;
  photo?: string;
}

const columns: Column<PatientColumn>[] = [
  {
    id: "name",
    label: tFn("overview:patient_page.columns.name"),
    format(value, row) {
      return row?.name;
    },
  },
  {
    id: "email",
    label: tFn("overview:patient_page.columns.email"),
    format(value, row) {
      return row?.email;
    },
  },
  {
    id: "phone",
    label: tFn("overview:patient_page.columns.phone"),
    format(value, row) {
      return row?.phone;
    },
  },

  {
    id: "createdAt",
    label: tFn("overview:patient_page.columns.createdAt"),
    format(value, row) {
      return formatDateTimeByLang(row?.createdAt);
    },
  },
];

export default columns;
