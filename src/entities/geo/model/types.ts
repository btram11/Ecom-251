export type Province = {
  code: number;
  codename: string;
  name: string;
  division_type: string;
  districts: District[];
};

export type District = {
  code: number;
  codename: string;
  name: string;
  division_type: string;
  province_code: number;
  wards: Ward[];
};

export type Ward = {
  code: number;
  codename: string;
  name: string;
  division_type: string;
  district_code: number;
};
