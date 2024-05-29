export type ChannelField = {
    id: string;
    name: string;
  };

  export type Advertisement = {
    id: string;
    headline: string;
    url: string;
    location: string;
    phone: string;
    budget: number;
    channel: string;
    start_date: string;
    end_date:string;
    target_audience: string;
    image_url?: string;
    description?: string;
    seo_keywords: string;
    headline2?: string;
    headline3?: string;
    headline4?: string;
    headline5?: string;
  };