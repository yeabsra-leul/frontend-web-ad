export type ChannelField = {
    id: string;
    name: string;
  };

  export type Advertisement = {
    id: string;
    name: string;
    version:string;
    headline: string;
    url: string;
    location: string;
    phone: string;
    budget: number;
    channel: string;
    startDateTime: string;
    endDateTime:string;
    target_audience: string;
    image_url?: string;
    description?: string;
    seo_keywords: string;
    headline2?: string;
    headline3?: string;
    headline4?: string;
    headline5?: string;
    status:string
  };

  export type Task = {
    id: string;
    name: string
  }
  
  export type TaskDuration ={
    id: string;
    start: string;
    end: string;
    task: string;
    name: string;
    //channel: string;
    url: string;
    budget:number;
  }