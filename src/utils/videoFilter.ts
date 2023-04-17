import {videoDatas} from '@/static/videoDatas';

export const videoIdFilter = (id: number, Fn: Function) => {
  return videoDatas.filter((data: any) => {
    if (data.id === id) {
      Fn(data);
      return data;
    }

    const videoStage = data.stage;
    for (let i = 0; i < 5; i++) {
      const videoDetails = videoStage[i].videoDetails;
      for (let j = 0; j < videoDetails.length; j++)
        if (videoDetails[j].id === id) {
          Fn(videoDetails[j]);
          return videoDetails[j];
        }
    }
  });
};
