import type { Column } from "../../apis/use-case/types";
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
    label: "الاسم",
    format(value, row) {
      return row?.name;
    },
  },
  {
    id: "email",
    label: "البريد الإلكتروني",
    format(value, row) {
      return row?.email;
    },
  },
  {
    id: "phone",
    label: "رقم الهاتف",
    format(value, row) {
      return row?.phone;
    },
  },

  {
    id: "createdAt",
    label: "تاريخ الإضافة",
    format(value, row) {
      return row?.createdAt;
    },
  },
];

export default columns;
