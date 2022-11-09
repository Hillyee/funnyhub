export interface momentListResult {
  code: number;
  data?: (DataEntity)[] | null;
}
export interface DataEntity {
  id: number;
  title?: string | null;
  content: string;
  createTime: string;
  updateTime: string;
  author: Author;
  labels?: (LabelsEntity)[] | null;
  images?: (string)[] | null;
}
export interface Author {
  id: number;
  name: string;
  avatarURL?: string | null;
}
export interface LabelsEntity {
  id: number;
  name: string;
}

