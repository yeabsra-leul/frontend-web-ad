export type ChannelField = {
  id: string;
  name: string;
};

export type Advertisement = {
  id?: string;
  name: string;
  version:string
  url: string;
  budget: number;
  startDateTime: string;
  endDateTime:string;
  expiredDateTime:string;
  status:string;
  notes?:string;
  attributes?:ad_attribute[]
  media_ids?:ad_media[]
};
export type ad_attribute = {
  id?: string;
  ad_id?: string;
  version:string;
  mandatory:boolean;
  type:string; //headline, address, phone, seokeyword,audience
  subtype?:string;
  value:string;
}
export type ad_media = {
  id?: string;
  ad_id?: string;
  data:string;
  type:string;
}

export type Task = {
  id?: string;
  name: string
}

export type TaskDuration ={
  id?: string;
  start: string;
  end: string;
  task?: string;
  name: string;
  channel: string;
  url: string;
  budget:number;
}

export type Campaign = {
  id?: string;
  name: string;
  version: string;  
  budget: number;
  startDateTime: string;
  endDateTime:string;  
  status:string;
  notes?:string;  
};

export type campaign_attribute = {
  id?: string;
  version: string;
  mandatory: boolean;
  type: string; 
  subtype?: string;
  value: string;
}

export type generate_content_result={
  index:number;
  data:string;
}
  